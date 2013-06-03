Ext.define('SunApp.model.Station', {
  extend: 'Ext.data.Model',

  config: {
    fields: [
      'origin', 'name',
      {name: 'sunshine', type: 'int', mapping: 'ss'},
      {name: 'sunLevel', type: 'int'},
      {name: 'linearDistance', type: 'float'},
      {name: 'lat', type: 'float'},
      {name: 'long', type: 'float', mapping: 'lon'},
      {name: 'temperature', type: 'float', mapping: 'tt'},
      {name: 'departure', type: 'date'},
      {name: 'arrival', type: 'date'}
    ]
  }
});
