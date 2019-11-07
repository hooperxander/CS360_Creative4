var express = require('express');
var request = require("request");
var fs = require("fs");
var router = express.Router();

/* GET home page. */
router.get('/gender', function(req, res, next) {
  console.log(req.query);
  var owlDict = "https://api.genderize.io?name=" + req.query.name + "&country_id=" + req.query.country_id
  console.log(owlDict);
  request(owlDict).pipe(res);
});

router.get("/getcountry", function(req, res, next) {
  fs.readFile(__dirname + '/countries.txt',function(err,data) {
    if(err) throw err;
    var countries = data.toString().split("\n");
    for(var i = 0; i < countries.length; i++) {
      countries[i] = countries[i].split("\t");
    }


    var jsonresult = [];
    var myRe = new RegExp("^" + req.query.q.toLowerCase());
    
    for(var i = 0; i < countries.length; i++) {
      var result = countries[i][1].toLowerCase().search(myRe); 
      if(result != -1) {
        console.log(countries[i][1]);
        jsonresult.push({country:countries[i][1], code:countries[i][0]});
      } 
    }   
    
    console.log(jsonresult);
    res.status(200).json(jsonresult);
  });
});

module.exports = router;
