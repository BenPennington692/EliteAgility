var fs = require("fs");
var obj = [];

let cats = ['leadactor', 'supportactor', 'leadactress', 'supportactress', 'animatedfilm', 'cinematography',
            'costumes', 'directing', 'featuredoc', 'shortdoc', 'filmediting', 'foreign', 'makeup',
            'originalmusic', 'originalsong', 'bestpicture', 'production', 'animatedshort', 'liveshort',
            'soundediting', 'soundmixing', 'visualfx', 'adaptedwriting', 'originalwriting'];

let desc = ['ACTOR IN A LEADING ROLE', 'ACTOR IN A SUPPORTING ROLE', 'ACTRESS IN A LEADING ROLE',
            'ACTRESS IN A SUPPORTING ROLE', 'ANIMATED FEATURE FILM', 'CINEMATOGRAPHY', 'COSTUME DESIGN',
            'DIRECTING', 'DOCUMENTARY (Feature)', 'DOCUMENTARY (Short Subject)', 'FILM EDITING', 
            'FOREIGN LANGUAGE FILM', 'MAKEUP AND HAIRSTYLING', 'MUSIC (Original Score)', 
            'MUSIC (Original Song)', 'BEST PICTURE', 'PRODUCTION DESIGN', 'SHORT FILM (Animated)',
            'SHORT FILM (Live Action)', 'SOUND EDITING', 'SOUND MIXING', 'VISUAL EFFECTS', 
            'WRITING (Adapted Screenplay)', 'WRITING (Original Screenplay)'];

var appRouter = function (app) {

  fs.readFile("././" + "package.json", 'utf8', function (err, data) {
    if (err) throw err;
    obj = JSON.parse(data);
  });

  app.get("/", function (req, res) {
    res.write("usage: /movies/category/[CATEGORY]/year/[YEAR]/winner\n");
    res.write("list of categorys: /movies/category/\n");
    res.write("useable years: 2001-2017");
    res.status(200).send();
  });

  app.get("/movies", function (req, res) {
    res.status(200).send(obj);
  });

  app.get("/movies/*", function (req, res, next) {
    req.out = obj;
    next();
  });

  app.get("*/category/:cat/*", function (req, res, next) {
    var catResult = req.params.cat;
    var objIn = req.out;
    var newObj = [];
    if (cats.includes(catResult)) {
      var catIndex = cats.indexOf(catResult);
      for (i = 0; i < objIn.length; i++) {
          if (objIn[i].category == desc[catIndex]) {
              newObj.push(objIn[i]);
          } 
      }
  } else {
      res.status(400).send({ message: 'invalid category supplied' });
  }
  
  req.out = newObj;
  next();
});

app.get("*/year/:year/*", function (req, res, next) {
  var yearResult = req.params.year;
  var objIn = req.out;
  var newObj = [];
  if (yearResult >= 2001 && yearResult <= 2017) {
      for (i = 0; i < objIn.length; i++) {
          if (objIn[i].year == yearResult) {
              newObj.push(objIn[i]);
          } 
      }
  } else {
      res.status(400).send({ message: 'invalid year supplied' });
  }
  
  req.out = newObj;
  next();
});

app.get("*/winner/*", function (req, res, next) {
  var objIn = req.out;
  var newObj = [];
  for (i = 0; i < objIn.length; i++) {
      if (objIn[i].winner) {
        newObj.push(objIn[i]);
      } 
  }
  req.out = newObj;
  next();
});

app.get("*/category", function (req, res) {
    
  res.write('list of useable categories:\n\n');
  for (i = 0; i < cats.length; i++) {
      res.write(cats[i] + "\t\t<- " + desc[i] + "\n");
  }
  res.status(200).send();
});

app.get("*/category/:cat", function (req, res) {
  var catResult = req.params.cat;
  var objIn = req.out;
  var newObj = [];
  if (cats.includes(catResult)) {
      var catIndex = cats.indexOf(catResult);
      for (i = 0; i < objIn.length; i++) {
          if (objIn[i].category == desc[catIndex]) {
              newObj.push(objIn[i]);
          } 
      }
      res.status(200).send(newObj);
  } else {
      res.status(400).send({ message: 'invalid category supplied' });
  }
});

app.get("*/year", function (req, res) {
  res.status(200).send({ message: 'choose from years 2001-2017' });
});

app.get("*/year/:year", function (req, res) {
  var yearResult = req.params.year;
  var objIn = req.out;
  var newObj = [];
  if (yearResult >= 2001 && yearResult <= 2017) {
      for (i = 0; i < objIn.length; i++) {
          if (objIn[i].year == yearResult) {
              newObj.push(objIn[i]);
          } 
      }
      res.status(200).send(newObj);
  } else {
      res.status(400).send({ message: 'invalid year supplied' });
  }
});

app.get("*/winner", function (req, res) {
  var objIn = req.out;
  var newObj = [];
  for (i = 0; i < objIn.length; i++) {
      if (objIn[i].winner) {
        newObj.push(objIn[i]);
      } 
  }
  res.status(200).send(newObj);
});

app.get("*/winner", function (req, res) {
  var objIn = req.out;
  var newObj = [];
  for (i = 0; i < objIn.length; i++) {
      if (objIn[i].winner) {
        newObj.push(objIn[i]);
      } 
  }
  res.status(200).send(newObj);
});

}

module.exports = appRouter;