const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
     auth: {
        user: process.env.MAIN_USER,
        pass: process.env.MAIN_PASS,
      },
});

function getMailData(to, token) {
  return {
    from: process.env.MAIN_USER,
      to,
      subject: 'Код для входа в чат',
      text: `Задание 3\ntoken=${token}`,
  };
}

module.exports = {
  transporter,
  getMailData
}
