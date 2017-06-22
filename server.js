var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

mongoose.connect('mongodb://localhost/videos');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Database is connected!!!");
});

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
    iframe: '<div class="container"><iframe class="video" src="https://www.youtube.com/embed/S_SjP_IzpQc" frameborder="0" allowfullscreen></iframe></div>',
    thumbnail: "https://i.ytimg.com/vi/S_SjP_IzpQc/hqdefault.jpg?sqp=-oaymwEWCMQBEG5IWvKriqkDCQgBFQAAiEIYAQ==&rs=AOn4CLA6xGOk0Bh20ZxEvm0y5LhkWjBwtw",
  },
  {
    id: 2,
    title: "The Black Dahlia Murder – Closed Casket Requiem (guitar cover)",
    description: "Cover version of the song",
    iframe: '<div class="container"><iframe class="video" src="https://www.youtube.com/embed/kk7fvddDMh0" frameborder="0" allowfullscreen></iframe></div>',
    thumbnail: "https://i.ytimg.com/vi/kk7fvddDMh0/hqdefault.jpg?sqp=-oaymwEWCMQBEG5IWvKriqkDCQgBFQAAiEIYAQ==&rs=AOn4CLCsH47P7bpyhPU15GFvRlIoKmSRBg",
  },
  {
    id: 3,
    title: "Children of Bodom - Bed of Razors guitar cover",
    description: "Cover version of the song",
    iframe: '<div class="container"><iframe class="video" src="https://www.youtube.com/embed/S_SjP_IzpQc" frameborder="0" allowfullscreen></iframe></div>',
    thumbnail: "https://i.ytimg.com/vi/S_SjP_IzpQc/hqdefault.jpg?sqp=-oaymwEWCMQBEG5IWvKriqkDCQgBFQAAiEIYAQ==&rs=AOn4CLA6xGOk0Bh20ZxEvm0y5LhkWjBwtw",
  },
  {
    id: 4,
    title: "The Black Dahlia Murder – Closed Casket Requiem (guitar cover)",
    description: "Cover version of the song",
    iframe: '<div class="container"><iframe class="video" src="https://www.youtube.com/embed/kk7fvddDMh0" frameborder="0" allowfullscreen></iframe></div>',
    thumbnail: "https://i.ytimg.com/vi/kk7fvddDMh0/hqdefault.jpg?sqp=-oaymwEWCMQBEG5IWvKriqkDCQgBFQAAiEIYAQ==&rs=AOn4CLCsH47P7bpyhPU15GFvRlIoKmSRBg",
  }
];

var comments = [
  {
    username: "Max",
    comment: "This is a great performance!!"
  }
];

app.post('/comments', function (req, res) {
  var comment = req.body;
  if (comment) {
    if (comment.username && comment.comment) {
      comments.push(comment);
    } else {
      res.send("You posted invalid data");
    }
  } else {
    res.send("Post has no body");
  }
  console.log(comments);
  res.send("Posted successfully");

});

app.get('/videos', function(req, res){
  console.log("Get from server");
  res.send(tutorial);
});

app.listen(6361);
