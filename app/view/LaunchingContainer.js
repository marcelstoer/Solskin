Ext.define('Solskin.view.LaunchingContainer', {
  extend: 'Ext.Container',
  xtype: 'launchingContainer',

  requires: [
    'Solskin.view.Launching',
    'Solskin.view.Meteotest'
  ],

  config: {
    layout: 'vbox',

    items: [
      { xtype: 'launching', flex: 1 },
      { xtype: 'meteotest', docked: 'bottom' }
    ]
  }
});