var filmeModel = require("../models/filmeModel");

function listar(req, res) {
    filmeModel.listar()
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function obterPorId(req, res) {
    var idFilme = req.params.id;

    if (idFilme == undefined) {
        res.status(400).send("Seu idFilme está undefined!");
    } else {
        filmeModel.obterPorId(idFilme)
            .then(function (resultado) {
                res.json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    listar,
    obterPorId
};