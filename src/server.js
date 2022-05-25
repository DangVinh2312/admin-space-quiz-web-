const path = require("path");
const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const route = require("./routes");
const port = 3000;

// Database
const mongoose = require("mongoose");

// Static routes
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MethodOverride
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

// Template engine
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
      findIndex: (a, b) => a[b],
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Route init
route(app);

app.listen(port, async () => {
  await mongoose.connect("mongodb://localhost:27017/wpr-quiz");
  console.log("Connect successfully");
});
