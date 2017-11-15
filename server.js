var express = require("express");
var mongodb = require("mongodb");
var config = require("./config");

var app = express();
app.use(express.static(__dirname + "/react-front/public"));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
// mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
mongodb.MongoClient.connect(config.db_uri || process.env.MONGODB_URI, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  const port = process.env.PORT || 8080;
  app.listen(port);
});

// CONTACTS API ROUTES BELOW