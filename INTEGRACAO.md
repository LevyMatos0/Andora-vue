# Conteúdo do painel no site

O site consome a API existente e preserva os formulários do painel. Para o conteúdo bilíngue, duas consultas de leitura da API também expõem as traduções; os detalhes estão ao final deste documento.

| Conteúdo cadastrado | Consulta pública | Campos exibidos |
| --- | --- | --- |
| Destaque | `GET /api/site` → `hero` | título, descrição, imagem |
| Sobre | `GET /api/site` → `sobre` | título, texto, imagem |
| Contato | `GET /api/site` → `contato` | endereço, telefone, email, mapa; os três primeiros também no rodapé |
| Serviços | `GET /api/servicos` | título, descrição, informações adicionais, ícone/imagem; somente ativos, por ordem |
| Equipe | `GET /api/team` | nome, cargo, apresentação, foto, LinkedIn, GitHub; somente ativos, por ordem |
| FAQ | `GET /api/faqs?ativos=true` | pergunta e resposta; somente ativos, por ordem |
| Mensagens do formulário | `POST /api/mensagens` | nome, email, assunto e conteúdo, com status inicial `nova` |

Os dados são buscados ao abrir o site e ao voltar para sua aba/janela. Após cadastrar no painel, volte à aba do site ou recarregue a página. O seletor global do vue-i18n alterna os textos do banco entre os campos originais e os campos `_ingles`; quando uma tradução está ausente, nula ou em branco, o texto original é mantido. Não há tradução automática. Os rótulos e botões também mantêm português/inglês. Textos são renderizados como texto, não HTML. URLs de imagens relativas apontam para `/uploads/` no backend. Use uma URL de incorporação no campo mapa, não o HTML de um iframe.

Quando a API ainda não respondeu ou está indisponível na primeira carga, o site mantém o conteúdo original. Uma coleção retornada vazia, inclusive após desativar todos os registros, permanece vazia. Falhas em uma seção não impedem a carga das demais; uma atualização malsucedida preserva o último conteúdo recebido. Falhas do formulário são mostradas sem apagar os campos preenchidos.

## Desenvolvimento

Requer Node compatível com Vite 8 (validado com Node 24.19.0) e a API com MySQL acessível.

```sh
cd /workspace/Andora-vue
npm ci --legacy-peer-deps
npm run dev -- --host 127.0.0.1
```

`--legacy-peer-deps` é necessário com o lockfile atual: `npm ci` comum acusa os peers `@emnapi/core` e `@emnapi/runtime` ausentes. Não foi preciso modificar dependências nem o lockfile.

Em desenvolvimento, abra o site em `http://localhost:5174` e mantenha o painel em `http://localhost:5173`. O Vite encaminha as requisições `/api` e `/uploads` do site para `http://localhost:3000`, evitando conflito de CORS entre os dois frontends. `strictPort` impede que o site migre silenciosamente para outra porta. Se o painel estiver em 5174, pare ambos os frontends, inicie primeiro o painel em 5173 e depois o site em 5174.

Para usar outra API, defina em `.env.local` (ignorado pelo Git):

```dotenv
VITE_API_BASE_URL=https://api.seu-dominio.com
```

Use a URL raiz do backend, sem `/api` no final. Em desenvolvimento, essa variável configura o destino do proxy do Vite; em produção, configura a URL pública usada pelo navegador. Reinicie o Vite após alterar o arquivo. Essa variável é pública e não deve conter credenciais. O navegador nunca se conecta diretamente ao MySQL.

## Build e GitHub Pages

```sh
npm run build
```

O workflow de deploy lê a variável de repositório `VITE_API_BASE_URL` do GitHub Actions. Em GitHub Pages, configure-a com a URL HTTPS pública do backend antes do build. Sem a variável, produção usa a origem do próprio site, o que exige um backend atendendo `/api` e `/uploads` nessa origem. GitHub Pages sozinho não executa a API Node nem o MySQL. O CORS do backend deve permitir a origem do site (o backend atual já inclui `https://levymatos0.github.io`).

A implantação existente não foi executada. O banco de teste criado na nuvem é independente do banco no computador do usuário.


## Textos do banco e vue-i18n

O formato segue o SQL `gemini-code-1792112788487.sql` enviado pelo usuário. Ao escolher EN, o site usa as traduções já cadastradas; ao retornar a PT, restaura o texto original. A mudança é reativa, sem recarregar a página, refazer consultas ou modificar a resposta da API. Nomes próprios, fotos, links, email e telefone são preservados. O modelo não contém tradução de endereço: contato permanece como cadastrado.

| Seção | Campos em inglês na resposta da API |
| --- | --- |
| `/api/site` → `hero` | `titulo_ingles`, `descricao_ingles` |
| `/api/site` → `sobre` | `titulo_ingles`, `texto_ingles` |
| `/api/servicos` | `srv_titulo_ingles`, `srv_descricao_ingles`, `srv_informacoes_ingles` |
| `/api/team` | `tms_cargo_ingles`, `tms_apresentacao_ingles` |
| `/api/faqs` | `pergunta_ingles`, `resposta_ingles` |

A API normaliza `her_titulo_ingles` para `hero.titulo_ingles`, `abt_texto_ingles` para `sobre.texto_ingles` e os campos `faq_*_ingles` para os aliases acima. Serviços e equipe preservam os nomes do banco.

A versão anterior da API omitia as traduções de destaque, sobre e FAQ. Para essas seções funcionarem, atualize somente `andora-back/src/services/site.service.js` e `andora-back/src/services/faq.service.js` com a versão da branch `codex/integracao-idiomas-site` em https://github.com/LevyMatos0/painel-andora. Reinicie a API após copiar os dois arquivos. Preserve `.env`, `uploads` e os demais arquivos do seu projeto. As respostas em português mantêm os mesmos campos; bancos antigos sem colunas `_ingles` continuam funcionando.

Esta etapa integra a leitura dos textos. Ela não adiciona campos nem gravações nos formulários do painel. As traduções precisam estar preenchidas nas colunas `_ingles` do banco existente. `tb_user` é administrativo; os membros públicos do site continuam vindo de `tb_team`.

Não reimporte o SQL em um banco com dados: ele contém `DROP TABLE`. A validação do novo SQL foi feita em uma instância MySQL temporária, separada do banco de desenvolvimento.

Para executar todos os sete testes unitários do site:

```sh
node --test
```
