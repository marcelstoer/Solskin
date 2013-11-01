// http://www.movable-type.co.uk/scripts/latlong.html
if (Number.prototype.toRad === undefined) {
  Number.prototype.toRad = function () {
    return this * Math.PI / 180;
  };
}
Ext.define('Solskin.Location', {
  config: {
    lat: null,
    long: null,
    closestPublicTransportStation: null
  },

  constructor: function (config) {
    this.initConfig(config);
  },

  distanceTo: function (other) {
    var dLat, dLong, lat1, lat2, a, c;
    dLat = (other.getLat() - this.getLat()).toRad();
    dLong = (other.getLong() - this.getLong()).toRad();
    lat1 = this.getLat().toRad();
    lat2 = other.getLat().toRad();

    a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLong / 2) * Math.sin(dLong / 2) * Math.cos(lat1) * Math.cos(lat2);
    c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(6371 * c * 10) / 10;
  }
})