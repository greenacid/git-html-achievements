
// Run $ expresso

/**
 * Module dependencies.
 */

var app = require('../app'), assert = require('assert');


module.exports = {
  'GET /': function(){
    assert.response(app,
      { url: '/user' },
      { status: 200, headers: { 'Content-Type': 'application/json' }},
      function(res){
        assert.includes(res.body, '"user"');
      });
  }
};
