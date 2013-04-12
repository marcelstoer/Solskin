/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

// DO NOT DELETE - this directive is required for Sencha Cmd packages to work.
//@require @packageOverrides

//<debug>
Ext.Loader.setPath({
  'Ext': 'touch/src',
  'SunApp': 'app'
});
//</debug>

Ext.application({
  name: 'SunApp',
  viewport: {
    autoMaximize: true
  },

  launch: function () {
    Ext.create('Ext.util.Geolocation', {
      autoUpdate: false,
      listeners: {
        locationupdate: function (geo) {
          alert(geo.getLatitude() + ' / ' + geo.getLongitude());
        },
        locationerror: function (geo, bTimeout, bPermissionDenied, bLocationUnavailable, message) {
          if (bTimeout) {
            alert('Timeout occurred.');
          } else {
            alert('Error occurred.');
          }
        }
      }
    }).updateLocation();
    Ext.create("Ext.tab.Panel", {
      fullscreen: true,
      tabBarPosition: 'bottom',
      items: [
        {
          title: 'Home',
          iconCls: 'home',
          cls: 'home',
          html: [
            '<img width="25%" src="http://staging.sencha.com/img/sencha.png" />',
            '<h1>Welcome to Sencha Touch</h1>',
            "<p>You're creating the Getting Started app. This demonstrates how ",
            "to use tabs, lists and forms to create a simple app</p>",
            '<h2>Sencha Touch 2</h2>'
          ].join("")
        },
        {
          xtype: 'nestedlist',
          title: 'Blog',
          iconCls: 'star',
          displayField: 'title',

          detailCard: {
            xtype: 'panel',
            scrollable: true,
            styleHtmlContent: true
          },

          listeners: {
            itemtap: function (nestedlist, list, index, element, post) {
              this.getDetailCard().setHtml(post.get('content'))
            }
          },

          store: {
            type: 'tree',
            fields: [
              'title', 'link', 'author', 'contentSnippet', 'content', {name: 'leaf', defaultValue: true}
            ],

            root: {
              leaf: false
            },

            proxy: {
              type: 'jsonp',
              url: 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q=http://feeds.feedburner.com/SenchaBlog',
              reader: {
                type: 'json',
                rootProperty: 'responseData.feed.entries'
              }
            }
          }
        },
        {
          xtype: 'formpanel',
          title: 'Contact',
          iconCls: 'user',
          url: 'contact.php',
          layout: 'vbox',

          items: [
            {
              xtype: 'fieldset',
              title: 'Contact Us',
              instructions: '(email address is optional)',
              items: [
                {xtype: 'textfield', label: 'Name'},
                {xtype: 'emailfield', label: 'Email'},
                {xtype: 'textareafield', label: 'Message'}
              ]
            },
            {
              xtype: 'button',
              text: 'Send',
              ui: 'confirm',
              handler: function () {
                this.up('formpanel').submit();
              }
            }
          ]
        }
      ]
    });
  }
});
