Ext.define('SunApp.view.StationDetail', {
  extend: 'Ext.Container',
  xtype: 'stationDetail',

  requires: [
    'Ext.Map'
  ],

  config: {
    layout: {
      pack: 'start',
      type: 'vbox'
    },

    items: [
      {
        xtype: 'container',
        height: 200,
        id: 'weather',
        layout: {
          type: 'hbox'
        },
        items: [
          {
            xtype: 'container',
            flex: 1,
            id: 'weatherNow',
            padding: 10,
            tpl: [
              '<div class="stationDetail sunLevel{sunLevel}">',
              '    <p class="time">{timestamp:date("H:i")}</p>',
              '    <p class="temperature">{temperature}&deg;</p>',
              '</div>' ]
          },
          {
            xtype: 'container',
            flex: 1,
            id: 'weatherForecast',
            padding: 10,
            tpl: [
              '<div class="stationDetail sunLevel{forecastSunLevel}">',
              '    <p class="time">{forecastTimestamp:date("H:i")}</p>',
              '    <p class="temperature">{forecastTemperature}&deg;</p>',
              '</div>' ]
          }
        ]
      },
      {
        xtype: 'container',
        height: 160,
        id: 'connection',
        layout: {
          type: 'hbox'
        },
        items: [
          {
            xtype: 'container',
            flex: 1,
            id: 'connectionDeparture',
            padding: 10,
            tpl: [
              '    <div class="connection departure">',
              '        <p class="departureStation">{stationName}</p>',
              '        <p class="departureTime">{departure:date("H:i")}</p>',
              '    </div>' ]
          },
          {
            xtype: 'container',
            flex: 1,
            id: 'connectionArrival',
            padding: 10,
            tpl: [
              '    <div class="connection arrival">',
              '        <p class="arrivalStation">{stationName}</p>',
              '        <p class="arrivalTime">{arrival:date("H:i")}</p>',
              '    </div>' ]
          }
        ]
      }
      ,
      {
        xtype: 'container',
        id: 'map',
        padding: 10,
        //height: 300,
        layout: 'fit',
        //docked: 'bottom',
        items: [
          {
            xtype: 'map',
            height: 300,
            id: 'googleMap',
            mapOptions: {
              zoom: 8,
              panControl: false,
              zoomControl: false,
              mapTypeControl: false,
              scaleControl: false,
              streetViewControl: false,
              overviewMapControl: false
            },
            useCurrentLocation: true
          }
        ]
      }
    ],

    record: null
  },

  updateRecord: function (newRecord) {
    var forecast;
    if (newRecord) {
      this.down('#weatherNow').setData({
        "timestamp": newRecord.get('timestamp'),
        "sunLevel": newRecord.get('sunLevel'),
        "temperature": newRecord.get('temperature') ? newRecord.get('temperature') : " - "
      });
      forecast = newRecord.getForecastMostClosestToArrivalTime();
      this.down('#weatherForecast').setData({
        "forecastSunLevel": forecast['sunLevel'],
        "forecastTimestamp": forecast['timestamp'],
        "forecastTemperature": forecast['temperature'] ? forecast['temperature'] : " - "
      });
      this.down('#connectionDeparture').setData({
          "stationName": SunApp.app.getCurrentLocation().getClosestPublicTransportStation()['name'],
          "departure": newRecord.get('departure')}
      );
      this.down('#connectionArrival').setData({
          "stationName": newRecord.get('name'),
          "arrival": newRecord.get('arrival')}
      );
    }
  }
});
