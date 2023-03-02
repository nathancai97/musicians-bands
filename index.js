const {Band} = require('./Band');
const {Musician} = require('./Musician');
const {Song} = require('./Song');

Musician.belongsTo(Band);
Band.hasMany(Musician);

Band.belongsToMany(Song, {through: "band_songs"});
Song.belongsToMany(Band, {through: "band_songs"});

module.exports = {
    Band,
    Musician,
    Song
};
