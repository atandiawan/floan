let express = require('express')
let app = express()
let port = process.env.PORT || 9000
let routes = require('./router/index.js')
let session = require('express-session')

app.use(session({
  secret: 'yeah',
  saveUnitialized: true,
  resave: true
}))

app.use('/', routes)

app.listen(port, function(){
  console.log('listening on', port)
})
