// ==================== FUNÇÕES DASHBOARD ====================

async function carregarDashboard() {
    validarSessao();
    
    const idUsuario = sessionStorage.getItem('ID_USUARIO');
    
    try {
        // Buscar dados de votos do usuário
        const respostaUsuarioVotos = await fetch(`/votos/${idUsuario}`);
        const votosUsuario = await respostaUsuarioVotos.json();
        
        // Buscar dados do usuário específico
        const respostaUsuario = await fetch(`/usuarios/${idUsuario}`);
        const usuario = await respostaUsuario.json();
        
        // Buscar pontuação do quiz
        const respostaQuiz = await fetch(`/quiz/pontuacao/${idUsuario}`);
        const dadosQuiz = respostaQuiz.ok ? await respostaQuiz.json() : { pontuacao: 0 };
        
        // Buscar ranking
        const respostaRanking = await fetch('/usuarios/ranking');
        const ranking = await respostaRanking.json();
        
        // Buscar médias dos filmes
        const respostaMedia = await fetch('/votos/mediaFilmes');
        const mediaFilmes = await respostaMedia.json();
        
        // Calcular estatísticas do usuário
        calcularEstatisticas(usuario, votosUsuario, ranking, dadosQuiz);
        
        // Criar gráfico de notas gerais
        criarGraficoNotasGerais(mediaFilmes);
        
        // Criar ranking de usuários
        populateTopUsuarios(ranking);
        
    } catch (erro) {
        console.error("Erro ao carregar dashboard:", erro);
        alert("Erro ao carregar dados do dashboard!");
    }
}

function calcularEstatisticas(usuario, votosUsuario, ranking, dadosQuiz) {
    // KPI: Pontuação
    const pontuacao = dadosQuiz ? dadosQuiz.pontuacao : 0;
    document.getElementById('kpiPontuacao').innerHTML = pontuacao;
    
    // KPI: Ranking
    const posicaoRanking = ranking.findIndex(u => u.id === parseInt(sessionStorage.getItem('ID_USUARIO'))) + 1;
    document.getElementById('kpiRanking').innerHTML = '#' + posicaoRanking;
    
    // KPI: Filme Favorito - now the most voted movie overall
    if (mediaFilmes.length > 0) {
        const filmeFavorito = mediaFilmes.reduce((prev, current) => (prev.votos > current.votos) ? prev : current);
        document.getElementById('kpiFavorito').innerHTML = filmeFavorito.nome;
    }
    
    // KPI: Média de Filmes - now number of movies voted
    document.getElementById('kpiMedia').innerHTML = votosUsuario.length;
}

function criarGraficoNotasGerais(mediaFilmes) {
    const nomesFilmes = mediaFilmes.map(f => f.nome);
    const votosFilmes = mediaFilmes.map(f => f.votos);
    
    const ctxFilmes = document.getElementById('graficoFilmes').getContext('2d');
    
    new Chart(ctxFilmes, {
        type: 'bar',
        data: {
            labels: nomesFilmes,
            datasets: [{
                label: 'Número de Votos',
                data: votosFilmes,
                backgroundColor: [
                    '#8B0000',
                    '#A52A2A',
                    '#B22222',
                    '#DC143C',
                    '#FF6347',
                    '#FF7F50',
                    '#FFA07A',
                    '#FFB6C1',
                    '#FFC0CB'
                ],
                borderColor: '#333',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#fff'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: '#fff'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#fff'
                    }
                }
            }
        }
    });
}

function populateTopUsuarios(ranking) {
    const container = document.getElementById('rankingUsuarios');
    container.innerHTML = '';
    
    ranking.slice(0, 5).forEach((usuario, index) => {
        const div = document.createElement('div');
        div.className = 'usuario-ranking';
        div.innerHTML = `
            <span class="posicao">#${index + 1}</span>
            <span class="nome">${usuario.nome}</span>
            <span class="pontos">${usuario.pontuacaoQuiz || 0} pts</span>
        `;
        container.appendChild(div);
    });
}

// ==================== FUNÇÕES QUIZ ====================

async function carregarQuiz() {
    validarSessao();
    
    const idUsuario = sessionStorage.getItem('ID_USUARIO');
    
    try {
        const respostaUsuario = await fetch(`/usuarios/${idUsuario}`);
        const usuario = await respostaUsuario.json();
        
        // Buscar pontuação do quiz
        const respostaQuiz = await fetch(`/quiz/pontuacao/${idUsuario}`);
        const dadosQuiz = respostaQuiz.ok ? await respostaQuiz.json() : { pontuacao: 0 };
        
        // KPI: Pontuação do Quiz
        const pontuacao = dadosQuiz ? dadosQuiz.pontuacao : 0;
        document.getElementById('pontuacaoQuiz').innerHTML = pontuacao;
        
        // KPI: Ranking
        const respostaRanking = await fetch('/usuarios/ranking');
        const ranking = await respostaRanking.json();
        const posicao = ranking.findIndex(u => u.id === parseInt(idUsuario)) + 1;
        document.getElementById('rankingQuiz').innerHTML = '#' + posicao;
        
        // Gráfico de evolução (simulado com dados aleatórios)
        criarGraficoEvolution();
        
    } catch (erro) {
        console.error("Erro ao carregar quiz:", erro);
    }
}

function criarGraficoEvolution() {
    const ctxQuiz = document.getElementById('graficoQuiz').getContext('2d');
    
    // Simular dados de evolução (você pode integrar com dados reais do BD)
    const dados = [20, 35, 45, 52, 61, 70, 75, 82, 88, 92];
    
    new Chart(ctxQuiz, {
        type: 'line',
        data: {
            labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8', 'Sem 9', 'Sem 10'],
            datasets: [{
                label: 'Pontuação',
                data: dados,
                borderColor: '#DC143C',
                backgroundColor: 'rgba(220, 20, 60, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 5,
                pointBackgroundColor: '#DC143C'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        color: '#fff'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: '#fff'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#fff'
                    }
                }
            }
        }
    });
}

// ==================== FUNÇÕES FILMES ====================

async function carregarFilmes() {
    validarSessao();
    
    const idUsuario = sessionStorage.getItem('ID_USUARIO');
    
    try {
        const respostaTodos = await fetch('/votos/todos');
        const todosVotos = await respostaTodos.json();
        
        const respostaUsuario = await fetch(`/usuarios/${idUsuario}`);
        const usuario = await respostaUsuario.json();
        
        const votosUsuario = todosVotos.find(v => v.fkUsuario === parseInt(idUsuario));
        
        // KPI: Filme Favorito
        if (votosUsuario) {
            const filmes = {
                'aliens': 'Alien',
                'chuck': 'Chuck',
                'donnie': 'Donnie Darko',
                'exorcista': 'O Exorcista',
                'grenlis': 'Gremlins',
                'halloween': 'Halloween',
                'hellraiser': 'Hellraiser',
                'scream': 'Pânico',
                'tubarao': 'Tubarão'
            };
            
            let maiorNota = 0;
            let filmeFavorito = '-';
            
            Object.keys(filmes).forEach(chave => {
                if (votosUsuario[chave] > maiorNota) {
                    maiorNota = votosUsuario[chave];
                    filmeFavorito = filmes[chave];
                }
            });
            
            document.getElementById('favoritoFilme').innerHTML = filmeFavorito;
        }
        
        // KPI: Média Geral
        if (votosUsuario) {
            const notas = [
                votosUsuario.aliens,
                votosUsuario.chuck,
                votosUsuario.donnie,
                votosUsuario.exorcista,
                votosUsuario.grenlis,
                votosUsuario.halloween,
                votosUsuario.hellraiser,
                votosUsuario.scream,
                votosUsuario.tubarao
            ];
            
            const media = (notas.reduce((a, b) => a + b, 0) / notas.length).toFixed(1);
            document.getElementById('mediaGeral').innerHTML = media;
        }
        
        // Gráficos
        criarGraficoMediaFilmes(todosVotos, votosUsuario);
        criarGraficoComparacao(todosVotos, votosUsuario);
        
    } catch (erro) {
        console.error("Erro ao carregar filmes:", erro);
    }
}

function criarGraficoMediaFilmes(todosVotos, votosUsuario) {
    const filmes = ['aliens', 'chuck', 'donnie', 'exorcista', 'grenlis', 'halloween', 'hellraiser', 'scream', 'tubarao'];
    const nomesFilmes = ['Alien', 'Chuck', 'Donnie\nDarko', 'O\nExorcista', 'Gremlins', 'Halloween', 'Hellraiser', 'Pânico', 'Tubarão'];
    
    const mediasPorFilme = filmes.map(filme => {
        const notas = todosVotos
            .map(voto => voto[filme])
            .filter(nota => nota > 0);
        
        return notas.length > 0 ? (notas.reduce((a, b) => a + b, 0) / notas.length).toFixed(1) : 0;
    });
    
    const notasUsuario = filmes.map(filme => votosUsuario ? votosUsuario[filme] : 0);
    
    const ctxMedia = document.getElementById('graficoMedia').getContext('2d');
    
    new Chart(ctxMedia, {
        type: 'bar',
        data: {
            labels: nomesFilmes,
            datasets: [
                {
                    label: 'Comunidade',
                    data: mediasPorFilme,
                    backgroundColor: '#666',
                    borderWidth: 0
                },
                {
                    label: 'Você',
                    data: notasUsuario,
                    backgroundColor: '#DC143C',
                    borderWidth: 0
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 10,
                    ticks: {
                        color: '#fff'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: '#fff'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#fff'
                    }
                }
            }
        }
    });
}

function criarGraficoComparacao(todosVotos, votosUsuario) {
    const filmes = ['aliens', 'chuck', 'donnie', 'exorcista', 'grenlis', 'halloween', 'hellraiser', 'scream', 'tubarao'];
    const nomesFilmes = ['Alien', 'Chuck', 'Donnie\nDarko', 'O\nExorcista', 'Gremlins', 'Halloween', 'Hellraiser', 'Pânico', 'Tubarão'];
    
    // Calcular média da comunidade
    const mediasComunidade = filmes.map(filme => {
        const notas = todosVotos
            .map(voto => voto[filme])
            .filter(nota => nota > 0);
        
        return notas.length > 0 ? (notas.reduce((a, b) => a + b, 0) / notas.length).toFixed(1) : 0;
    });
    
    const notasUsuario = filmes.map(filme => votosUsuario ? votosUsuario[filme] : 0);
    
    const ctxComparacao = document.getElementById('graficoComparacao').getContext('2d');
    
    new Chart(ctxComparacao, {
        type: 'radar',
        data: {
            labels: nomesFilmes,
            datasets: [
                {
                    label: 'Comunidade',
                    data: mediasComunidade,
                    borderColor: '#666',
                    backgroundColor: 'rgba(102, 102, 102, 0.2)',
                    borderWidth: 2
                },
                {
                    label: 'Você',
                    data: notasUsuario,
                    borderColor: '#DC143C',
                    backgroundColor: 'rgba(220, 20, 60, 0.2)',
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 10,
                    ticks: {
                        color: '#fff'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#fff'
                    }
                }
            }
        }
    });
}
