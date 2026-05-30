var quizModel = require("../models/quizModel");
var usuarioModel = require("../models/usuarioModel");

async function registrar(req, res) {

    let idUsuario = req.body.idUsuarioServer
    let filmes = req.body.filmes

    try {

        await votoModel.registrar(idUsuario, filmes)

        res.status(200).send("Votos registrados")

    } catch (erro) {

        console.log(erro)
        res.status(500).send(erro.sqlMessage)

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