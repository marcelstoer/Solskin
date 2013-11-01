Ext.define('Solskin.view.Overview', {
  extend: 'Ext.Container',
  xtype: 'overview',
  id: 'overview',

  requires: [
    'Solskin.view.Stations',
    'Solskin.view.StationDetail'
//    'Solskin.view.Meteotest'
  ],

  config: {
    layout: 'vbox',

    items: [
      { xtype: 'stations', flex: 1 }
//      { xtype: 'meteotest', docked: 'bottom' }
    ]
  }
});
