// Test
const JWT_SECRET_KEY            = require('./config/jwt').JWT_SECRET_KEY
const TEST_USER                 = require('./config/jwt').TEST_USER
// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var exphbs = require("express-handlebars");
const jwt_express   = require('express-jwt');


// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));


//For express and handlebars to talk to each others
// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// all the handlebars are in the ‘view’ folder, the following path will look for handlerbar in this folder
app.set("view engine", "handlebars");


//tell express to use JSON WebTokens. JWT-Express will autofill req.user with the user details
app.use(jwt_express({ secret: JWT_SECRET_KEY}).unless({path: ['/token', '/favicon.ico']}));

// Routes
// =============================================================
// require("./routes/html-routes.js")(app);
require("./routes/users-api-routes.js")(app);
require("./routes/pets-api-routes.js")(app);
require("./routes/html-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync()
  .then(function(){
    return db.User.create({
        username: TEST_USER.username,
        password: TEST_USER.password
    })
  })
  .then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
});