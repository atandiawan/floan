let express = require('express')
let router = express.Router()
let http = require('http')

router.get('/', function(req,res,next){
  res.render('login.ejs')
})

router.get('/dashboard', function(req,res,next){
  res.send('helo')
})

router.get('/profile', function(req,res,next){
  http.get({
    host: "localhost",
    port: "3000",
    path: "/api/profile"
  }, function(response){
    let hasil = ""
    response.on('data', function(d) {
      hasil += d
    });
    response.on('end', function() {
      let hasilJSON = JSON.parse(hasil)
      res.json(hasilJSON)
    })
  })
})



module.exports = router
