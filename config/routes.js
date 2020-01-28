var cheerio = require("cheerio");
var axios = require("axios");

// First, tell the console what server.js is doing
console.log(
  "\n***********************************\n" +
    "Grabbing every thread name and link\n" +
    "from reddit's webdev board:" +
    "\n***********************************\n"
);
axios.get("https://www.reuters.com/").then(function(response) {
  var $ = cheerio.load(response.data);

  var results = [];

  $("li.article").each(function(i, element) {
    // Save the text of the element in a "title" variable
    var title = $(this)
      .children(".article-heading")
      .children("a")
      .text();
    // Save links
    var link = $(this)
      .children(".article-heading")
      .children("a")
      .attr("href");

    // Save results as array of objects
    results.push({
      title: title,
      link: link
    });
  });

  console.log(results);
});
