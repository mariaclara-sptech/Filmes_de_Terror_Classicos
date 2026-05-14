let database = require("../database/config");

function registrar(idUsuario, filmes) {

    let deleteSql = `
        DELETE FROM votos
        WHERE fkUsuario = ${idUsuario};
    `;

    return database.executar(deleteSql)
        .then(() => {

            let promessas = [];

            for (let i = 0; i < filmes.length; i++) {

                let insertSql = `
                    INSERT INTO votos (fkUsuario, fkFilme)
                    VALUES (${idUsuario}, ${filmes[i]});
                `;

                promessas.push(database.executar(insertSql));
            }

            return Promise.all(promessas);
        });
}

function obterTodos() {

    let instrucaoSql = `
        SELECT 
            v.id,
            u.nome AS usuario,
            f.nome AS filme
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
            f.nome
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
            f.nome AS filme,
            COUNT(v.id) AS totalVotos
        FROM filme f
        LEFT JOIN votos v
            ON f.id = v.fkFilme
        GROUP BY f.id
        ORDER BY totalVotos DESC;
    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    registrar,
    obterTodos,
    obterPorUsuario,
    obterMediaFilmes
};