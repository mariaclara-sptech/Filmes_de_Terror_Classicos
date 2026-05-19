let database = require("../database/config");

function registrar(idUsuario, filmes) {

    let deleteSql = `
        DELETE FROM votos
        WHERE fkUsuario = ${idUsuario};
    `;

    return database.executar(deleteSql)
        .then(function () {

            let promessas = [];

            for (let i = 0; i < filmes.length; i++) {

                let filme = filmes[i];

                let insertSql = `
                    INSERT INTO votos (fkUsuario, fkFilme, nota)
                    VALUES (${idUsuario}, ${filme.id}, ${filme.nota});
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
            f.nome AS filme,
            ROUND(AVG(v.nota), 1) AS media
        FROM votos v
        JOIN filme f
            ON v.fkFilme = f.id
        GROUP BY f.nome
        ORDER BY media DESC;
    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    registrar,
    obterTodos,
    obterPorUsuario,
    obterMediaFilmes
};