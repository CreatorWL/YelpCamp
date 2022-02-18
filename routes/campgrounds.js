var express    = require("express"),
    router     = express.Router(),
    Campground = require("../models/campground"),
    middleware = require("../middleware");

// index route
router.get("/", function(req, res){
  // Get all campgrounds from DB
  Campground.find({}, function(err, allCampgrounds){
    if(err){
      console.log(err);
    } else{
      res.render("campgrounds/index", {campgrounds: allCampgrounds, page: "campgrounds"});
    }
  });
});

// CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res){
  // Get data from form and add to campgrounds array
  const name  = req.body.name,
        price = req.body.price,
        image = req.body.image,
        desc  = req.body.description,
        author = {
          id: req.user._id,
          username: req.user.username
        }
        
  const newCampground = {
    name: name, 
    price: price,
    image: image,
    description: desc,
    author: author
  };
  // Create new campground and save to the database
  // Conveniently we have newCampground, so we can just use this object to pass into our mongoose.create() 
  Campground.create(newCampground, function(err, newlyCreated){
    if(err){
      console.log(err);
    } else{
      // Redirect back to campgrounds page
      // console.log(newlyCreated);
      res.redirect("/campgrounds");
    }
  });
});

// NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
  res.render("campgrounds/new");
});

// SHOW - shows more info about the campground
router.get("/:id", function(req, res){
  // Find the campground with the rendered id
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    if(err || !foundCampground){
      req.flash("error", "Campground not found");
      res.redirect("back");
    } else{
      // Render show page with that template
      res.render("campgrounds/show", {campground: foundCampground});
    }
  });
});

// EDIT CAMPGROUND SITE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
  Campground.findById(req.params.id, function(err, foundCampground){
    res.render("campgrounds/edit", {campground: foundCampground});
  });
});
// UPDATE CAMPGROUND SITE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
  // find and update the correct campground
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
    if(err) {
      res.redirect("/campgrounds");
    } else {
      // redirect somewhere
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

// DESTROY CAMPGROUND ROUTE
// router.delete("/:id", function(req, res){
//   Campground.findByIdAndRemove(req.params.id, function(err){
//     if(err) {
//       res.redirect("campgrounds");
//     } else {
//       res.redirect("/campgrounds");
//     }
//   });
// });

router.delete("/:id", async function(req, res) {
  try {
    let foundCampground = await Campground.findById(req.params.id);
    await foundCampground.remove();
    res.redirect("/campgrounds");
  } catch (error) {
    console.log(error.message);
    res.redirect("/campgrounds");
  }
});

module.exports = router;