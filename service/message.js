const Message = require('../model/message')

async function getMessages() {
  return await Message.find()
}

async function createMessage(value) {
  return await Message.create(value);
}

module.exports = {
  getMessages,
  createMessage
}