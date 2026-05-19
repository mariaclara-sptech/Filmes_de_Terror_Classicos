var database = require("../database/config")

function listar() {
    console.log("ACESSEI O FILME MODEL - listar")
    var instrucaoSql = `
        SELECT id, nome FROM filme;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterPorId(idFilme) {
    console.log("ACESSEI O FILME MODEL - obterPorId: ", idFilme)
    var instrucaoSql = `
        SELECT id, nome FROM filme WHERE id = ${idFilme};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listar,
    obterPorId
};