const { mongoose } = require('../module/db')

const MessageSchema = new mongoose.Schema({
  user: {type: 'ObjectId', ref: 'User'},
  text: String,
  created_at: {type: Date, default: Date.now()}
})

const Message = mongoose.model('Message', MessageSchema)

module.exports = Message
