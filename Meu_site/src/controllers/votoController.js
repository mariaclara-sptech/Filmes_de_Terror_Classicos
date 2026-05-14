let votoModel = require("../models/votoModel");

function registrar(req, res) {
    let idUsuario = Number(req.body.idUsuarioServer);
    let filmes = req.body.filmes;

    if (idUsuario == undefined || filmes == undefined) {
        res.status(400).send("Dados inválidos!");
    } else {
        votoModel.registrar(idUsuario, filmes)
            .then(function (resultado) {
                res.json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao registrar o voto! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function obterTodos(req, res) {
    votoModel.obterTodos()
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function obterPorUsuario(req, res) {
    let idUsuario = Number(req.params.id);

    if (idUsuario == undefined) {
        res.status(400).send("ID do usuário inválido!");
    } else {
        votoModel.obterPorUsuario(idUsuario)
            .then(function (resultado) {
                res.json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function obterMediaFilmes(req, res) {
    votoModel.obterMediaFilmes()
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
    obterMediaFilmes
};