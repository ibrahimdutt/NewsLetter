const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const http = require('https');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', function(req,res){
   res.sendFile(__dirname + '/signup.html');
});

app.post('/', function(req,res){
   const fname = req.body.firstName;
   const lname = req.body.lastName;
   const email = req.body.emailAddress;
   
  var data = {
      members:[
          {
            email_address: email,
            status : "subscribed",
            merge_fields: {
                FNAME: fname,
                LNAME: lname
            }
          }
      ]
  };


  var url = "https://us17.api.mailchimp.com/3.0/lists/3ac7379815";
  var jsonData = JSON.stringify(data);

  const options = {
      method: "POST",
      auth: "ibrahim:d425fd87e4af6c24b3ac30d77ab6f693-us17"
  }

  const request = http.request(url, options, function(response){
     
       if(response.statusCode === 200){
           res.sendFile(__dirname + '/success.html');
       }
       else{
           res.sendFile(__dirname + '/failure.html');
       }

       response.on('data',function(data){
          console.log(JSON.parse(data));
      })
  })

  request.write(jsonData);
  request.end();

});

app.post('/failure', function(req,res){
    res.redirect('/');
});


app.listen(process.env.PORT || 3000, function(){
    console.log('Server up on Port 3000');
})



// API Key:
// d425fd87e4af6c24b3ac30d77ab6f693-us17

//list ID:
//3ac7379815