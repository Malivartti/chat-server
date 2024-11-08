const express = require('express')
const router = express.Router()
const { getMessages } = require('../service/message')

router.route('/')
.get(async (req, res) => {
  const messages = await getMessages()
  return res.status(200).send({
    status: 'ok',
    messages
  })
})

module.exports = router
