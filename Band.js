const {Sequelize, sequelize} = require('./db');

// TODO - define the Band model
const Band = sequelize.define('band', {
    name: Sequelize.STRING,
    genre: Sequelize.STRING
});

module.exports = {
    Band
};