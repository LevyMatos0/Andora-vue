import test from 'node:test'
import assert from 'node:assert/strict'
import { localizePublicContent } from '../src/services/localizedContent.js'

const fixture = () => ({
  site: {
    hero: { titulo: 'Inovação', titulo_ingles: 'Innovation', descricao: 'Soluções', descricao_ingles: 'Solutions', imagem: 'hero.png' },
    sobre: { titulo: 'Sobre nós', titulo_ingles: 'About us', texto: 'Nossa história', texto_ingles: 'Our story' },
    contato: { endereco: 'São Paulo, Brasil', email: 'contato@andora.com', telefone: '123' },
  },
  servicos: [{ srv_codigo: 1, srv_titulo: 'Sistemas', srv_titulo_ingles: 'Software', srv_descricao: 'Descrição', srv_descricao_ingles: '', srv_informacoes: 'Detalhes', srv_informacoes_ingles: 'Details', srv_ativo: 1 }],
  equipe: [{ tms_nome: 'Levy', tms_cargo: 'Desenvolvedor', tms_cargo_ingles: 'Developer', tms_apresentacao: 'Apresentação', tms_apresentacao_ingles: 'Introduction', tms_imagem: 'foto.png' }],
  faqs: [{ id: 1, pergunta: 'Quanto custa?', pergunta_ingles: 'How much?', resposta: 'Depende', resposta_ingles: 'It depends' }],
})

test('idioma inglês seleciona traduções de todas as seções e preserva identidade, mídia e contato', () => {
  const content = fixture()
  const en = localizePublicContent(content, 'en-US')
  assert.equal(en.site.hero.titulo, 'Innovation')
  assert.equal(en.site.hero.descricao, 'Solutions')
  assert.equal(en.site.hero.imagem, 'hero.png')
  assert.equal(en.site.sobre.texto, 'Our story')
  assert.equal(en.site.contato.endereco, 'São Paulo, Brasil')
  assert.equal(en.site.contato.email, 'contato@andora.com')
  assert.equal(en.site.contato.telefone, '123')
  assert.equal(en.servicos[0].srv_titulo, 'Software')
  assert.equal(en.servicos[0].srv_informacoes, 'Details')
  assert.equal(en.servicos[0].srv_ativo, 1)
  assert.equal(en.equipe[0].tms_nome, 'Levy')
  assert.equal(en.equipe[0].tms_cargo, 'Developer')
  assert.equal(en.equipe[0].tms_apresentacao, 'Introduction')
  assert.equal(en.equipe[0].tms_imagem, 'foto.png')
  assert.equal(en.faqs[0].pergunta, 'How much?')
  assert.equal(en.faqs[0].resposta, 'It depends')
})

test('campos ausentes, nulos ou vazios mantêm o texto cadastrado em português', () => {
  const content = fixture()
  content.site.hero.titulo_ingles = null
  content.site.sobre.texto_ingles = '  '
  delete content.faqs[0].resposta_ingles
  const en = localizePublicContent(content, 'en')
  assert.equal(en.site.hero.titulo, 'Inovação')
  assert.equal(en.site.sobre.texto, 'Nossa história')
  assert.equal(en.servicos[0].srv_descricao, 'Descrição')
  assert.equal(en.faqs[0].resposta, 'Depende')
})

test('alternar de volta a português restaura conteúdo sem modificar a resposta da API', () => {
  const content = fixture()
  const original = structuredClone(content)
  localizePublicContent(content, 'en')
  assert.deepEqual(content, original)
  const pt = localizePublicContent(content, 'pt-BR')
  assert.equal(pt.site.hero.titulo, 'Inovação')
  assert.equal(pt.equipe[0].tms_cargo, 'Desenvolvedor')
  assert.equal(pt.faqs[0].pergunta, 'Quanto custa?')
})

test('preserva coleções vazias e o estado sem resposta para os fallbacks existentes', () => {
  const content = { site: null, servicos: null, equipe: [], faqs: [] }
  assert.deepEqual(localizePublicContent(content, 'en'), content)
})
