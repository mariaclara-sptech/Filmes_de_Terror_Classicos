var express = require("express");
var router = express.Router();

var filmeController = require("../controllers/filmeController");

router.get("/", function (req, res) {
    filmeController.listar(req, res);
});

router.get("/:id", function (req, res) {
    filmeController.obterPorId(req, res);
});

module.exports = router;