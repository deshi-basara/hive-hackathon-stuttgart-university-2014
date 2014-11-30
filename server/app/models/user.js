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
      required: true,
      unique: true 
    },

    email:{
      type: 'email',
      required: false
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

    profilePicture:{
      type: 'string',
      required: false
    },

    comparePassword: function*(password){
      return yield bcrypt.compare(password, this.password);
    },

    toJSON: function() {
      var defaultPic = 'http://' 
      + Risotto.config.http.hostname + ':' 
      + Risotto.config.http.port + '/assets/image.png'
      
      return {
        username: this.username,
        id: this.id,
        picture: this.picture || defaultPic
      }
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