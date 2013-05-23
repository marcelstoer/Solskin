Ext.define('SunApp.store.Stations', {
  extend: 'Ext.data.Store',
  requires: ['SunApp.store.StationReader'],

  config: {
    model: 'SunApp.model.Station',
    autoLoad: false, // 'load' called manually from app.js
    sorters: [
      {
      property: 'sunlevel',
      direction: 'DESC'
    },
    {
      property: 'linearDistance'
    }],
    proxy: {
      type: 'ajax',
      url: 'data.json',
      reader: {
        type: 'stationReader'
      }
    }
  }
});
