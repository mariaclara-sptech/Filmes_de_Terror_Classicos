var express = require("express");
var router = express.Router();

var votoController = require("../controllers/votoController");

router.post("/registrar", function (req, res) {
    votoController.registrar(req, res);
});

module.exports = router;