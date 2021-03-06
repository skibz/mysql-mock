
'use strict'

var events = require('events');
var Util = require('util');

/**
 * @constructor
 */
var connection = function(config, sqlMock) {
  events.EventEmitter.call(this);
  this.config = config;
  this.sqlMock = sqlMock;
  setImmediate(function() {
    this.emit('connection', this)
  }.bind(this))
};

Util.inherits(connection, events.EventEmitter);

connection.prototype.query = function(sqlstr, params, onresults) {
  var err = null;
  var rows = [];
  for (var i = 0, len = this.sqlMock.length; i < len; i++) {
    var mockRow = this.sqlMock[i];
    if (mockRow.query.join('\n') == sqlstr) {
      rows = mockRow.result;
    }
  }
  return onresults(null, rows);
};

connection.prototype.connect = function(onconnect) {
  return typeof onconnect === 'function' ? onconnect() : undefined
};
connection.prototype.release = function(onrelease) {
  return typeof onrelease === 'function' ? onrelease() : undefined
};
connection.prototype.destroy = function(ondestroy) {
  return typeof ondestroy === 'function' ? ondestroy() : undefined
};
connection.prototype.end = function(onend) {
  return typeof onend === 'function' ? onend() : undefined
};

module.exports = connection;
