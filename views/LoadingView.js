define([
  'backbone'
],
function(Backbone) {
  'use strict';

  return Backbone.View.extend({
    el: '#loadingview',

    initialize: function() {
      this.$loading = this.$('#loading');
      this.$error   = this.$('#error');

      this.model.bind('request', this.showLoading.bind(this));
      this.model.bind('sync', this.hideLoading.bind(this));
    },

    hideLoading: function() {
      this.$loading.fadeOut();
    },

    fetchFailed: function(err) {
      this.$loading.fadeOut();
      this.$error.html(err.responseText || 'Network error: ' + err.statusText)
                 .removeClass('hide').fadeIn();
      // Re-start the polling, (if we lost the network...)
      this.model.startPoll();
    },

    showLoading: function(model, xhr) {
      this.$error.hide();
      this.$loading.fadeIn();

      // Handle request fail... (does not gets handled on model fetch)
      xhr.fail(this.fetchFailed.bind(this));
    }
  });
});