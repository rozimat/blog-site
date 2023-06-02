require("dotenv/config")
const jwt = require('jsonwebtoken')
const sign = (payload) => jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "246851458655256"}); 
const verify = (payload) => jwt.verify(payload, process.env.SECRET_KEY); 

module.exports = { sign, verify }