let mongoose = require('mongoose')
mongoose.connect('localhost:27017/group4')

let transactionSchema = new mongoose.Schema({
  peminjam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  pengutang: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  amount: Number,
  status: String,
})

let Transactions = mongoose.model('transactions', transactionSchema)

module.exports = {Transactions}
