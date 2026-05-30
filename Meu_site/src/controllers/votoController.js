let votoModel = require("../models/votoModel");


    function registrar(req, res) {

    let idUsuario = req.body.idUsuarioServer
    let filmes = req.body.filmes

    votoModel.registrar(idUsuario, filmes)

    res.status(200).send("Votos registrados")
    

    console.log("ID USUARIO:", idUsuario)
    console.log("FILMES:", filmes)

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
            res.json(resultado)
        })
        .catch(function (erro) {
            console.log(erro)
            res.status(500).json({ erro: erro.sqlMessage })
        })

}
module.exports = {
    registrar,
    obterTodos,
    obterPorUsuario,
    obterMediaFilmes
};