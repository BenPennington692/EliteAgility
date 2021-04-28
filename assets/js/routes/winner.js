const express = require("express");
let router = express.Router();

module.exports = router;

router.get("/", function (req, res) {
    var obj = req.year;
    var newObj = [];
    for (i = 0; i < obj.length; i++) {
        if (obj[i].winner) {
            res.status(200).send(obj[i]);
        } 
    }
});