Ext.define('SunApp.view.LaunchingContainer', {
  extend: 'Ext.Container',
  xtype: 'launchingContainer',

  requires: [
    'SunApp.view.Launching',
    'SunApp.view.Meteotest'
  ],

  config: {
    layout: 'vbox',

    items: [
      { xtype: 'launching', flex: 1 },
      { xtype: 'meteotest', docked: 'bottom' }
    ]
  }
});