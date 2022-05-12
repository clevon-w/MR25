/**
 * Model for the event collection.
 * Contains the schema for the users collection.
 */

 const mongoose = require('mongoose')

 /**
  * Input fields:
  * user
  * distance
  * number of loops
  * date of run
  * time of run
  * 
  */

 const eventSchema = new mongoose.Schema(
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
        type: String,
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
 
 module.exports = mongoose.model("Event", eventSchema)