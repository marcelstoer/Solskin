Ext.define('SunApp.view.DisclaimerContainer', {
  extend: 'Ext.Container',
  xtype: 'disclaimerContainer',

  requires: [
    'SunApp.view.Disclaimer',
    'SunApp.view.Meteotest'
  ],

  config: {
    layout: 'vbox',

    items: [
      { xtype: 'disclaimer', flex: 1 },
      { xtype: 'meteotest', docked: 'bottom' }
    ]
  }
});