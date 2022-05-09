/**
 * Model for the user collection.
 * Contains the schema for the users collection.
 */

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please add a username']
    }
  }, 
  {
    timestamps: true
  }
)

module.exports = mongoose.model("User", userSchema)