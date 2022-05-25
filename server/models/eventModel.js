/**
 * Model for the event collection.
 * Contains the schema for the events collection.
 */

 const mongoose = require('mongoose')

 const eventSchema = new mongoose.Schema(
   {
     name: {
       type: String,
       required: [true, 'Please add a event name']
     },
     eventDetails: {
       type: Object,
       default: {}
     }
   }, 
   {
     timestamps: true
   }
 )
 
 module.exports = mongoose.model("Event", eventSchema) 