Ext.define('SunApp.model.Station', {
  extend: 'Ext.data.Model',

  config: {
    fields: [
      'name',
      {name: 'sunshine', type: 'int'},
      {name: 'sunLevel', type: 'int'},
      {name: 'linearDistance', type: 'float'},
      {name: 'lat', type: 'float'},
      {name: 'long', type: 'float'},
      {name: 'temperature', type: 'float'},
      {name: 'publicTransportId', type: 'int'},
      {name: 'arrival', type: 'date'},
      {name: 'departure', type: 'date'},
      'forecast'
    ]
  },

  getForecastMostClosestToArrivalTime: function() {
    var arrival, forecast, minTimeBetweenArrivalAndForecast;
    arrival = this.get('arrival');
    minTimeBetweenArrivalAndForecast = Number.MAX_VALUE;
    Ext.each(this.get('forecast'), function(f){
      var timeBetweenArrivalAndForecast = Math.abs(new Date(f['date']).getTime() - arrival.getTime());
      if(timeBetweenArrivalAndForecast < minTimeBetweenArrivalAndForecast){
        forecast = f;
        minTimeBetweenArrivalAndForecast = timeBetweenArrivalAndForecast;
      }
    });
    return forecast;
  }
});