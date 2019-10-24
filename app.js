
// Main initialization code
const express = require("express");
const app = express();
const request = require("request");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req, res){
    res.sendFile(__dirname + "/page1.html");
});


app.post("/", function(req, res){
  var firstName = req.body.firstName;

  var url = "https://api.salestaxapi.ca/v2/province/ab";
  var options = {
    url: url,
    method: "GET",
    qs: {}
  };

  request(options, function(error, response, body){

    // res.write("Hello there " + firstName);
    var retData = JSON.parse(body);
    // console.log(retData);
    res.write("<html><body><h1> Query Results </h1>");
    res.write("Provincial Tax: " +  retData.pst + "<br />");
    res.write("Provincial HST: " +  retData.hst + "<br />");
    res.write("Provincial GST: " +  retData.gst + "<br />");
    res.write("</body></html>");
    res.send();

  });

});





// Last Line of Code
app.listen(process.env.PORT || 3000, function(){
  console.log("Server Running on Port 3000");
})
