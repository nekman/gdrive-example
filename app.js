/**
 * Quick and dirty "proof of concept" hack for displaying 
 * a spreedsheet from Google Docs...with automatic syncing
 * that gets paused if the user moves the mouse/types in the input field.
 * The polling could also be turned on/off, by pressing the poll button.
 *
 * Uses:
 *   > Require.js
 *   > LoDash
 *   > Backbone.js
 *   > Handlebars.js (template)
 *   > List.js (sorting and filtering)
 *   > jQuery 2.0.3
 * 
 * Needs some refactoring...
 * 
 */
define([
  'jquery',
  './models/SpreedSheetModel',
  './views/SpreedSheetView',
  './views/PollView',
  './views/LoadingView'
],
function($, SpreedSheetModel, SpreedSheetView, PollView, LoadingView) {
  'use strict';

  var setup = function() {
    var parts = window.location.hash.substr(1).split('/'),

    modelOptions = {
      key:  parts[0] || 'o13394135408524254648.240766968415752635',
      name: decodeURI(parts[1] || 'No name'),
      polltime: parts[2]
    };

    var sheetModel = new SpreedSheetModel(modelOptions);

    new SpreedSheetView({
      // Adds CSS-class to cells with '1'/'0' values ... could of course be removed
      cssConverter: {
        '2': 'alert alert-warning',
        '1': 'alert alert-success',
        '0': 'alert alert-danger'
      },
      // Replace '1'/'0' values to 'Done/Missing'... could of course be removed
      valueConverter: {
        '2': 'Pågår',
        '1': 'Klar',
        '0': 'Ej klar'
      },
      model: sheetModel
    });

    new LoadingView({ model: sheetModel });
    new PollView({ model: sheetModel });
    
  };

  return {
    start: function() {
      $(document).ready(setup);
    }
  };

});
 
