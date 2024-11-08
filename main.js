require('dotenv').config();

const { connectDB } = require('./module/db')
const { runHTTPServer } = require('./module/httpserver')
const { runWSServer } = require('./module/wsserver')

connectDB()
runHTTPServer()
runWSServer()
