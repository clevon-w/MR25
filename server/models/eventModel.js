/**
 * Model for the event collection.
 * Contains the schema for the users collection.
 */

 const mongoose = require('mongoose')

 const eventSchema = new mongoose.Schema(
   {
    user:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    distance:{
        type: String,
        required: true,
    }


   }, 
   {
     timestamps: true
   }
 )
 
 module.exports = mongoose.model("Event", eventSchema)