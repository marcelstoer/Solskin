Ext.define('Solskin.view.DisclaimerContainer', {
  extend: 'Ext.Container',
  xtype: 'disclaimerContainer',

  requires: [
    'Solskin.view.Disclaimer',
    'Solskin.view.Meteotest'
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