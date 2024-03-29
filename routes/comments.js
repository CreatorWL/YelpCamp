var express    = require("express"),
    // mergeParams makes sure that params from campgrounds and 
    // comments are merged together, and can be used interchangably
    router     = express.Router({mergeParams: true}),
    Campground = require("../models/campground"),
    Comment    = require("../models/comment"),
    middleware = require("../middleware");


// Comments new
router.get("/new", middleware.isLoggedIn, function(req, res){
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
    } else { 
      res.render("comments/new", {campground: campground});
    }
  });
});

// Comments create
router.post("/", middleware.isLoggedIn, function(req, res){
  // lookup campground using ID
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      // create new comment
      Comment.create(req.body.comment, function(err,comment){
        if(err){
          req.flash("error", "Something went wrong");
        } else {
          // connect new comment to campground
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          // add username and id to comment
          comment.save();
          campground.comments.push(comment);
          campground.save();
          req.flash("success", "Successfully added comment");
          // redirect to campground show page
          res.redirect("/campgrounds/" + campground._id);
        }
      });
    }
  });
});

// COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
  Campground.findById(req.params.id, function(err, foundCampground) {
    if(err || !foundCampground) {
      req.flash("error", "No campground found");
      return req.redirect("back");
    }
    Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err || !foundComment){
        req.flash("error", "Comment not found");
        res.redirect("back");
      } else {
        res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
      }
   });
  });
});

// COMMENT UPDATE ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
    if(err) {
      res.redirect("back");
    } else {
      res.redirect("/campgrounds/" + req.params.id)
    }
  });
});

// COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
  // findByIdAndRemove
  Comment.findByIdAndRemove(req.params.comment_id, function(err){
    if(err){
      res.redirect("back");
    } else {
      req.flash("success", "Comment removed");
      res.redirect("/campgrounds/" + req.params.id);
    }
  }); 
});

module.exports = router;