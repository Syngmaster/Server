var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.all('/*', function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With", "Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST", "GET");
  next();

});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var tutorial = [
  {
    id: 1,
    title: "Children of Bodom - Bed of Razors guitar cover",
    description: "Cover version of the song",
    iframe: '<iframe width="560" height="315" src="https://www.youtube.com/embed/S_SjP_IzpQc" frameborder="0" allowfullscreen></iframe>',
    thumbnail: "https://i.ytimg.com/vi/S_SjP_IzpQc/hqdefault.jpg?sqp=-oaymwEWCMQBEG5IWvKriqkDCQgBFQAAiEIYAQ==&rs=AOn4CLA6xGOk0Bh20ZxEvm0y5LhkWjBwtw",
  },
  {
    id: 2,
    title: "The Black Dahlia Murder – Closed Casket Requiem (guitar cover)",
    description: "Cover version of the song",
    iframe: '<iframe width="560" height="315" src="https://www.youtube.com/embed/kk7fvddDMh0" frameborder="0" allowfullscreen></iframe>',
    thumbnail: "https://i.ytimg.com/vi/kk7fvddDMh0/hqdefault.jpg?sqp=-oaymwEWCMQBEG5IWvKriqkDCQgBFQAAiEIYAQ==&rs=AOn4CLCsH47P7bpyhPU15GFvRlIoKmSRBg",
  }
];

app.get('/videos', function(req, res){
  console.log("Get from server");
  res.send(tutorial);

});

app.listen(6361);
