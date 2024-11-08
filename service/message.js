const Message = require('../model/message')
const { formatDate } = require('../utils/date')

async function getMessages() {
  const messages = await Message.find().populate('userId')
  return messages.map(message => ({
    id: message._id,
    userId: message.userId._id,
    userName: message.userId.name,
    text: message.text,
    created_at: formatDate(message.created_at)
  }))
}

async function createMessage(value) {
  return await Message.create(value);
}

module.exports = {
  getMessages,
  createMessage
}