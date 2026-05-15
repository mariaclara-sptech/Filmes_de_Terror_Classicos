# 📊 Configuração do Dashboard - Vintage Frights

## ✅ O que foi feito

### 1. **Arquivo JavaScript de Dashboard** 
Criado: `public/js/dashboard.js`

Este arquivo contém todas as funções necessárias para carregar e exibir dados nos dashboards:

- **`carregarDashboard()`** - Carrega a página geral com:
  - KPI de Pontuação
  - KPI de Ranking
  - KPI de Filme Favorito
  - KPI de Média de Filmes
  - Gráfico de barras com notas gerais dos filmes
  - Ranking dos top 5 usuários

- **`carregarQuiz()`** - Carrega a página de quiz com:
  - KPI de Pontuação do Quiz
  - KPI de Ranking
  - Gráfico de linha mostrando evolução

- **`carregarFilmes()`** - Carrega a página de filmes com:
  - KPI de Filme Favorito
  - KPI de Média Geral
  - Gráfico comparativo (comunidade vs você)
  - Gráfico radar (você vs comunidade)

### 2. **Endpoints de API (GET)**

#### Usuários:
```
GET /usuarios/ranking          → Retorna ranking de todos os usuários
GET /usuarios/:id              → Retorna dados de um usuário específico
```

#### Votos:
```
GET /votos/todos               → Retorna todos os votos
GET /votos/:id                 → Retorna votos de um usuário específico
```

#### Quiz:
```
GET /quiz/todos                → Retorna todos os quiz
GET /quiz/:id                  → Retorna quiz de um usuário específico
```

### 3. **Alterações nos Arquivos**

#### Models Atualizados:
- `src/models/usuarioModel.js` - Adicionados: `obterPorId()`, `obterRanking()`
- `src/models/votoModel.js` - Adicionados: `obterTodos()`, `obterPorUsuario()`
- `src/models/quizModel.js` - Adicionados: `obterTodos()`, `obterPorUsuario()`

#### Controllers Atualizados:
- `src/controllers/usuarioController.js` - Adicionados: `obterPorId()`, `obterRanking()`
- `src/controllers/votoController.js` - Adicionados: `obterTodos()`, `obterPorUsuario()`
- `src/controllers/quizController.js` - Adicionados: `obterTodos()`, `obterPorUsuario()`

#### Routes Atualizadas:
- `src/routes/usuarios.js` - Adicionadas rotas GET
- `src/routes/votos.js` - Adicionadas rotas GET
- `src/routes/quiz.js` - Adicionadas rotas GET

#### HTML Atualizados:
- `public/dashboard/pagina.geral.html` - Adicionado script `dashboard.js`
- `public/dashboard/pagina.quiz.html` - Adicionado script `dashboard.js`
- `public/dashboard/pagina.votacao.html` - Adicionado script `dashboard.js`

## 🚀 Como Usar

### 1. **Verificar se o Banco de Dados tem as Tabelas Corretas**

Certifique-se de que seu banco de dados tem as seguintes tabelas:
- `usuario` - com campos: `id`, `nome`, `email`, `senha`
- `votos` - com campos: `fkUsuario`, `aliens`, `chuck`, `donnie`, `exorcista`, `grenlis`, `halloween`, `hellraiser`, `scream`, `tubarao`
- `quiz` - com campos: `fkUsuario`, `pontuacao`

### 2. **Iniciar o Servidor**

```bash
node app.js
```

### 3. **Fazer Login**

Acesse a página de login e autentique-se. O sistema armazenará:
- `sessionStorage.ID_USUARIO`
- `sessionStorage.NOME_USUARIO`
- `sessionStorage.EMAIL_USUARIO`

### 4. **Acessar o Dashboard**

Os gráficos serão carregados automaticamente quando você acessar:
- Dashboard Geral: `/dashboard/pagina.geral.html`
- Dashboard Quiz: `/dashboard/pagina.quiz.html`
- Dashboard Filmes: `/dashboard/pagina.votacao.html`

## 📈 Dados dos Gráficos

Os gráficos utilizam **Chart.js** e mostram:

### Dashboard Geral
- **Gráfico de Barras**: Média de notas de cada filme em tempo real
- **Ranking**: Top 5 usuários com mais pontos

### Dashboard Quiz
- **Gráfico de Linha**: Evolução da pontuação ao longo do tempo

### Dashboard Filmes
- **Gráfico de Barras**: Comparação de médias (comunidade vs você)
- **Gráfico Radar**: Comparação visual em forma de spider/radar

## 🔧 Configuração de Cores

Os gráficos usam uma paleta de cores em tons de vermelho (tema de terror):
- `#DC143C` (Vermelho crimssom) - Destaque principal
- `#8B0000` a `#FFC0CB` - Gradiente de cores

## ⚠️ Pontos Importantes

1. **ID do Usuário**: O sistema depende de `sessionStorage.ID_USUARIO`. Se não estiver definido, haverá erro.

2. **CORS**: Certifique-se de que CORS está habilitado no `app.js` (já está configurado).

3. **Dados Vazios**: Se nenhum voto foi registrado, os gráficos mostrarão 0. Faça alguns votos primeiro!

4. **Formatos de Resposta**: As queries SQL retornam arrays. O código acessa `resultado[0]` para dados únicos e itera para dados múltiplos.

## 🐛 Troubleshooting

### "Erro ao carregar dashboard"
- Verifique se o servidor está rodando
- Verifique se está logado (sessionStorage.ID_USUARIO deve existir)
- Abra o console do navegador (F12) para ver erros específicos

### "NaN nos KPIs"
- Pode significar que não há dados de quiz registrados
- Use `isNaN()` para validar ou mostre "0" como padrão

### "Gráficos não aparecem"
- Verifique se o Chart.js está carregado
- Verifique se o canvas tem id correto
- Verifique se há dados sendo retornados da API

## 📝 Próximas Melhorias

1. Adicionar filtros de data nos gráficos
2. Exportar dados em CSV
3. Adicionar mais tipos de gráficos
4. Implementar atualização em tempo real com WebSockets
5. Adicionar permissões (usuário só vê seus dados)
