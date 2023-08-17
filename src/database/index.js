// Third Party Imports.
const { Sequelize } = require('sequelize');

// Data Base Config.
const dataBaseConfig = new Sequelize({
    dialect: 'sqlite',
    storage: 'src/database.sqlite'
});

// Exports.
module.exports = dataBaseConfig;

