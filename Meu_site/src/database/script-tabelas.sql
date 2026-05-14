CREATE DATABASE projeto_individual;

USE projeto_individual;

CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50),
    email VARCHAR(50) UNIQUE,
    senha VARCHAR(50)
);

CREATE TABLE filme (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50)
);

CREATE TABLE votos (
    id INT PRIMARY KEY AUTO_INCREMENT,

    fkUsuario INT,
    fkFilme INT,

    CONSTRAINT ukUsuarioFilme
        UNIQUE (fkUsuario, fkFilme),

    CONSTRAINT fkVotoUsuario
        FOREIGN KEY (fkUsuario)
        REFERENCES usuario(id),

    CONSTRAINT fkVotoFilme
        FOREIGN KEY (fkFilme)
        REFERENCES filme(id)
);

CREATE TABLE quiz (
    id INT PRIMARY KEY AUTO_INCREMENT,

    fkUsuario INT,
    pontuacao INT,

    CONSTRAINT fkQuizUsuario
        FOREIGN KEY (fkUsuario)
        REFERENCES usuario(id)
);

INSERT INTO filme (nome) VALUES
('Alien'),
('Chuck'),
('Donnie Darko'),
('O Exorcista'),
('Gremlins'),
('Halloween'),
('Hellraiser'),
('Scream'),
('Tubarão');

SELECT * FROM usuario;
SELECT * FROM filme;
SELECT * FROM votos;
SELECT * FROM quiz;