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
let http = require('http')
let session = require('express-session')

router.use(bodyParser.urlencoded({ extended: true }))
router.use(expressValidator())

router.use(passport.initialize());
router.use(passport.session());

//=======================================================================================================
//API LOGING IN user
//Store DATA in DATABASE
router.get('/api/facebooklogin', passport.authenticate('facebook', {scope: ['email']}))
router.get('/api/facebooklogin/callback', function(req,res,next){
  passport.authenticate('facebook')(req, res, function(){
    req.session.user = req.user
    res.redirect('/dashboard')
  });
});

//API GET USER INFORMATION - AFTER LOGIN
router.get('/api/profile/:facebookid', function(req,res,next){
  Models.Users.findOne({"facebook.id": req.params.facebookid }, function(err, result){
    res.json()
  })
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
let tagihan = function(requser,callback){
  console.log("sini", requser)
  Transactions.Transactions.find({peminjam: requser._id}, function(err, result){
    if(err){
      console.log(err)
    }
    callback(result)
  })
}

//API GET TRANSACTION ORANG YANG HUTANG PADA DIA
let masukan =  function(requser, callback){
  Transactions.Transactions.find({pengutang: requser._id}, function(err, result){
    if(err){
      console.log(err)
    }
    callback(result)
  })
}

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
  setTimeout(function(){
    tagihan(req.user, function(hasilpertama){
      let hasilTagihan = hasilpertama
      masukan(req.user, function(hasilkedua){
        let hasilMenagih = hasilkedua
        res.render('pages/dashboard',{layout:"dashboard-layout", user: req.user, tagihan: hasilTagihan, menagih: hasilMenagih})
      })
    })
  }, 3000);
})

router.get('/', function(req, res) {
  res.render('pages/home')
})

router.post('api/logout', function(req,res){
  req.logout()
  res.redirect('/login')
})



module.exports = router
