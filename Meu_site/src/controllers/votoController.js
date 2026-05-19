let votoModel = require("../models/votoModel");


    function registrar(req, res) {

    let idUsuario = req.body.idUsuarioServer
    let filmes = req.body.filmes

    votoModel.registrar(idUsuario, filmes)

    res.status(200).send("Votos registrados")

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

function mediaFilmes(req, res) {

    votoModel.mediaFilmes()

        .then(function (resultado) {
            res.json(resultado)
        })

}

module.exports = {
    registrar,
    obterTodos,
    obterPorUsuario,
    mediaFilmes
};