const { DataTypes } = require('sequelize');
const sequelize = require('../src/database');

const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    verification_code: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    is_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    tableName: 'users',
    freezeTableName: true,
    timestamps: false,  // Disable `createdAt` and `updatedAt`
});

module.exports = User;
