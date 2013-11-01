Ext.define('Solskin.view.Stations', {
  extend: 'Ext.List',
  xtype: 'stations',
  id: 'stations',

  requires: [
    'Ext.plugin.PullRefresh'
      ],

  config: {
    title: '',
    cls: 'stations',
    store: 'Stations',

        plugins: [
            {
                xclass: 'Ext.plugin.PullRefresh',
                pullText: 'Pull down to update!',
                lastUpdatedDateFormat: 'H:i',
                onLatestFetched: function(store) {
                    Ext.Viewport.removeAll(true, true);
                    Solskin.app.fireEvent('launching');
                }
            }
        ],

    itemTpl: [
            '<div class="stationList sunLevel{sunLevel}">',
            '    <p class="stationName">{name}</p><p class="arrivalTime">{arrival:date("H:i")}</p>',
            '</div>'
    ].join('')

    //html: '<div class="metefon-box"><h3>METEOFON</h3><p class="meteofon-button"><a href="tel:0900 57 61 52"><span class="tel">0900 57 61 52</span>3.13&nbsp;CHF/Min.&nbsp;Festnetztarif</a></p><p>Montag bis Sonntag von 5:00 Uhr morgens bis 17:30 Uhr abends (Samstags bis 13:00 Uhr)</p></div>'

  }
});
