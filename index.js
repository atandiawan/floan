let express = require('express')
let app = express()
let port = process.env.PORT || 3000
let routes = require('./routes/route.js')
let passport = require('passport')
let session = require('express-session')
let cors = require('cors')

app.use(cors())

app.use(session({
  secret: 'yeah',
  saveUnitialized: true,
  resave: true
}))


app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9000');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.use(passport.initialize());
app.use(passport.session());
app.set('view-engine', 'ejs')

app.use('/', routes)

app.listen(port, function() {
  console.log('listening on port', port)
})
