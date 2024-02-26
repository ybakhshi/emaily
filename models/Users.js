const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String
});

mongoose.model('users', userSchema);


// import mongoose from "mongoose";

// const { Schema } = mongoose;

// const userSchema = new Schema({
//     googleId: String, 
// })

// //to create an actual model class and tell mongoose to be aware of
// // of this new collection to be created
// export const User = mongoose.model('users', userSchema)

// // here Users is a model class


