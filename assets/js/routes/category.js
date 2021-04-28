const express = require("express");
let router = express.Router();
const year = require("./year");

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
            'WRITING (Adapted Screenplay)', 'WRITING (Original Screenplay)']

module.exports = router;


router.get("/", function (req, res) {
    
    res.write('list of useable categories:\n\n');
    for (i = 0; i < cats.length; i++) {
        res.write(cats[i] + "\t\t<- " + desc[i] + "\n");
    }
    res.status(200).send();
});

router.get("/:cat", function (req, res) {
    var catResult = req.params.cat;
    var obj = req.routes;
    var newObj = [];
    if (cats.includes(catResult)) {
        var catIndex = cats.indexOf(catResult);
        for (i = 0; i < obj.length; i++) {
            if (obj[i].category == desc[catIndex]) {
                newObj.push(obj[i]);
            } 
        }
        res.status(200).send(newObj);
    } else {
        res.status(400).send({ message: 'invalid category supplied' });
    }
});

router.use("/:cat/year", function (req, res, next) {
    var catResult = req.params.cat;
    var obj = req.routes;
    var newObj = [];
    if (cats.includes(catResult)) {
        var catIndex = cats.indexOf(catResult);
        for (i = 0; i < obj.length; i++) {
            if (obj[i].category == desc[catIndex]) {
                newObj.push(obj[i]);
            } 
        }
    } else {
        res.status(400).send({ message: 'invalid category supplied' });
    }
    
    req.category = newObj;
    next();
  }, year);