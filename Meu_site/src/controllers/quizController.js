var quizModel = require("../models/quizModel");
var usuarioModel = require("../models/usuarioModel");

async function registrar(req, res) {

    let idUsuario = req.body.idUsuarioServer;
    let pontuacao = req.body.pontuacaoServer;

    if (idUsuario == undefined || pontuacao == undefined) {
        res.status(400).send("Dados do quiz incompletos");
        return;
    }

    try {
        await quizModel.registrar(idUsuario, pontuacao);
        res.status(200).send("Quiz registrado");
    } catch (erro) {
        console.log(erro);
        res.status(500).send(erro.sqlMessage || erro);
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

function obterQuantidadeTentativas(req, res) {

    let idUsuario = req.params.idUsuario;

    quizModel.obterQuantidadeTentativas(idUsuario)
        .then(function(resultado) {

            res.json(resultado[0]);

        })
        .catch(function(erro) {

            res.status(500).send(erro);

        });

}

module.exports = {
    registrar,
    obterTodos,
    obterPorUsuario,
    obterPontuacao,
    obterQuantidadeTentativas
};