let express = require('express')
let router = express.Router()

router.get('/dashboard', function(req,res,next){
  http.get({
    host: "localhost",
    port: "3000",
    path: "/api/display/customer"
  }, function(response){
    let hasil = ""
    response.on('data', function(d) {
      hasil += d
    });
    response.on('end', function() {
      let hasilJSONCustomers = JSON.parse(hasil)
      res.render('register.ejs', {customers: hasilJSONCustomers})
    })
  })
})
