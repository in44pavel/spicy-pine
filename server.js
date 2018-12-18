// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/api/timestamp/:date_string?",
      function (req,res){
  var queryObject = req.path;
  var queryString = queryObject.slice(15);
  var unixNum = 0;
  var trimedNaturalDate = '';
  var outPutJson = {error:"Invalid Date"};
  var trimedQueryString = queryString.replace(/%20/g, ' ');

  // Input case 1: unix format, milliseconds num
  var numCheckPattern = /^[0-9]+$/;
  if (numCheckPattern.test(queryString)) {
    unixNum = Number(queryString);
    var date = new Date(unixNum).toUTCString();
    //trimedNaturalDate = date//dateFormat(date, 'longDate');
    outPutJson = {
      unix: unixNum,
      utc: date
    };
  } else if (Date.parse(trimedQueryString)) {
    // Input case 2: utc format,
    unixNum = Date.parse(trimedQueryString);
    var date = new Date(unixNum).toUTCString();
    outPutJson = {
      unix: unixNum,
      utc: date//trimedQueryString,
    };
  }  else if (queryString.length==0) {
    // Input case 3: natural format, special format should match.
    unixNum = new Date().getTime();
    var date = new Date(unixNum).toUTCString();
    outPutJson = {
      unix: unixNum,
      utc: date//trimedQueryString,
    };
  }

  res.send(outPutJson);
});
/*app.get("/api/timestamp/:date_string?",
        function (req,res){
  var query=req.path.slice(15)//date string value
  var qlen=query.length//0 if empty, 13 if valid
  var valid=Date.parse(query)//NaN or Unix
  var regex=/^[0-9]*$/;
  var unix;
  var output={};
  
  if(regex.test(query))
    unix= Number(query);
    var dateX = new Date(unix)get;
    output={unix:dateX, utc:
  })*/
  
  /*req.r= {unix:new Date(req.params.date_string).getTime(),utc: new Date(req.params.date_string).toUTCString()}
  req.b= {unix:new Date().getTime(),utc:new Date().toUTCString()}
  req.x= {unix:new Date (Number.parseInt(req.path.substring(15))).getTime(),utc:new Date (Number.parseInt(req.path.substring(15))).toUTCString()}
  req.u= {error:"Invalid Date"};   
  res.send(req.x)
  console.log(res);*/



// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
