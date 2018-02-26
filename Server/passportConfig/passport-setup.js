const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const db = require('../ControllersDB/mainController.js');
const axios = require('axios');

passport.serializeUser((user, done) => {
  // takes user id and makes it a cookie
  done(null, user);
});

passport.deserializeUser((user, done) => {
  // retrieve id from cookie
  // and use it to access user in database
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      callbackURL: '/auth/google/redirect',
      clientID: process.env.id,
      clientSecret: process.env.secret
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('profile', profile)
      console.log('refreshtoken', refreshToken)
      const body = {
        google_id: profile.id,
        name: profile.displayName,
        img: profile.photos[0].value,
        accessToken: accessToken,
        refreshToken: refreshToken,
        email: profile.emails[0].value
      };

      db.user.getUserByGoogleId(body.google_id, function(err, user){
        if(err){
          done(err, null)
        } else {
          if (user === undefined) {
            db.user.createUserOnSignup(body, function(error, user2){
              if (error){
                done(error, null)
              } else {
                done(null, user2)
              }
            })
          } else {

            let obj = body.refreshToken ? {'accessToken' : body.accessToken, 'refreshToken': body.refreshToken4} : {'accessToken' : body.accessToken}

            db.user.editFields(user.id, obj, function(err2, res){
              if(err2){
                done(err2, null)
              } else {
                done(null, res)
              }
            })
          }
        }
      })
    }
  )
);
