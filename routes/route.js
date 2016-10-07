let express = require('express')
let router = express.Router()
let mongoose = require('mongoose')
let helper = require('../helper/function.js')
let Models = require('../models/user.js')
let Transactions = require('../models/transaction.js')
let bodyParser = require('body-parser')
let secret = require('../config/auth.js')
let expressValidator = require('express-validator')
let passport = require('../config/passport.js')

router.use(bodyParser.urlencoded({ extended: true }))
router.use(expressValidator())

router.use(passport.initialize());
router.use(passport.session());


//=======================================================================================================
//API LOGING IN user
//Store DATA in DATABASE
router.post('/api/facebooklogin', passport.authenticate('facebook', {scope: ['email']}))
router.get('/api/facebooklogin/callback', passport.authenticate('facebook', { successRedirect: '/dashboard', failureRedirect: '/login' }));

//API GET USER INFORMATION - AFTER LOGIN
router.get('/api/profile', function(req,res,next){
  res.json(req.user)
})

//API ADD TRANSACTION
//ADD UTANG AMOUNT AND ID
//'api/add/:user_id'
//input: ID yang berhutang, Jumlah
router.post('/api/add/:id', function(req,res,next){
  Models.Users.findOne({"facebook.email": req.body.email}, function(err, result){
    let newTransaction = new Transactions.Transactions({peminjam: req.params.id, pengutang: result._id, amount: req.body.amount, status:"belumlunas"}).save(function(err){
      if (err){
        console.log(err)
      }
      res.redirect('/api/tagihan')
    })
  })
})

//API GET TRANSACTION ORANG YANG DIA HUTANGI
router.get('/api/tagihan', function(req,res,next){
  Transactions.Transactions.find({peminjam: req.user._id}, function(err, result){
    if(err){
      console.log(err)
    }
    res.json(result)
  })
})

//API GET TRANSACTION ORANG YANG HUTANG PADA DIA
router.get('/api/masukan', function(req,res,next){
  Transactions.Transactions.find({pengutang: req.user._id}, function(err, result){
    if(err){
      console.log(err)
    }
    res.json(result)
  })
})

//API LUNASI TRANSACTION
//'api/lunasi/:transaction_id' --> kirim request ke si yang dihutangin
router.post('/api/lunasi/:transaction_id', function(req,res,next){
  Transactions.Transactions.update({_id:req.params.transaction_id},{status: "requestsent"}, function(err){
    if (err){
      console.log(err)
    }
    res.redirect('/api/tagihan')
  })
})

//API APPROVE LUNASKAN TRANSACTION
router.post('/api/approve/:transaction_id', function(req,res,next){
  Transactions.Transactions.update({_id:req.params.transaction_id},{status: "lunas"}, function(err){
    if (err){
      console.log(err)
    }
  })
  // Transactions.Transactions.remove({_id:req.params.transaction_id}, function(err){
  //   if (err){
  //     console.log(err)
  //   }
  //   res.redirect('/api/tagihan')
  // })
})

//API DELETE TRANSACTION DATA
//'api/delete/:transaction_id' --> hapus transaction dari database
router.post('/api/delete/:transaction_id', function(req,res,next){
  Transactions.Transactions.remove({_id:req.params.id}, function(err){
    if (err){
      console.log(err)
    }
    res.redirect('/api/tagihan')
  })
})

//OBSOLETE
router.get('/dashboard', function(req,res){
  res.render('dashboard.ejs', {user: req.user})
  // res.json(req.user)
})

router.get('/login', function(req, res) {
  res.render('login.ejs')
})

router.post('api/logout', function(req,res){
  req.logout()
  res.redirect('/login')
})


module.exports = router
