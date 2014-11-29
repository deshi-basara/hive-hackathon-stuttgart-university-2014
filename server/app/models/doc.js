var Waterline = require('waterline');

module.exports = Waterline.Collection.extend({
  tableName: 'doc',
  schema: true,
  connection: 'mysql',
  attributes:{
    name:{
      type: 'string'
    },

    owner:{
      model: 'user',
      required: true
    },

    room:{
      model: 'room'
    },

    deleted:{
      type: 'boolean',
      required: false
    }
  }
});