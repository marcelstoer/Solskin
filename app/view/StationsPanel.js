Ext.define('SunApp.view.StationsPanel', {
  extend: 'Ext.Panel',
  xtype: 'stationsPanel',

  config: {
    layout: 'fit',

    items: [
      {
        xtype: 'titlebar',
        id: 'myTitle',
        docked: 'top',
        title: 'Before Change title',
        items: [
          {
            xtype:'button',
            text:'Change Title',
            align:'right',
            listeners : {
              tap : function() {
                Ext.getCmp('myTitle').setTitle('After Title Change');
              }
            }
          }
        ]
      },
      { xtype: 'stations' }
    ]
  }
});
