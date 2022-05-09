/**
 * Model for the user collection.
 * Contains the schema for the users collection.
 */

const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: String
})

module.exports = mongoose.model("User", schema)