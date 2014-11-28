var Waterline = require('waterline');
var bcrypt = require('bcrypt');
var thunkify = require('thunkify');
bcrypt.compare = thunkify(bcrypt.compare);

module.exports = Waterline.Collection.extend({
  tableName: 'user',
  schema: true,
  connection: 'mysql',
  attributes:{
    firstName:{
      type: 'string',
      required: true
    },

    lastName:{
      type: 'string',
      required: true,
      maxLength: 20
    },

    username: {
      type: 'string',
      required: true
    },

    email:{
      type: 'email',
      required: true,
      unique: true
    },

    password: {
      type: 'string',
      minLength: 6,
      required: true,
      columnName: 'encrypted_password'
    },

    signInCount:{
      type: 'integer',
      required: false,
      defaultsTo: 0
    },

    confirmationToken:{
      type: 'string',
      required: false
    },

    confirmedAt:{
      type: 'date',
      required: false
    },

    profilePicture:{
      model: 'image'
    },

    projects:{
      collection: 'project',
      via: 'owner'
    },

    likes:{
      collection: 'like',
      via: 'user'
    },

    comments:{
      collection: 'comment',
      via: 'user'
    },

    shots:{
      collection:'shot',
      via: 'owner'
    },

    role:{
      model: 'user_role'
    },

    fullName: function() {
      return this.firstName + ' ' + this.lastName
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