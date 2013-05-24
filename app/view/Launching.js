Ext.define('SunApp.view.Launching', {
  extend: 'Ext.Panel',

  config: {
    html: 'Detecting your geo location...',
    styleHtmlContent: true
  },

  updateMessageForGeoLocationFound: function (lat, long) {
    this.setHtml(this.getHtml().concat(lat, '/', long));
  },

  updateMessageForClosestStationStart: function () {
    this.setHtml(this.getHtml().concat('<br>', 'Detecting the closest public transport station...'));
  },

  updateMessageForClosestStationFound: function (stationName) {
    this.setHtml(this.getHtml().concat(stationName));
  }
});