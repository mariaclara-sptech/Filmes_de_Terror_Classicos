create database projeto_individual;

use projeto_individual;
 
 CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50)
);

CREATE TABLE votos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fkUsuario INT,

    aliens INT,
    chuck INT,
    donnie INT,
    exorcista INT,
    grenlis INT,
    halloween INT,
    hellraiser INT,
    scream INT,
    tubarao INT,

    CONSTRAINT fkUsuarioVoto 
        FOREIGN KEY (fkUsuario) REFERENCES usuario(id)
);

ALTER TABLE votos ADD UNIQUE (fkUsuario);

CREATE TABLE quiz (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fkUsuario INT,
    pontuacao INT,

    CONSTRAINT fkUsuarioQuiz 
        FOREIGN KEY (fkUsuario) REFERENCES usuario(id)
);

ALTER TABLE quiz ADD UNIQUE (fkUsuario);

select * from usuario;
select * from votos;
select * from quiz;