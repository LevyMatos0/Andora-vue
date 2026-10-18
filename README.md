# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).

## Publicar na Vercel

Use Node.js 24, Framework Vite, a raiz do repositório, `npm ci`, `npm run build` e saída `dist`. O arquivo `vercel.json` contém a configuração. Configure `VITE_API_BASE_URL` com a URL pública HTTPS da API antes do build; o endereço aceita `/api` no final ou somente a origem. O modelo está em `.env.production.example`. Nunca coloque credenciais privadas em variáveis `VITE_*`.

No serviço da API, inclua o domínio exato deste site em `FRONTEND_URLS`, junto com o domínio do painel. Após alterar variáveis do Vite, faça novo deploy. O guia completo de banco, volume, autenticação e e-mail está em [HOSPEDAGEM.md do repositório painel-andora](https://github.com/LevyMatos0/painel-andora/blob/codex/preparacao-hospedagem/HOSPEDAGEM.md).
