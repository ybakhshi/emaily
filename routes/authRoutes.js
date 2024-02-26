const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get('/auth/google/callback', passport.authenticate('google'));

  app.get('/api/logout', (req, res) => {
    req.logout() // attach by password to the req
    res.send(req.user)
  })

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};

// import express from 'express'
// import passport from 'passport'

// const router = express.Router()

// router.get('/auth/google',passport.authenticate('google', {
//     scope: ['profile', 'email']
// })
// )

// router.get('/auth/google/callback', passport.authenticate('google'))

// router.get('/api/current_user', (req, res) =>{

//     console.log("api user", req.user)
//     res.send(req.user)
// })

// export { router }