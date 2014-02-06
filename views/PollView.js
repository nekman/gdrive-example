define([
  'backbone',
  'lodash'
], function(Backbone, _) {
  
  return Backbone.View.extend({
    el: '#poll',

    events: {
      'click #btnSync': 'togglePoll'
    },

    initialize: function() {
      this.$icon    = this.$('#icon');
      this.$btnSync = this.$('#btnSync');
      this.template = Handlebars.compile($('#poll-template').html());

      this.model.bind('change',  this.render.bind(this));
    },

    togglePoll: function() {
      this.model.togglePoll();
      this.render();
    },

    render: function() {
      var viewModel = _.extend(this.model.toJSON(), {
        pollText:   (this.model.shouldPoll ? 'Stop' : 'Start') + ' poll each ' + this.model.polltime + 'ms',
        pollState:  this.model.shouldPoll ? 'stop'  : 'play'
      });

      this.$el.html(this.template(viewModel));
      this.$btnSync.removeClass('hide');

      return this;
    }
  });

});