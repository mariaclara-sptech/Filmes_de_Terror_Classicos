var votoModel = require("../models/votoModel");

function registrar(req, res) {
    var idUsuario = req.body.idUsuarioServer;
    var aliens = req.body.aliens;
    var chuck = req.body.chuck;
    var donnie = req.body.donnie;
    var exorcista = req.body.exorcista;
    var grenlis = req.body.grenlis;
    var halloween = req.body.halloween;
    var hellraiser = req.body.hellraiser;
    var scream = req.body.scream;
    var tubarao = req.body.tubarao;

    if (idUsuario == undefined) {
        res.status(400).send("Seu idUsuario está undefined!");
    } else {
        votoModel.registrar(idUsuario, aliens, chuck, donnie, exorcista, grenlis, halloween, hellraiser, scream, tubarao)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao registrar o voto! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    registrar
};