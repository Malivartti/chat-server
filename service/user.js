const User = require('../model/user')

async function isNewMail(email) {
  const users = await User.find({email})
  return !users.length
}

async function createUser(email, token) {
  await User.create({
    email,
    token
  })
}

async function getUserByToken(token) {
  return await User.find({token})
}

async function getUserById(id) {
  return await User.find({_id: id})
}

async function updateName(token, name) {
  return await User.findOneAndUpdate({token}, {name})
}

module.exports = {
  isNewMail,
  createUser,
  getUserByToken,
  getUserById,
  updateName
}