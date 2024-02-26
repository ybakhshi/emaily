
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/Users');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);

// import express from 'express'
// import mongoose from 'mongoose'
// import { keys } from './config/keys.js'
// import passport from 'passport'
// import cookieSession from 'cookie-session'
// import { router } from './routes/authRoutes.js'
// import { passportConfig } from './services/passport.js'

// import bodyParser from 'body-parser'

// mongoose.connect(keys.mongoURI)
// const app = express()
// app.use(bodyParser.json());

// app.use(
//     cookieSession({
//         maxAge: 30 * 24 * 60 * 60 * 1000,
//         keys : keys.cookieKey 
//     })
// )
// // app.use(passportConfig.initialize())
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(passportConfig.initialize())
// app.use(router)


// const PORT = process.env.PORT || 5000
// app.listen(PORT)
