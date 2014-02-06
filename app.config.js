require({
  paths: {
    jquery: '//code.jquery.com/jquery-2.0.3.min',
    lodash: '//cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash',
    backbone: '//cdn.jsdelivr.net/backbonejs/1.0.0/backbone-min',
    handlebars: '//cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.3.0/handlebars.min',
    listjs: '//cdnjs.cloudflare.com/ajax/libs/list.js/1.0.2/list.min'
  },

  shim: {

    backbone: {
      deps: ['jquery', 'lodash'],
      exports: 'Backbone'
    },

    handlebars: {
      exports: 'Handlebars'
    },

    lodash: {
      exports: '_'
    }
  }

}, ['app'], function(app) {
  app.start();
});