const Question = require("../models/Questions");
const { multipleMongooseToObject } = require("../util/mongoose");
const { mongooseToObject } = require("../util/mongoose");

function routes(app) {
  // [GET] /edit/:id
  app.get("/edit/:id", (req, res, next) => {
    Question.findById(req.params.id)
      .then((question) => {
        res.render("edit", {
          question: mongooseToObject(question),
        });
      })
      .catch(next);
  });

  // [PUT] /update/:id
  app.put("/update/:id", (req, res, next) => {
    const data = req.body;
    if (data.correctAnswer === undefined) {
      data.correctAnswer = "-1";
    }
    Question.updateOne({ _id: req.params.id }, data)
      .then(() => {
        res.redirect("/");
      })
      .catch(next);
  });

  // [GET] /add
  app.get("/add", (req, res) => {
    res.render("add");
  });

  // [POST] add/create
  app.post("/add/create", (req, res, next) => {
    const data = req.body;
    if (data.correctAnswer === undefined) {
      data.correctAnswer = "-1";
    }
    const question = new Question(data);
    question
      .save()
      .then(() => {
        res.redirect("/");
      })
      .catch(next);
  });

  // [DELETE] /delete/:id
  app.delete("/delete/:id", (req, res, next) => {
    Question.deleteOne({ _id: req.params.id })
      .then(() => {
        res.redirect("/");
      })
      .catch(next);
  });

  // [GET] /search
  app.get("/search", (req, res, next) => {
    const searchText = req.query.text;
    Question.find({ text: { $regex: searchText, $options: "i" } })
      .then((question) => {
        res.render("home", {
          question: multipleMongooseToObject(question),
        });
      })
      .catch(next);
  });

  // [GET] /
  app.get("/", (req, res, next) => {
    Question.find({})
      .then((question) => {
        res.render("home", {
          question: multipleMongooseToObject(question),
        });
      })
      .catch(next);
  });
}

module.exports = routes;
