var database = require("../database/config");

// Registra uma tentativa de quiz para o usuário, inserindo uma linha
// na tabela `quiz` com a pontuação obtida.
function registrar(idUsuario, pontuacao) {

  var instrucaoSql = `
    INSERT INTO quiz (fkUsuario, pontuacao)
    VALUES (${idUsuario}, ${pontuacao});
  `;

  return database.executar(instrucaoSql);

}

function obterTodos() {
  console.log("ACESSEI O QUIZ MODEL - obterTodos");
  var instrucaoSql = `
        SELECT * FROM quiz;
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function obterPorUsuario(idUsuario) {
  console.log("ACESSEI O QUIZ MODEL - obterPorUsuario: ", idUsuario);
  var instrucaoSql = `
        SELECT * FROM quiz WHERE fkUsuario = '${idUsuario}';
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function obterQuantidadeTentativas(idUsuario) {

    let instrucaoSql = `
        SELECT COUNT(*) AS quantidadeTentativas
        FROM quiz
        WHERE fkUsuario = ${idUsuario};
    `;

    return database.executar(instrucaoSql);

}

function obterPontuacaoPorUsuario(idUsuario) {
  console.log("ACESSEI O QUIZ MODEL - obterPontuacaoPorUsuario: ", idUsuario);
  var instrucaoSql = `
        SELECT IFNULL(MAX(pontuacao), 0) AS pontuacao
        FROM quiz
        WHERE fkUsuario = ${idUsuario};
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  registrar,
  obterTodos,
  obterPorUsuario,
  obterPontuacaoPorUsuario,
  obterQuantidadeTentativas
};
