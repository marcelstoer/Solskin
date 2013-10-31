Ext.define('SunApp.view.DisclaimerContainer', {
  extend: 'Ext.Container',
  xtype: 'disclaimerContainer',

  requires: [
    'SunApp.view.Disclaimer',
    'SunApp.view.Meteotest'
  ],

  config: {
    layout: 'vbox',
    title: 'Disclaimer',
    items: [
      { xtype: 'disclaimer', flex: 1 },
      { xtype: 'meteotest', docked: 'bottom' }
    ]
  }
});