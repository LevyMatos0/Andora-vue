import test from 'node:test'
import assert from 'node:assert/strict'
import { activeItems, apiBase, apiRequest, safeHttpUrl, uploadUrl } from '../src/services/api.js'

test('somente itens ativos, em ordem, sem alterar a resposta original', () => {
  const rows = [{ ativo: 1, ordem: 3 }, { ativo: 0, ordem: 0 }, { ativo: '1', ordem: 1 }]
  assert.deepEqual(activeItems(rows, 'ativo', 'ordem'), [rows[2], rows[0]])
  assert.equal(rows[0].ordem, 3)
  assert.deepEqual(activeItems([{ ativo: 0, ordem: 1 }], 'ativo', 'ordem'), [])
})

test('imagens vêm dos uploads da API e URLs executáveis são rejeitadas', () => {
  assert.equal(uploadUrl('foto equipe.png'), `${apiBase}/uploads/foto%20equipe.png`)
  assert.equal(uploadUrl('/uploads/foto.png'), `${apiBase}/uploads/foto.png`)
  assert.equal(uploadUrl('https://example.com/foto.png'), 'https://example.com/foto.png')
  for (const invalid of ['javascript:alert(1)', '../secret', 'data:text/html,test']) assert.equal(uploadUrl(invalid), '')
  assert.equal(safeHttpUrl('javascript:alert(1)'), '')
})

test('falha HTTP rejeita a requisição em vez de simular sucesso', async t => {
  t.mock.method(globalThis, 'fetch', async () => ({ ok: false, status: 500 }))
  await assert.rejects(apiRequest('mensagens'), /HTTP 500/)
})
