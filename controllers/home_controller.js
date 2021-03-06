const Post = require("../models/post");
const User = require("../models/user");

module.exports.home = function (req, res) {
  // console.log(req.cookies);
  // res.cookie('user_id',25);

  // Post.find({},function(err,posts){

  //     return res.render('home',{
  //         title:"Codial | Home",
  //         posts: posts
  //     });
  // })

  // populate the user of each post
  Post.find({})
    .populate("user")
    .populate({
      path: "comments",
      // nested pre populating
      populate: {
        path: "user",
      },
    })
    .exec(function (err, posts) {
      User.find({}, function (err, users) {
        return res.render("home", {
          title: "Codial | Home",
          posts: posts,
          all_users: users,
        });
      });
    });
};

// module.exports.actionName = function(res,req){}


// using then
// Post.find({}).populate('comments').then(function())

let posts = Post.find({}).populate('comments').exec();

posts.then()