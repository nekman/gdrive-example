define([
  'jquery',
  'backbone',
  'lodash',
  'handlebars',
  'listjs'
],
function($, Backbone, _, Handlebars, List) {
  'use strict';
  
  var convertCell = function(cell) {
    return _.extend(cell, {
      text: this.valueConverter[cell.value] || cell.value,
      css:  this.cssConverter[cell.value] || ''
    });
  };

  /**
   * This is a bit "hacky" and needs refactoring...
   */
  return Backbone.View.extend({
      el: 'div.container',

      initialize: function(options) {
        this.$container = this.$('#container');
        this.template   = Handlebars.compile($('#sheet-template').html());
      
        this.valueConverter = options.valueConverter || {};
        this.cssConverter   = options.cssConverter || {};

        this.model.bind('change',  this.render.bind(this));
        this.model.fetch();
      },

      convertToViewModel: function() {
        // Format our view from the model...
        var self = this,
        
        rows = _.map(this.model.get('sheet'), function(cells) {
          return _.map(cells, convertCell.bind(self));
        });

        return {
          headerRows: _.first(rows),
          bodyRows: _.rest(rows)
        };
      },

      render: function() {
        var viewModel = this.convertToViewModel();

        this.model.set('viewModel', viewModel);
        this.$container
            .html(this.template(this.model.toJSON()));

        new List(this.$el[0], {
          valueNames: _.map(viewModel.headerRows, function(header) {
            return header.column;
          })
        });
        
        this.$el.fadeIn();
        this.model.startPoll();
      }
    });
});