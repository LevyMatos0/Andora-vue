# Conteúdo do painel no site

O site consome a API existente, sem alterações no painel ou no backend.

| Conteúdo cadastrado | Consulta pública | Campos exibidos |
| --- | --- | --- |
| Destaque | `GET /api/site` → `hero` | título, descrição, imagem |
| Sobre | `GET /api/site` → `sobre` | título, texto, imagem |
| Contato | `GET /api/site` → `contato` | endereço, telefone, email, mapa; os três primeiros também no rodapé |
| Serviços | `GET /api/servicos` | título, descrição, informações adicionais, ícone/imagem; somente ativos, por ordem |
| Equipe | `GET /api/team` | nome, cargo, apresentação, foto, LinkedIn, GitHub; somente ativos, por ordem |
| FAQ | `GET /api/faqs?ativos=true` | pergunta e resposta; somente ativos, por ordem |
| Mensagens do formulário | `POST /api/mensagens` | nome, email, assunto e conteúdo, com status inicial `nova` |

Os dados são buscados ao abrir o site e ao voltar para sua aba/janela. Após cadastrar no painel, volte à aba do site ou recarregue a página. Os textos do banco são exibidos como cadastrados, sem tradução automática; os rótulos e botões mantêm português/inglês. Textos são renderizados como texto, não HTML. URLs de imagens relativas apontam para `/uploads/` no backend. Use uma URL de incorporação no campo mapa, não o HTML de um iframe.

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
