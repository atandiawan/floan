let passport = require('passport')
let FacebookStrategy = require('passport-facebook').Strategy
let secret = require('../config/auth.js')
let Models = require('../models/user.js')

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  Models.Users.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new FacebookStrategy({
  clientID: secret.facebookauth.clientId,
  clientSecret: secret.facebookauth.clientSecret,
  callbackURL: secret.facebookauth.callbackURL,
  "profileFields": ["id", "birthday", "email", "first_name", "gender", "last_name","photos"]
},
  function(token, refreshToken, profile, done){
    Models.Users.findOne({"facebook.id": profile.id}, function(err, user){
      if(err){
        console.log(error)
      }

      if(user){
        return done(null, user)
      } else {
        user = new Models.Users({"facebook.id": profile.id, "facebook.token": token, "facebook.firstname": profile.name.givenName, "facebook.lastname": profile.name.familyName, "facebook.email": profile.emails[0].value, "facebook.photo":profile.photos[0].value }).save(function(err){
          if(err){
            console.log(err)
          }
          console.log("test", user)
          Models.Users.findOne({"facebook.id": profile.id}, function(err, user){
            if(err){
              console.log(error)
            }
            if(user){
              return done(null,user)
            }
          })
        })
      }
    })
  }
))

module.exports = passport
