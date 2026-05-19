function carregarDashboard() {

    validarSessao()

    let idUsuario = sessionStorage.ID_USUARIO

    carregarPontuacao(idUsuario)
    carregarRanking()
    carregarFavorito(idUsuario)
    carregarGrafico()

}

function carregarPontuacao(idUsuario) {

    fetch(`/quiz/pontuacao/${idUsuario}`)

        .then(function (resposta) {
            return resposta.json()
        })

        .then(function (dados) {

            document.getElementById("pontuacaoQuiz").innerHTML =
                dados.pontuacao || 0

        })

}

function carregarRanking() {

    fetch("/quiz/ranking")

        .then(function (resposta) {
            return resposta.json()
        })

        .then(function (dados) {

            for (let i = 0; i < dados.length; i++) {

                if (dados[i].nome == sessionStorage.NOME_USUARIO) {

                    document.getElementById("rankingQuiz").innerHTML =
                        "#" + (i + 1)

                }

            }

        })

}

function carregarFavorito(idUsuario) {

    fetch(`/votos/usuario/${idUsuario}`)

        .then(function (resposta) {
            return resposta.json()
        })

        .then(function (dados) {

            let maiorNota = 0
            let filmeFavorito = "-"

            for (let i = 0; i < dados.length; i++) {

                if (dados[i].nota > maiorNota) {

                    maiorNota = dados[i].nota
                    filmeFavorito = dados[i].nome

                }

            }

            document.getElementById("favoritoFilme").innerHTML =
                filmeFavorito

        })

}

function carregarGrafico() {

    fetch("/votos/media/filmes")

        .then(function (resposta) {
            return resposta.json()
        })

        .then(function (dados) {

            let filmes = []
            let medias = []

            for (let i = 0; i < dados.length; i++) {

                filmes.push(dados[i].filme)
                medias.push(dados[i].media)

            }

            new Chart(document.getElementById("graficoMedia"), {

                type: "bar",

                data: {

                    labels: filmes,

                    datasets: [{

                        label: "Média",

                        data: medias,

                        borderWidth: 1

                    }]

                },

                options: {

                    scales: {

                        y: {

                            beginAtZero: true,
                            max: 5

                        }

                    }

                }

            })

        })

}