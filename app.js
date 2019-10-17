//jshint esversion:6

const bodyParser = require("body-parser");
const express = require("express");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;


var data = {
  members: [
    {email_address: email,
    status: "subscribed",
    merge_fields: {
      FNAME: firstName,
      LNAME: lastName,}
    }
  ]
};

var jsonData = JSON.stringify(data);

var options = {
  url: "https://us20.api.mailchimp.com/3.0/lists/18cee13b0f", //Enter Custom URL including ServerID and ListID
  method: "POST",
  headers: {
    "Authorization": "Enter_Username_Here Enter_API_Key_Here"
  },
  body: jsonData,

};

  request(options, function(error, response, body){
    if(error){
      res.sendFile(__dirname+"/failure.html");
    }
    else{
      if(response.statusCode===200){
        res.sendFile(__dirname+"/success.html");
      }
      else{
        res.sendFile(__dirname+"/failure.html");
      }
    }
  });

  console.log(firstName,lastName,email);
});


app.listen(process.env.PORT||3000,function(){
  console.log("Server live on Port 3000");
});
