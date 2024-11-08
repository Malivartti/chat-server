function handleClose(token, clients, user) {
  // console.log('соединение закрыто ' + user.username);

  delete clients[token];

  for (const key in clients) {
    clients[key].send(JSON.stringify({
      status: 'left',
      user: user._id,
      username: user.username,
      text: `вышел`
    }))
  }
}

module.exports = handleClose
