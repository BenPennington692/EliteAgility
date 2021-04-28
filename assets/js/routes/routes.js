var fs = require("fs");
const category = require("./category");
var appRouter = function (app) {

  var obj;
  fs.readFile("./" + "package.json", 'utf8', function (err, data) {
    if (err) throw err;
    obj = JSON.parse(data);

  app.get("/", function (req, res) {
    res.write("usage: /movies/category/[CATEGORY]/year/[YEAR]/winner\n");
    res.write("list of categorys: /movies/category/\n");
    res.write("useable years: 2001-2017");
    res.status(200).send();
  });

  app.get("/movies", function (req, res) {
      res.status(200).send(obj);
    });
    
  });

  app.use("/movies/category", function (req, res, next) {
    req.routes = obj;
    next();
  }, category);

}

module.exports = appRouter;