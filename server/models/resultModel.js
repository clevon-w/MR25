/**
 * Model for the result collection.
 * Contains the schema for the users collection.
 */

 const mongoose = require('mongoose')

 const resultSchema = new mongoose.Schema(
   {
    user:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    distance:{
        type: Number,
        required: [true, 'Please enter run distance']
    },
    loops:{
        type: Number,
        required: [true, 'Please enter number of loops']
    },
    runDate:{
        type: Date,
        required: [true, 'Please enter date of the run']
    },
    runTiming:{
        type: Number,
        required: [true, 'Please enter run timing']
    },
   }, 
   {
     timestamps: true
   }
 )
 
 module.exports = mongoose.model("Result", resultSchema)