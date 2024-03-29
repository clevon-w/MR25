/**
 * Model for the user collection.
 * Contains the schema for the users collection.
 */

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please add a First Name']
    },
    lastName: {
      type: String,
      required: [true, 'Please add a Last Name']
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true
    },
    gender: {
      type: String,
      required: [true, 'Please select a gender']
    },
    birthDate: {
      type: Date,
      required: [true, 'Please input a birth date']
    },
    nric: {
      type: String,
      required: [true, 'Please add the last three digits of your NRIC'],
      unique: true
    },
    password: {
      type: String,
      required: [true, 'Please add a password']
    },
    userrole: {
      /*User role is 0 if normal and 1 if admin*/ 
      type: Number,
    },
    resetPasswordToken: {
      type: String
    },
    resetPasswordExpires: {
      type: Date
    },
    allInstitutions: {
      type: Array
    },
    registeredEvents: {
      type: Array
    }
  }, 
  {
    timestamps: true
  }
)

module.exports = mongoose.model("User", userSchema)

