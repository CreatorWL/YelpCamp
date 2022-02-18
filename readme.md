# YelpCamp

* Add landing page
* Add campground page that lists all campgrounds

# Each campground has (for now):
* Name
* Image

# Layout and basic styling
* Create our header and footer partials
* Add in Bootstrap

# Creating new campgrounds
* Set-up new campground POST route
* Add in body parser
* Set-up route to show form
* Add basic unstyled form3

# Add Mongoose
* Install and configure Mongoose
* Setup campground model
* Use campground model inside of our routes

# Show Page
* Review the RESTful routes we have seen so far
* Add description to our campground model
* Show db.collection.drop()
* Add a show route/template

RESTFUL ROUTES

name      url       verb      desc.
==================================================
INDEX   /dogs       GET     Display list of dogs
NEW     /dogs/new   GET     Displays form to create new dog
CREATE  /dogs       POST    Add new dog to DB
SHOW    /dogs/:id   GET     Shows info about one dog

INDEX   /campgrounds                   GET
NEW     /campgrounds/new               GET
CREATE  /campgrounds                   POST
SHOW    /campgrounds/:id               GET

NEW     /campgrounds/:id/comments/new  GET
CREATE  /campgrounds/:id/comments      POST



# Add comment model!
* Make our errors go away
* Display comments on campground page

# Comment New/Create
* Discuss nested routes
* Add the new comment and create routes
* Add the new comment form