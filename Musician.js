const {Sequelize, sequelize} = require('./db');

// TODO - define the Musician model
const Musician = sequelize.define('musician', {
    name: Sequelize.STRING,
    instrumentProperties: Sequelize.STRING
})

module.exports = {
    Musician
};