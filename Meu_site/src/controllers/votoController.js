let votoModel = require("../models/votoModel");

function registrar(req, res) {
    let idUsuario = req.body.idUsuarioServer
    let filmes = req.body.filmes

    console.log("ID USUARIO:", idUsuario)
    console.log("FILMES:", filmes)

    votoModel.registrar(idUsuario, filmes)
        .then(function () {
            res.status(200).json({ mensagem: "Votos registrados com sucesso" })
        })
        .catch(function (erro) {
            console.log("Erro ao registrar votos:", erro)
            res.status(500).json({ erro: erro.sqlMessage || "Erro ao registrar votos" })
        })
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