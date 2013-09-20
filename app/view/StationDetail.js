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
              '    <p class="time">now</p>',
              '    <p class="temperature">{temperature}&deg;</p>',
              '</div>' ]
          },
          {
            xtype: 'container',
            flex: 1,
            id: 'weatherForecast',
            padding: 10,
            tpl: [
              '<div class="stationDetail sunLevel{sunLevel}">', // TODO MKE '"forecastSunLevel}">',
              '    <p class="time">{arrival:date("H")}:00</p>', // TODO MKE '{forecastTime}</p>',
              '    <p class="temperature">{temperature}&deg;</p>', // TODO MKE '{forecastTemperature}&deg;</p>',
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
              '        <p class="departureStation">{origin}</p>',
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
              '        <p class="arrivalStation">{name}</p>',
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
        items: [
          {
            xtype: 'map',
            height : 300,
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
    if (newRecord) {
      this.down('#weatherNow').setData(newRecord.data);
      this.down('#weatherForecast').setData(newRecord.data);
      this.down('#connectionArrival').setData(newRecord.data);
      newRecord.data.origin = SunApp.app.getCurrentLocation().getClosestPublicTransportStation().name; // TODO MKE nicer way to get current location
      this.down('#connectionDeparture').setData(newRecord.data);
    }
  }
});
