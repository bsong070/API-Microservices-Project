// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/timestamp", function (req, res) {
  res.sendFile(__dirname + '/views/timestamp.html');
});

app.get("/requestHeaderParser", function (req, res) {
  res.sendFile(__dirname + '/views/requestHeaderParser.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  console.log({greeting:'hello API'}) // outputs in git
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

let responseObject = {}

app.get('/api/timestamp/:date', (request,response)=>{
  let date = request.params.date

  if (/\d{5,}/.test(date)){
      date = parseInt(date)
      
      responseObject['unix'] = new Date(date).getTime()
      responseObject['utc'] = new Date(date).toUTCString()
  } else {
      responseObject['unix'] = new Date(date).getTime()
      responseObject['utc'] = new Date(date).toUTCString()
  //
  }
  // if (date.includes('-')){
  //   //Date String
  //   responseObject['unix'] = new Date(date).getTime()
  //   responseObject['utc'] = new Date(date).toUTCString()
  // }else{
  //   //Timestamp
  //   date = parseInt(date)
    
  //   responseObject['unix'] = new Date(date).getTime()
  //   responseObject['utc'] = new Date(date).toUTCString()
  // }

  if(!responseObject['unix'] || !responseObject['utc']){
    response.json({error: 'Invalid Date'})
  }
  response.json(responseObject)
})

app.get('/api/timestamp', (request,response)=>{
  responseObject['unix'] = new Date().getTime()
  responseObject['utc'] = new Date().toUTCString()

  response.json(responseObject)
})

app.enable('trust proxy')
app.get('/api/whoami', (request, response)=>{
  responseObject['ipaddress'] = request.ip
  responseObject['language'] = request.get('Accept-Language')
  responseObject['software'] = request.get('User-Agent')

  response.json(responseObject)
})