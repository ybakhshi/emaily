const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          // we already have a record with the given profile ID
          done(null, existingUser);
        } else {
          // we don't have a user record with this ID, make a new record!
          new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);


// import passport from 'passport'
// import { Strategy } from 'passport-google-oauth20'
// import { keys } from '../config/keys.js'
// import { User } from '../models/Users.js'
// import mongoose from 'mongoose'

// // const User = mongoose.model('users')

// passport.serializeUser((user, done) =>{

//     console.log('serialized', user)
//     done(null, user.id)
// })

// passport.deserializeUser((id, done) => {
//     console.log('deserial', id)
//     User.findById(id).then(user => done(null, user));
//   });

// export const passportConfig = passport.use(new Strategy({
//     clientID: keys.googleClientID,
//     clientSecret: keys.googleClientSecret,
//     callbackURL: '/auth/google/callback' // after the permission is granted
// }, (accessToken, refreshToken, profile, done) =>{

//     User.findOne({
//         googleId: profile.id
//     }).then((user) =>{
        
//         if(user){
//             done(null, user)
//         } else {
//             new User({
//                 googleId: profile.id
//             }).save()
//             .then(user => done(null, user))
//         }
//     })
    
// })
// )
