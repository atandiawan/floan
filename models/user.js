let mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
  facebook:{
    id: String,
    token: String,
    email: String,
    firstname: String,
    lastname: String,
    photo: String,
    isLogin: Boolean
  }
})

let Users = mongoose.model('users', userSchema)

module.exports = {Users}
