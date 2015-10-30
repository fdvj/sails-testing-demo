/**
* Counters.js
*
* @description :: Sample visit count tracker
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    postId: 'integer',
    count: 'integer',

    increase: function() {
      this.count++;
      return this;
    }
  },

  increase: function(postId) {
    return this.findOne({postId: postId}).then(function(counter){
      return counter.increase().save();
    });
  }
};

