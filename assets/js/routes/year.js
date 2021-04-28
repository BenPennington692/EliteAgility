const express = require("express");
let router = express.Router();
const winner = require("./winner");
module.exports = router;


router.get("/", function (req, res) {
    res.status(200).send({ message: 'choose from years 2001-2017' });
});

router.get("/:year", function (req, res) {
    var yearResult = req.params.year;
    var obj = req.category;
    var newObj = [];
    if (yearResult >= 2001 && yearResult <= 2017) {
        for (i = 0; i < obj.length; i++) {
            if (obj[i].year == yearResult) {
                newObj.push(obj[i]);
            } 
        }
        res.status(200).send(newObj);
    } else {
        res.status(400).send({ message: 'invalid year supplied' });
    }
  });

  router.use("/:year/winner", function (req, res, next) {
    var yearResult = req.params.year;
    var obj = req.category;
    var newObj = [];
    if (yearResult >= 2001 && yearResult <= 2017) {
        for (i = 0; i < obj.length; i++) {
            if (obj[i].year == yearResult) {
                newObj.push(obj[i]);
            } 
        }
    } else {
        res.status(400).send({ message: 'invalid year supplied' });
    }
    
    req.year = newObj;
    next();
  }, winner);