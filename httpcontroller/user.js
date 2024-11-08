const express = require('express')
const router = express.Router();
const { isNewMail, createUser, getUserByToken, updateName } = require('../service/user')
const { transporter, getMailData } = require('../module/mail')
var jwt = require('jsonwebtoken');

router.route('/')
.post(async (req, res) => {
  try {
    const { email } = req.body;
    const isGood = isNewMail(email);
    if (isGood) {
      let token = jwt.sign({ email }, process.env.JWT_SECRET);
      token = token.slice(-20)
      
      transporter.sendMail(getMailData(email, token), async (err, info) => {
        if (err) {
          // console.log('Не получилось отправить письмо', err)
          return res.status(500).send({
            status: 'error',
            text: 'Не получилось отправить письмо'
          })
        } else {
          await createUser(email, token)
          return res.status(200).send({
            status: 'ok',
            text: 'Письмо отправлено'
          })
        }
      })
    } else {
      // console.log(email, 'почта занята')
      return res.status(400).send({
        status: 'error',
        text: 'Почта занята'
      })
    }
  } catch (e) {
    // console.log(e)
    return res.status(500).json({
      error: e,
      status: 'error',
      text: "Ошибка при регистрации"});
  }
})
.put(async (req, res) => {
  try {
    const headers = req.headers;
    if (!headers.authorization) {
      return res.status(400).send({
        status: 'error',
        text: 'Нет заголовка авторизации'
      })
    }

    const authHeader = headers.authorization.split(' ')
    if (authHeader[0] !== 'Bearer') {
      return res.status(400).send({
        status: 'error',
        text: 'Неверный заголовок авторизации'
      })
    }

    const token = authHeader[1]
    const user = await getUserByToken(token)
    if (!user.length) {
      return res.status(400).send({
        status: 'error',
        text: 'Неверный токен'
      })
    }

    const userId = user[0]._id.toString()
    const name = req.body.userName;
    await updateName(token, name);

    return res.status(200).send({
      status: 'ok',
      userId: userId
    })
  } catch (e) {
    // console.log(e)
    return res.status(500).json({
      error: e, 
      status: 'error',
      message: "Ошибка при изменении имени"
    });
  }
})

module.exports = router;
