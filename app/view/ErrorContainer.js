Ext.define('Solskin.view.ErrorContainer', {
  extend: 'Ext.Container',
  xtype: 'errorContainer',

  config: {
    layout: 'vbox',
    title: 'Error',
    items: [
      { xtype: 'button', text: 'Restart', docked: 'bottom',
         handler: function() {
           Ext.Viewport.removeAll(true, true);
           Solskin.app.fireEvent('launching');
         }
      }
    ]
  }
});