var Waterline = require('waterline');

module.exports = Waterline.Collection.extend({
  tableName: 'room',
  schema: true,
  connection: 'mysql',
  attributes:{
    owner:{
      model: 'user'
    },

    name:{
      type: 'string',
      required: true
    },

    location:{
      type: 'string',
      required: true
    },

    visible:{
      type: 'boolean',
      required: true
    },

    toJSON: function() {
      return {
        owner: this.owner,
        name:  this.name,
        location: this.location,
        visible: this.visible,
        id: this.id,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
        active: this.active || []
      }
    }
  }
});