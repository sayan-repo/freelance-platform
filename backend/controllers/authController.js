import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { users } from '../data/store.js';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';
const generateToken = (id) => jwt.sign({ id }, JWT_SECRET, { expiresIn: JWT_EXPIRY });

export const register = async (req, res) => {
  const { username, email, password, role } = req.body;
  if (!username || !email || !password || !role) return res.status(400).json({ error: 'All fields are required.' });
  if (users.find(u => u.email === email)) return res.status(400).json({ error: 'Email already registered' });
  
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: uuidv4(), username, email, password: hashedPassword, role, bio: '', skills: [], rating: 0.0, completedProjects: 0, createdAt: new Date().toISOString() };
  users.push(newUser);

  const token = generateToken(newUser.id);
  res.status(201).json({ id: newUser.id, username, email, role, token });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).json({ error: 'Invalid credentials' });

  const token = generateToken(user.id);
  res.json({ id: user.id, username: user.username, email: user.email, role: user.role, token });
};

export const getCurrentUser = async (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  const { password, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
};