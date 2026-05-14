var database = require("../database/config")

function registrar(idUsuario, pontuacao) {
    console.log("ACESSEI O QUIZ MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function registrar(): ", idUsuario, pontuacao)
    var instrucaoSql = `
        INSERT INTO quiz (fkUsuario, pontuacao)
        VALUES ('${idUsuario}', '${pontuacao}')
        ON DUPLICATE KEY UPDATE
        pontuacao = VALUES(pontuacao);
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterTodos() {
    console.log("ACESSEI O QUIZ MODEL - obterTodos")
    var instrucaoSql = `
        SELECT * FROM quiz;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterPorUsuario(idUsuario) {
    console.log("ACESSEI O QUIZ MODEL - obterPorUsuario: ", idUsuario)
    var instrucaoSql = `
        SELECT * FROM quiz WHERE fkUsuario = '${idUsuario}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterPontuacaoPorUsuario(idUsuario) {
    console.log("ACESSEI O QUIZ MODEL - obterPontuacaoPorUsuario: ", idUsuario)
    var instrucaoSql = `
        SELECT COALESCE(pontuacao, 0) AS pontuacao FROM quiz WHERE fkUsuario = '${idUsuario}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    registrar,
    obterTodos,
    obterPorUsuario,
    obterPontuacaoPorUsuario
};