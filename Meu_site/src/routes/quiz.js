var express = require("express");
var router = express.Router();

var quizController = require("../controllers/quizController");

router.post("/registrar", function (req, res) {
    quizController.registrar(req, res);
});

router.get("/todos", function (req, res) {
    quizController.obterTodos(req, res);
});

router.get("/pontuacao/:id", function (req, res) {
    quizController.obterPontuacao(req, res);
});

router.get("/tentativas/:idUsuario", function(req, res) {
    quizController.obterQuantidadeTentativas(req, res);
});

router.get("/:id", function (req, res) {
    quizController.obterPorUsuario(req, res);
});

module.exports = router;