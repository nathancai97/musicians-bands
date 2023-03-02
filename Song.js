const {Sequelize, sequelize} = require('./db');

const Song = sequelize.define('song', {
    title: Sequelize.STRING,
    year: Sequelize.NUMBER
});

module.exports = {Song};