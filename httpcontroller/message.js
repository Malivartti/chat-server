const express = require('express')
const router = express.Router()
const { getMessages } = require('../service/message')

router.route('/')
.get(async (req, res) => {
  try {
    const messages = await getMessages()
    return res.status(200).send({
      status: 'ok',
      messages
    })
  } catch (e) {
    return res.status(500).send({
      error: e,
      status: 'error',
      message: 'Ошибка при получении сообщений'
    })
  }
})

module.exports = router
