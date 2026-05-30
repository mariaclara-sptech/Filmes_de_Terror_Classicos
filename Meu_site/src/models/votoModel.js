let database = require("../database/config");


function registrar(idUsuario, filmes) {

    let sqlDelete = `
        DELETE FROM votos
        WHERE fkUsuario = ${idUsuario}
    `

    database.executar(sqlDelete)

    for (let i = 0; i < filmes.length; i++) {

        let sqlInsert = `
            INSERT INTO votos (fkUsuario, fkFilme, nota)
            VALUES (
                ${idUsuario},
                ${filmes[i].idFilme},
                ${filmes[i].nota}
            )
        `

        database.executar(sqlInsert)

    }

}


function obterTodos() {

    let instrucaoSql = `
        SELECT 
            v.id,
            u.nome AS usuario,
            f.nome AS filme,
            v.nota
        FROM votos v
        JOIN usuario u
            ON v.fkUsuario = u.id
        JOIN filme f
            ON v.fkFilme = f.id;
    `;

    return database.executar(instrucaoSql);

}

function obterPorUsuario(idUsuario) {

    let instrucaoSql = `
        SELECT 
            f.id,
            f.nome,
            v.nota
        FROM votos v
        JOIN filme f
            ON v.fkFilme = f.id
        WHERE v.fkUsuario = ${idUsuario};
    `;

    return database.executar(instrucaoSql);

}

function obterMediaFilmes() {

    let instrucaoSql = `
        SELECT
            filme.nome AS filme,
            ROUND(AVG(votos.nota), 1) AS media
        FROM votos
        JOIN filme
            ON votos.fkFilme = filme.id
        GROUP BY filme.id, filme.nome
        ORDER BY media DESC
    `

    return database.executar(instrucaoSql)

}

module.exports = {
    registrar,
    obterTodos,
    obterPorUsuario,
    obterMediaFilmes
};