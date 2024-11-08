function handleClose(token, clients, user) {
  // console.log('соединение закрыто ' + user.username);

  delete clients[token];

  for (const key in clients) {
    clients[key].send(JSON.stringify({
      status: 'left',
      userId: user._id,
      userName: user.name,
      text: `вышел`
    }))
  }
}

module.exports = handleClose
