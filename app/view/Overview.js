Ext.define('SunApp.view.Overview', {
  extend: 'Ext.Container',
  xtype: 'overview',
  id: 'overview',

  requires: [
    'SunApp.view.Stations',
    'SunApp.view.StationDetail',
    'SunApp.view.Meteotest'
  ],

  config: {
    layout: 'vbox',

    items: [
      { xtype: 'stations', flex: 1 },
      { xtype: 'meteotest', docked: 'bottom' }
    ]
  }
});
