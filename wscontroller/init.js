const { getUserByToken } = require('../service/user')

async function init(ws, data, clients) {
  const url = data.url.substring(1).split("?");
  if (url[0] != 'chat') {
    // console.log( 'Данного пути нет')
    ws.send(JSON.stringify({
      status: 'error',
      text: 'Данного пути нет'
    }))
    return
  }

  const [tokenName, tokenValue] = url[1].split('=')
  if (tokenName !== 'token') {
    // console.log('Не передан токен')
    ws.send(JSON.stringify({
      status: 'error',
      text: 'Не передан токен'
    }))
    return
  }

  const users = await getUserByToken(tokenValue)
  if (!users.length) {
    // console.log('Не верный токен')
    ws.send(JSON.stringify({
      status: 'error',
      text: 'Неверный токен'
    }))
    return
  }

  const user = users[0];
  clients[tokenValue] = ws;

  // console.log("новое соединение " + user.username);

  for (const key in clients) {
    clients[key].send(JSON.stringify({
      status: 'join',
      user: user._id,
      username: user.username,
      text: `присоединился`
    }))
  }

  return {user, token: tokenValue}
}

module.exports = init
