var Waterline = require('waterline');

module.exports = Waterline.Collection.extend({
  tableName: 'annotation',
  schema: true,
  connection: 'mysql',
  attributes:{
    doc:{
      model: 'doc'
    },

    owner:{
      model: 'user'
    },

    page:{
      type: 'integer',
      required: true
    },

    x:{
      type: 'float',
      required: true
    },

    y:{
      type: 'float',
      required: true
    }
  }
});