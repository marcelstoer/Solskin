Ext.define('SunApp.view.Stations', {
  extend: 'Ext.List',
  xtype: 'stations',

  config: {
    title: '',
    cls: 'x-contacts',

    store: 'Stations',
    itemTpl: [
      '<div class="headshot" style="background-image:url(resources/images/sun/level{sunlevel}.svg);"></div>',
      '{name}',
      '<span>{lat}/{long} - {linearDistance}</span>'
    ].join('')
  }
});
