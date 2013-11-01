Ext.define('Solskin.view.Launching', {
  extend: 'Ext.Panel',
  xtype: 'launching',

  config: {
    html: 'Welcome to Solskin!<br>Detecting your geo location...',
    styleHtmlContent: true,
    scrollable: 'vertical'
  },

  updateMessageForGeoLocationFound: function (lat, long) {
    this.concatHtmlWith(lat, '/', long);
  },

  updateMessageForClosestStationStart: function () {
    this.concatHtmlWith('<br>', 'Detecting the closest public transport station...');
  },
  updateMessageForClosestStationFound: function (stationName) {
    this.concatHtmlWith(stationName);
  },

  updateMessageForLoadingAllStations: function() {
    this.concatHtmlWith('<br>', 'Loading weather data...');
  },
  updateMessageForLoadingAllStationsDone: function(numberOfRecords) {
    this.concatHtmlWith('got ' + numberOfRecords + ' records');
    this.concatHtmlWith('<br>', 'Filtering data to find most relevant for you...');
  },

  updateMessageForFilteringDone: function() {
    this.concatHtmlWith('done');
  },

  concatHtmlWith: function() {
    var i = 0, newHtml = this.getHtml();
    for (; i < arguments.length; i++) {
      newHtml += arguments[i];
    }
    this.setHtml(newHtml);
  }
});