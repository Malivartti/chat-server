const { createMessage } = require('../service/message')
const { formatDate } = require('../utils/date')

async function handleMessage(message, clients, user) {
  // console.log(`получено сообщение ${message} от ${user.username}`);

  const created_at = formatDate(new Date())
  const sendMessage = {
    userId: user._id,
    text: message,
    created_at,
  }
  await createMessage(sendMessage);

  for (const key in clients) {
    clients[key].send(JSON.stringify({
      ...sendMessage,
      status: 'message',
      userName: user.name
    }));
  }
}

module.exports = handleMessage;
