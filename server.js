// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var reservations = [];

var tabled = [];

var waitList = [];


app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
  });
  
  app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
  });
  
  app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
  });

  // Displays all reservations
  app.get("/api/reservations", function(req, res) {
    return res.json(reservations);
  });

  app.get("/api/tabled", function(req, res) {
    return res.json(tabled);
  });

  app.get("/api/waitList", function(req, res) {
    return res.json(waitList);
  });

// Displays a single reservation, or returns false
app.get("/api/reservations/:reservation", function(req, res) {
    console.log(res);
  
    for (var i = 0; i < reservations.length; i++) {
        if (i < 4) {
            var newReservation = reservations[i];
            tabled.push(newReservation);
            res.json(newReservation);
        } else {
            var newReservation = reservations[i];
            waitList.push(newReservation);
            res.json(newReservation);
        }
    }
        
  });


  app.post(
    "/api/Reservation", function(req, res) {
      var newReservation = req.body;
      newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();
      reservations.push(newReservation);
      res.json(newReservation);
  });

  app.listen(PORT, function() {
    console.log(`App listening on http://localhost:${PORT}`);
  });
  