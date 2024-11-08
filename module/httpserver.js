const express = require('express')
const cors = require('cors')
const port = process.env.HTTP_PORT || 4000;

const app = express()
app.use(cors())
app.use(express.json())


app.use('/api/user', require('../httpcontroller/user'))
app.use('/api/messages', require('../httpcontroller/message'))
app.use((req, res) => {
  res.status(404).json({error: 404, message: `Page ${req.url} not found`});
})

function runHTTPServer() {
  app.listen(port, () => {
    console.log(`HTTP server listening on port ${port}`)
  })
}



module.exports = {
  runHTTPServer
}