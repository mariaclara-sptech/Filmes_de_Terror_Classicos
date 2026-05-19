let express = require("express");
let router = express.Router();

let votoController = require("../controllers/votoController");

router.post("/registrar", function (req, res) {
    votoController.registrar(req, res);
});

router.get("/todos", function (req, res) {
    votoController.obterTodos(req, res);
});

router.get("/usuario/:id", function (req, res) {
    votoController.obterPorUsuario(req, res);
});

router.get("/media/filmes", function (req, res) {
    votoController.obterMediaFilmes(req, res);
});

module.exports = router;