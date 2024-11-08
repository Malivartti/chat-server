const handleInit = require('../wscontroller/init')
const handleMessage = require('../wscontroller/message')
const handleClose = require('../wscontroller/close')

const WebSocketServer = require('ws');
const port = process.env.WS_PORT || 4001;

function runWSServer() {
  const clients = {};

  const webSocketServer = new WebSocketServer.Server({ port });
  console.log(`WS server listening on port ${port}`)

  webSocketServer.on('connection', async function(ws, data) {
    const { user, token } = await handleInit(ws, data, clients)

    ws.on('message', async function(message) {
      await handleMessage(message, clients, user)
    });

    ws.on('close', function() {
      handleClose(token, clients, user)
    });
  });
}

module.exports = {
  runWSServer
}
