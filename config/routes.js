var cheerio = require("cheerio");
var axios = require("axios");

var db = require("../models");

module.exports = function(router) {
  router.get("/", function(req, res) {
    db.Headlines.find({})
      .populate("comments")
      .sort({ _id: -1 })
      .then(function(data) {
        if (data.length === 0) {
          res.render("empty");
        } else {
          let articles = {
            articles: data
          };
          res.render("index", articles);
        }
      })
      .catch(function(err) {
        res.json(err);
      });
  });
  router.get("/scrape", function(req, res) {
    axios.get("https://www.reuters.com/theWire").then(function(response) {
      var $ = cheerio.load(response.data);

      var results = [];

      $("div.FeedItem_content-container").each(function(i, element) {
        // Save the text of the element in a "title" variable
        let title = $(this)
          .children(".FeedItem_right-wrap")
          .children("div.ImageStoryTemplate_image-story-container")
          .children("div")
          .children(".FeedItemHeadline_headline")
          .children("a")
          .text()
          .trim();
        // Save links
        let link = $(this)
          .children(".FeedItem_right-wrap")
          .children("div.ImageStoryTemplate_image-story-container")
          .children("div")
          .children(".FeedItemHeadline_headline")
          .children("a")
          .attr("href");

        let summary = $(this)
          .children(".FeedItem_right-wrap")
          .children("div.ImageStoryTemplate_image-story-container")
          .children("div")
          .children(".FeedItemLede_lede")
          .text();

        // Save results as array of objects
        let result = {
          title: title,
          link: link,
          summary: summary
        };
        console.log(result);
        db.Headlines.create(result)
          .then(function(dbHeadline) {})
          .catch(function(err) {
            // If an error occurred, log it
            console.log(err);
          });
      });

      res.redirect("/");
    });
  });
  router.post("/comments", function(req, res) {
    db.Comments.create(req.body)
      .then(function(dbNote) {
        // View the added result in the console
        db.Headlines.findByIdAndUpdate(
          dbNote._headlinesId,
          { $push: { comments: dbNote._id } },
          { new: true, upsert: true },
          function(err, parent) {
            if (err) throw err;
          }
        );
        res.json(dbNote);
      })
      .catch(function(err) {
        // If an error occurred, log it
        console.log(err);
      });
  });

  router.delete("/comments/:id", function(req, res) {
    db.Comments.deleteOne({ _id: req.params.id })
      .then(function(dbNote) {
        // View the added result in the console
        db.Headlines.findByIdAndUpdate(
          dbNote._headlinesId,
          { $pull: { comments: dbNote._id } },
          { new: true, upsert: true },
          function(err, parent) {
            if (err) throw err;
            console.log(parent);
          }
        );
        res.json(dbNote);
        console.log(dbNote);
      })
      .catch(function(err) {
        // If an error occurred, log it
        console.log(err);
      });
  });
};
