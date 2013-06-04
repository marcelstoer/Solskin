Ext.define('SunApp.view.Stations', {
  extend: 'Ext.List',
  xtype: 'stations',

  config: {
    title: '',

    store: 'Stations',
    itemTpl: [
            '<div class="stationList sunLevel{sunLevel}">',
            '    <p class="stationName">{name}</p><p class="arrivalTime">{arrival:date("H:i")}</p>',
            '</div>'
    ].join('')
  }
});
