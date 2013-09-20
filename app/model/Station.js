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
      {name: 'publicTransportId', type: 'int'}
    ]
  }
});