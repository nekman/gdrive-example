define([
  'backbone',
  'lodash'
],
function(Backbone, _) {
  'use strict';

  /**
   * Sheet Model... With polling.
   */
  return Backbone.Model.extend({

    initialize: function(options) {
      this.polltime   = options.polltime   || 1000 * 60;
      this.shouldPoll = options.shouldPoll || false;
      this.key        = options.key;
      this.name       = options.name;

      this.on('sync', this.startPoll);
    },

    clearPoll: function() {
      clearTimeout(this.poll);
      this.poll = null;
      delete this.poll;
    },

    togglePoll: function() {
      this.shouldPoll = !this.shouldPoll;

      this.clearPoll();
      this.startPoll();
    },

    startPoll: function() {
      if (!this.shouldPoll) {
        return;
      }

      this.clearPoll();
      this.poll = setTimeout(this.fetch.bind(this), this.polltime);
    },

    parse: function(res) {
      var sheet = {};
      _.each(res.feed.entry, function(entry) {
        // entry.title.$t = A1, B2, etc.
        var colName = entry.title.$t[0], //A
            rowNum  = entry.title.$t[1]; //1

        if (!sheet[rowNum]) {
          sheet[rowNum] = [];
        }
        
        sheet[rowNum].push({
          column: colName,
          value: entry.content.$t
        });
      });

      // from: { row1: [cells1], rowN: [cellsN] } 
      // to: [ [cells1], [cellsN] ] 
      this.sheet = _.map(sheet, function(cells) {
        return cells;
      });
      
      return this;
    },
    
    url: function() {
      return 'https://spreadsheets.google.com/feeds/cells/{key}/od6/public/basic?alt=json'
                .replace(/{key}/, this.key);
    }
  });
});