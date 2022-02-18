var mongoose = require("mongoose"),
Campground     = require("./models/campground"),
Comment        = require("./models/comment");

var seeds = [
  {
      name: "Cloud's Rest", 
      image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do."
  },
  {
      name: "Desert Mesa", 
      image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do."
  },
  {
      name: "Canyon Floor", 
      image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do."
  }
]

async function seedDB(){
  try {
    await Campground.remove({});
    // console.log('Campgrounds removed!');
    // await Comment.remove({});
    // console.log('Comments removed!');
    // for(const seed of seeds){
    //   let campground = await Campground.create(seed);
    //   console.log('Campground created!');
    //   let comment = await Comment.create(
    //     {
    //       text: 'This place is great, but I wish there was wifi',
    //       author: 'Homer'
    //     });
    //     console.log('Comment Created');
    //     campground.comments.push(comment);
    //     campground.save();
    //     console.log('Comment added to campground');
    // }
  } catch(err) {
    console.log(err);
  }
}
module.exports = seedDB;