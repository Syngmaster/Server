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

var schema = mongoose.Schema;

var commentSchema = new schema ({
  username: String,
  comment: String
});

var videoSchema = new schema({
  id : { type : Number, unique : true},
  title : String,
  description : String,
  iframe : String,
  thumbnail : String,
  comment: [commentSchema]
});

var videoDBModel = db.model('Video',videoSchema);

// add a new object into db
// var newVideo1 = videoDBModel({
//
//   id: 5,
//   title: "Children of Bodom - Bed of Razors guitar cover",
//   description: "Cover version of the song",
//   iframe: '<div class="container"><iframe class="video" src="https://www.youtube.com/embed/S_SjP_IzpQc" frameborder="0" allowfullscreen></iframe></div>',
//   thumbnail: "https://i.ytimg.com/vi/S_SjP_IzpQc/hqdefault.jpg?sqp=-oaymwEWCMQBEG5IWvKriqkDCQgBFQAAiEIYAQ==&rs=AOn4CLA6xGOk0Bh20ZxEvm0y5LhkWjBwtw",
//
// });
//
//
// var newVideo2 = videoDBModel({
//
//   id: 2,
//   title: "The Black Dahlia Murder – Closed Casket Requiem (guitar cover)",
//   description: "Cover version of the song",
//   iframe: '<div class="container"><iframe class="video" src="https://www.youtube.com/embed/kk7fvddDMh0" frameborder="0" allowfullscreen></iframe></div>',
//   thumbnail: "https://i.ytimg.com/vi/kk7fvddDMh0/hqdefault.jpg?sqp=-oaymwEWCMQBEG5IWvKriqkDCQgBFQAAiEIYAQ==&rs=AOn4CLCsH47P7bpyhPU15GFvRlIoKmSRBg",
//
// });
//
// var newVideo3 = videoDBModel({
//
//   id: 3,
//   title: "Children of Bodom - Bed of Razors guitar cover",
//   description: "Cover version of the song",
//   iframe: '<div class="container"><iframe class="video" src="https://www.youtube.com/embed/S_SjP_IzpQc" frameborder="0" allowfullscreen></iframe></div>',
//   thumbnail: "https://i.ytimg.com/vi/S_SjP_IzpQc/hqdefault.jpg?sqp=-oaymwEWCMQBEG5IWvKriqkDCQgBFQAAiEIYAQ==&rs=AOn4CLA6xGOk0Bh20ZxEvm0y5LhkWjBwtw",
//
// });
//
// var newVideo4 = videoDBModel({
//
//   id: 4,
//   title: "The Black Dahlia Murder – Closed Casket Requiem (guitar cover)",
//   description: "Cover version of the song",
//   iframe: '<div class="container"><iframe class="video" src="https://www.youtube.com/embed/kk7fvddDMh0" frameborder="0" allowfullscreen></iframe></div>',
//   thumbnail: "https://i.ytimg.com/vi/kk7fvddDMh0/hqdefault.jpg?sqp=-oaymwEWCMQBEG5IWvKriqkDCQgBFQAAiEIYAQ==&rs=AOn4CLCsH47P7bpyhPU15GFvRlIoKmSRBg",
//
// });

// push a new comment
// for (var i = 0; i < 3; i++) {
//   newVideo1.comment.push({
//     username: 'Max',
//     comment: 'Hello world!!'
//   });
// }

// save new object
// newVideo1.save(function(err){
//   if (err) throw err;
//
//   console.log('Video created!');
// });

// remove an object from db
// videoDBModel.findOneAndRemove({ id: 1 }, function(err) {
//   if (err) throw err;
//
//   // we have deleted the user
//   console.log('Video deleted!');
// });

app.all('/*', function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With", "Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST", "GET", "DELETE");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var comments = [
  {
    username: "Max",
    comment: "This is a great performance!!"
  }
];

/*app.post('/comments', function (req, res) {
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

});*/

//delete comment
app.get('/method/video.deleteComment=:id&:username', function(req, res){

  console.log(req.params.username);
  videoDBModel.findOne({id: req.params.id}, function(err, video){
    if (err) throw err;
    if (video) {
      res.send(video.comment);
      console.log("!!!!!!!", video.comment);
    }
  });

});

app.post('/video.postComment=:id', function (req, res) {
  var comment = req.body;

  if (comment) {
    if (comment.username && comment.comment) {
      videoDBModel.find({id: req.params.id}, function(err, video){
        if (err) throw err;
        var videoObj = video[0];
        console.log(videoObj);
        if (videoObj) {
          videoObj.comment.push(comment);
          videoObj.save(function(err){
            if (err) throw err;
          });
          console.log("Updated video object", videoObj);
        }
      });
    } else {
      res.send("You posted invalid data");
    }
  } else {
    res.send("Post has no body");
  }
  console.log(comments);
  res.send("Posted successfully");

});

app.get('/method/video.getAll', function(req, res){

  videoDBModel.find({}, function(err, videos){
    if (err) throw err;
    //console.log(videos);
    res.send(videos);
    //console.log("Get from server");
  });

});

app.get('/method/video.getComments=:id', function(req, res){
console.log(req.params.id);
  if(req.params.id) {
    videoDBModel.findOne({id: req.params.id}, function(err, video){
      if (err) throw err;
      if (video) {
        res.send(video.comment);
        console.log("!!!!!!!", video.comment);
      }
    });
  } else {
    res.send(400, {error: 'bad url', url: req.url});
  }
});

app.listen(6361);
