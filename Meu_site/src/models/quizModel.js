var database = require("../database/config");


async function registrar(idUsuario, filmes) {

    let sqlDelete = `
        DELETE FROM votos
        WHERE fkUsuario = ${idUsuario}
    `

    await database.executar(sqlDelete)

    for (let i = 0; i < filmes.length; i++) {

        let sqlInsert = `
            INSERT INTO votos (fkUsuario, fkFilme, nota)
            VALUES (
                ${idUsuario},
                ${filmes[i].idFilme},
                ${filmes[i].nota}
            )
        `

        await database.executar(sqlInsert)

    }

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

function obterRanking(idUsuario) {
  var instrucaoSql = `
        SELECT
    usuario.id,
    usuario.nome,
    MAX(quiz.pontuacao) AS pontuacao
    FROM usuario
    JOIN quiz
        ON usuario.id = quiz.fkUsuario
    GROUP BY usuario.id, usuario.nome
    ORDER BY pontuacao DESC;
    `;

  return database.executar(instrucaoSql);
}

function obterPontuacaoPorUsuario(idUsuario) {
  console.log("ACESSEI O QUIZ MODEL - obterPontuacaoPorUsuario: ", idUsuario);
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
  obterPontuacaoPorUsuario,
  obterRanking,
};
