const { mongoose } = require('../module/db')

const UserSchema = new mongoose.Schema({
  email: String,
  name: {type: String, default: ''},
  token: String,
})

const User = mongoose.model("User", UserSchema)

module.exports = User
