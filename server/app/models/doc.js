var Waterline = require('waterline');

module.exports = Waterline.Collection.extend({
  tableName: 'doc',
  schema: true,
  connection: 'mysql',
  attributes:{
    name:{
      type: 'string',
      required: true
    },

    path:{
      type: 'string',
      required: true
    },

    owner:{
      model: 'user'
    },

    room:{
      model: 'room'
    },

    deleted:{
      type: 'boolean',
      required: true
    }
  }
});