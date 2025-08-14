import { Sequelize } from 'sequelize';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Since we are using ES Modules, we need to create __dirname manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import configuration
// Using a dynamic import for JSON is safer and more standard than 'with' which is still experimental in some environments.
const configPath = path.join(__dirname, '..', 'config', 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

let sequelize;
if (dbConfig.use_env_variable) {
  // This is for production environments like Heroku/Render where the DB URL is an environment variable
  sequelize = new Sequelize(process.env[dbConfig.use_env_variable], dbConfig);
} else {
  // This is for your local development setup
  sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: false, // Set to console.log to see SQL queries
  });
}

// An object to hold all our models
const db = {};

// --- IMPORTANT: Manually import and initialize your models here ---
// The old way of dynamically reading files is complex with ES Modules.
// This explicit approach is clearer and less error-prone.
import User from './User.js';
import Project from './Project.js';
import Bid from './Bid.js';
import Dispute from './Dispute.js';

const models = [User, Project, Bid, Dispute];

// Initialize each model and add it to the 'db' object
models.forEach(modelInitializer => {
  const model = modelInitializer(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
});

// Set up associations after all models are initialized
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Attach the sequelize instance and Sequelize library to our db object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Utility function for testing the DB connection
export const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection has been established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    // In a real app, you might want to exit the process if the DB connection fails
    process.exit(1);
  }
};

export default db;