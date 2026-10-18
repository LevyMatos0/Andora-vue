import test from 'node:test'
import assert from 'node:assert/strict'
import i18n from '../src/i18n.ts'

test('contato sem cadastro no banco renderiza o e-mail de fallback nos dois idiomas', () => {
  const previous = i18n.global.locale.value
  try {
    for (const locale of ['pt', 'en']) {
      i18n.global.locale.value = locale
      assert.equal(i18n.global.t('contact.emailEndereco'), 'contato.andoradev@gmail.com')
      assert.ok(i18n.global.t('contact.formTitulo'))
    }
  } finally { i18n.global.locale.value = previous }
})
