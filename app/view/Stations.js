Ext.define('SunApp.view.Stations', {
  extend: 'Ext.List',
  xtype: 'stations',
  id: 'stations',

  config: {
    title: '',
    cls: 'stations',
    store: 'Stations',
    itemTpl: [
            '<div class="stationList sunLevel{sunLevel}">',
            '    <p class="stationName">{name}</p><p class="arrivalTime">{arrival:date("H:i")}</p>',
            '</div>'
    ].join(''),

    //html: '<div class="metefon-box"><h3>METEOFON</h3><p class="meteofon-button"><a href="tel:0900 57 61 52"><span class="tel">0900 57 61 52</span>3.13&nbsp;CHF/Min.&nbsp;Festnetztarif</a></p><p>Montag bis Sonntag von 5:00 Uhr morgens bis 17:30 Uhr abends (Samstags bis 13:00 Uhr)</p></div>'

  }
});
