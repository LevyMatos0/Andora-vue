# Como testar no Windows

Você precisa do site deste repositório, da API do seu painel e do seu MySQL de teste. O banco e a API precisam estar funcionando para os cadastros aparecerem no site. Não é necessário usar os scripts da máquina na nuvem.

## 1. Baixar o site atualizado

1. Abra https://github.com/LevyMatos0/Andora-vue/tree/codex/integracao-painel-site.
2. Confira que a branch selecionada é `codex/integracao-painel-site`.
3. Clique no botão verde **Code** e depois em **Download ZIP**.
4. Na pasta Downloads, clique com o botão direito no ZIP e escolha **Extrair Tudo**. Abra a pasta extraída: ela deve conter `package.json`, `src` e este guia. Não execute os comandos dentro do ZIP.

## 2. Instalar o Node.js

Instale o **Node.js 24 LTS para Windows** em https://nodejs.org/. Mantenha a opção de adicionar ao PATH. Se já tem uma versão compatível instalada, pode usá-la.

Depois da instalação, feche e abra novamente o terminal. Se aparecer “node não é reconhecido”, reinicie o terminal ou o computador.

## 3. Iniciar a API que seu painel já utiliza

Se você já inicia a API para usar o painel, mantenha essa API aberta e vá ao passo 4.

Caso precise iniciá-la:

1. Inicie seu MySQL de teste como já faz no seu computador.
2. No Explorador de Arquivos, abra a pasta `andora-back` do projeto do painel. Essa pasta está no repositório https://github.com/LevyMatos0/painel-andora, separado deste site.
3. Clique na barra de endereço do Explorador, digite `cmd` e pressione Enter. Isso abre o Prompt de Comando já na pasta correta.
4. Execute, um comando por vez:

   ```bat
   npm.cmd ci
   if not exist uploads mkdir uploads
   node src/server.js
   ```

5. Deixe essa janela aberta. A API usa a porta 3000 por padrão.

O arquivo `.env` da API deve apontar para o MySQL de teste que você já utiliza. Se ele não existir, copie `.env.example` para `.env` e ajuste `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` e `JWT_SECRET` localmente. Não compartilhe esse arquivo nem as senhas. Se já existe, preserve suas configurações.

A pasta `uploads` deve ficar dentro de `andora-back`, ao lado de `package.json`. O comando acima cria a pasta apenas se ela não existir. Sem ela, cadastrar um membro com foto pode falhar com `ENOENT`. Isso não altera registros nem a configuração do banco.

Abra http://localhost:3000/api/servicos no navegador. Deve aparecer uma lista JSON (pode ser `[]`). Se aparecer erro 500, confira a conexão da API com o MySQL e se as tabelas existem. Não reimporte o SQL por cima de dados existentes: o modelo enviado contém comandos que apagam tabelas.

## 4. Iniciar o site

1. No Explorador de Arquivos, abra a pasta extraída do **site**, onde está `package.json`.
2. Clique na barra de endereço, digite `cmd` e pressione Enter. Abra uma janela nova; mantenha a janela da API funcionando.
3. Execute um comando por vez e aguarde a instalação terminar:

   ```bat
   npm.cmd ci --legacy-peer-deps
   npm.cmd run dev
   ```

4. Deixe a janela aberta e acesse **http://localhost:5174** no navegador. O site usa a porta 5174 e encaminha as chamadas à API pelo servidor de desenvolvimento. A porta **5173 fica reservada ao painel**, pois ela já é permitida pelo CORS da API.

Se o **painel** estiver aberto em `http://localhost:5174`, feche os dois servidores de frontend com Ctrl+C. Inicie primeiro o painel, confira que ele abriu em `http://localhost:5173` e só então inicie este site, que abrirá em `http://localhost:5174`. Mantenha a API funcionando em `http://localhost:3000`. Se a porta 5174 estiver ocupada, o site avisa e para, em vez de mudar silenciosamente para outra porta. Não é necessário desativar a segurança do navegador nem alterar o backend.

Se a API do seu painel usa um endereço diferente de `http://localhost:3000`, crie `.env.local` na raiz do site, ao lado de `package.json`, com:

```dotenv
VITE_API_BASE_URL=http://localhost:3000
```

Troque o endereço pelo da sua API, sem `/api` no final. Em desenvolvimento, essa variável configura o destino do encaminhamento de `/api` e `/uploads`; o navegador continua falando com o servidor do site na porta 5174. No Bloco de Notas, use **Salvar como → Tipo: Todos os arquivos** para não criar `.env.local.txt`. Depois reinicie o site: pressione Ctrl+C na janela dele e execute `npm.cmd run dev` novamente. Essa configuração é pública e não deve conter senhas.

## 5. Conferir os cadastros

1. Abra seu painel atual e cadastre um serviço **ativo**, com título e imagem.
2. Volte à aba do site ou pressione F5. O serviço deve aparecer na seção Serviços.
3. Altere o título no painel e atualize o site; depois desative o serviço e confira que o card desaparece.
4. Faça o mesmo com equipe e FAQ. Conteúdo de destaque, sobre e contato vem das seções correspondentes do painel.
5. Envie uma mensagem no formulário do site e consulte-a no painel.

O painel e o site devem usar a mesma API e o mesmo banco. O site não usa diretamente o banco de teste criado na nuvem. Se a API não puder ser carregada, o site mantém o conteúdo original na primeira carga; ver esse conteúdo sozinho não confirma a integração.

### Se os membros não aparecem

Com a API funcionando, abra `http://localhost:3000/api/team` no navegador. Se usa outra API, troque o endereço pelo mesmo usado pelo painel e pelo site.

- Uma lista com membros confirma que a API os encontrou. Para aparecer no site, cada membro deve estar ativo (`tms_status` igual a `1`).
- Uma lista vazia (`[]`) significa que essa API não encontrou membros no banco configurado. Confira se é o mesmo banco utilizado pelo painel antes de recadastrar ou importar qualquer SQL.
- Uma mensagem de erro requer diagnóstico da API/MySQL. Copie o erro do navegador e da janela que executa `node src/server.js`, sem compartilhar senhas.
- Se o erro de cadastro contém `ENOENT` e `uploads`, crie a pasta como no passo 3.
- Se contém `Unexpected field`, a API aceita a foto no campo de formulário `foto`; informe o erro para conferir a integração do painel antes de alterar o código.

Para encerrar, pressione **Ctrl+C** em cada janela que iniciou. O painel e o backend não foram alterados por esta integração. As mudanças estão em uma branch separada e não publicam automaticamente o site em produção.

## Verificações opcionais

Na janela de comandos do site, antes de iniciar ou após parar o servidor:

```bat
node --test tests/api.test.js
npm.cmd run build
```

O primeiro comando executa três testes. O segundo compila o site, mas não o publica. A compilação pode mostrar um aviso já existente sobre `dotted-world-1.webp`.
