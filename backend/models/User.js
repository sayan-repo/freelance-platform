// This file defines the User model and its associations

// No need to import Sequelize here, it will be passed by index.js
// but we need the Model class if we are using the class-based approach.
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // A User (as a client) can have many Projects
      this.hasMany(models.Project, {
        foreignKey: 'clientId',
        as: 'ClientProjects', // Alias for the association
      });

      // A User (as a freelancer) can place many Bids
      this.hasMany(models.Bid, {
        foreignKey: 'freelancerId',
        as: 'PlacedBids', // Alias
      });
      
      // Add other associations for Disputes if needed
    }
  }
  
  User.init({
    // --- ATTRIBUTES ---
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('client', 'freelancer', 'admin'),
      allowNull: false,
      defaultValue: 'freelancer',
    },
    bio: {
      type: DataTypes.TEXT,
    },
    skills: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    // You can remove these from here and let Sequelize handle them with the 'timestamps' option
    // createdAt: { ... },
    // updatedAt: { ... },
  }, {
    // --- OPTIONS ---
    sequelize, // We need to pass the connection instance
    modelName: 'User', // We need to choose the model name
    timestamps: true, // This will add createdAt and updatedAt fields automatically
  });

  return User;
};