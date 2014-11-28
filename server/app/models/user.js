var Waterline = require('waterline');
var bcrypt = require('bcrypt');
var thunkify = require('thunkify');
bcrypt.compare = thunkify(bcrypt.compare);

module.exports = Waterline.Collection.extend({
  tableName: 'user',
  schema: true,
  connection: 'mysql',
  attributes:{
    username: {
      type: 'string',
      required: true
    },

    email:{
      type: 'email',
      required: true,
      /* uncomment only for testing! unique: true */
    },

    password: {
      type: 'string',
      required: true,
      columnName: 'encrypted_password'
    },

    role:{
      type: 'string',
      required: true
    },

    comparePassword: function*(password){
      return bcrypt.compare(this.password, password);
    }
  },

    // Lifecycle Callbacks
  beforeCreate: function(values, next) {
    bcrypt.hash(values.password, 10, function(err, hash) {
      if(err) return next(err);
      values.password = hash;
      next();
    });
  }
});