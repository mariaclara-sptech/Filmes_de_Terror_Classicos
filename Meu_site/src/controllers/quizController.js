var quizModel = require("../models/quizModel");
var usuarioModel = require("../models/usuarioModel");

function registrar(req, res) {
    var idUsuario = req.body.idUsuarioServer;
    var pontuacao = req.body.pontuacaoServer;

    if (idUsuario == undefined) {
        res.status(400).send("Seu idUsuario está undefined!");
    } else if (pontuacao == undefined) {
        res.status(400).send("Sua pontuacao está undefined!");
    } else {
        quizModel.registrar(idUsuario, pontuacao)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao registrar o quiz! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function obterTodos(req, res) {
    quizModel.obterTodos()
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function obterPorUsuario(req, res) {
    var idUsuario = req.params.id;

    if (idUsuario == undefined) {
        res.status(400).send("ID do usuário está undefined!");
    } else {
        quizModel.obterPorUsuario(idUsuario)
            .then(function (resultado) {
                if (resultado.length > 0) {
                    res.json(resultado[0]);
                } else {
                    res.status(404).send("Quiz não encontrado!");
                }
            })
            .catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function obterPontuacao(req, res) {
    var idUsuario = req.params.id;

    if (idUsuario == undefined) {
        res.status(400).send("ID do usuário está undefined!");
    } else {
        quizModel.obterPontuacaoPorUsuario(idUsuario)
            .then(function (resultado) {
                if (resultado.length > 0) {
                    res.json(resultado[0]);
                } else {
                    res.json({ pontuacao: 0 });
                }
            })
            .catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function obterRanking(req, res) {
    usuarioModel.obterRanking()
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    registrar,
    obterTodos,
    obterPorUsuario,
    obterPontuacao,
    obterRanking
};