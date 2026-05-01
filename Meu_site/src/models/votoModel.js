var database = require("../database/config")

function registrar(idUsuario, aliens, chuck, donnie, exorcista, grenlis, halloween, hellraiser, scream, tubarao) {
    console.log("ACESSEI O VOTO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function registrar(): ", idUsuario, aliens, chuck, donnie, exorcista, grenlis, halloween, hellraiser, scream, tubarao)
    var instrucaoSql = `
        INSERT INTO votos (fkUsuario, aliens, chuck, donnie, exorcista, grenlis, halloween, hellraiser, scream, tubarao) 
        VALUES ('${idUsuario}', '${aliens}', '${chuck}', '${donnie}', '${exorcista}', '${grenlis}', '${halloween}', '${hellraiser}', '${scream}', '${tubarao}')
        ON DUPLICATE KEY UPDATE 
        aliens = VALUES(aliens), chuck = VALUES(chuck), donnie = VALUES(donnie), exorcista = VALUES(exorcista), 
        grenlis = VALUES(grenlis), halloween = VALUES(halloween), hellraiser = VALUES(hellraiser), scream = VALUES(scream), tubarao = VALUES(tubarao);
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    registrar
};