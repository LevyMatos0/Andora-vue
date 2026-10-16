<template>
 <!-- Contact Section -->
    <section id="contact" class="contact section">
      <!-- Section Title -->
      <div class="container section-title" data-aos="fade-up">
        <span class="description-title">{{ $t('contact.titulo') }}</span>
        <h2>{{ $t('contact.subtitulo') }}</h2>
        <p>{{ $t('contact.descricao') }}</p>
      </div><!-- End Section Title -->

      <div class="container">
        <div class="contact-wrapper" :class="{ 'has-map': mapUrl }">
          <div class="contact-info-panel">
            <div class="contact-info-header">
              <h3>{{ $t('contact.infoTitulo') }}</h3>
            </div>

            <div class="contact-info-cards">
              <div class="info-card">
                <div class="icon-container">
                  <i class="bi bi-pin-map-fill"></i>
                </div>
                <div class="card-content">
                  <h4>{{ $t('contact.localizacao') }}</h4>
                  <p>{{ content.site?.contato?.endereco ?? $t('contact.endereco') }}</p>
                </div>
              </div>

              <div class="info-card">
                <div class="icon-container">
                  <i class="bi bi-envelope-open"></i>
                </div>
                <div class="card-content">
                  <h4>{{ $t('contact.email') }}</h4>
                  <p>{{ content.site?.contato?.email ?? $t('contact.emailEndereco') }}</p>
                </div>
              </div>

              <div class="info-card">
                <div class="icon-container">
                  <i class="bi bi-telephone-fill"></i>
                </div>
                <div class="card-content">
                  <h4>{{ $t('contact.telefone') }}</h4>
                  <p>{{ content.site?.contato?.telefone ?? $t('contact.telefoneNumero') }}</p>
                </div>
              </div>

              <div class="info-card">
                <div class="icon-container">
                  <i class="bi bi-clock-history"></i>
                </div>
                <div class="card-content">
                  <h4>{{ $t('contact.horario') }}</h4>
                  <p>{{ $t('contact.horarioDetalhes') }}</p>
                </div>
              </div>
            </div>

            <div class="social-links-panel">
              <h5>{{ $t('contact.redesSociais') }}</h5>
              <div class="social-icons">
                <!--a href="#"><i class="bi bi-facebook"></i></a-->
                <a href="https://x.com/Andora_dev"><i class="bi bi-twitter-x"></i></a>
                <a href="https://www.instagram.com/andora.desenvolvimento/"><i class="bi bi-instagram"></i></a>
                <!--a href="#"><i class="bi bi-linkedin"></i></a-->
                <!--a href="#"><i class="bi bi-youtube"></i></a-->
              </div>
            </div>
          </div>

          <div class="contact-form-panel">
            <div v-if="mapUrl" class="map-container">
              <iframe :src="mapUrl" title="Localização Andora" width="100%" height="100%" style="border:0;"  loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>

            <div class="form-container">
              <h3>{{ $t('contact.formTitulo') }}</h3>

              <form @submit.prevent="sendMessage" class="php-email-form">
                <div class="form-floating mb-3">
                  <input type="text" class="form-control" id="nameInput" v-model="form.nome" required name="name" :placeholder="$t('contact.nomePlaceholder')">
                  <label for="nameInput">{{ $t('contact.nomeLabel') }}</label>
                </div>

                <div class="form-floating mb-3">
                  <input type="email" class="form-control" id="emailInput" v-model="form.email" required name="email" :placeholder="$t('contact.emailPlaceholder')">
                  <label for="emailInput">{{ $t('contact.emailLabel') }}</label>
                </div>

                <div class="form-floating mb-3">
                  <input type="text" class="form-control" id="subjectInput" v-model="form.assunto" required name="subject" :placeholder="$t('contact.assuntoPlaceholder')">
                  <label for="subjectInput">{{ $t('contact.assuntoLabel') }}</label>
                </div>

                <div class="form-floating mb-3">
                  <textarea class="form-control" id="messageInput" v-model="form.conteudo" required name="message" rows="5" :placeholder="$t('contact.mensagemPlaceholder')" style="height: 150px" ></textarea>
                  <label for="messageInput">{{ $t('contact.mensagemLabel') }}</label>
                </div>

                <div class="my-3">
                  <div v-if="sending" class="loading" style="display: block" role="status">{{ $t('contact.carregando') }}</div>
                  <div v-if="failed" class="error-message" style="display: block" role="alert">{{ $t('contact.erroEnvio') }}</div>
                  <div v-if="sent" class="sent-message" style="display: block" role="status">{{ $t('contact.mensagemEnviada') }}</div>
                </div>

                <div class="d-grid">
                  <button type="submit" class="btn-submit" :disabled="sending">{{ $t('contact.enviarBotao') }} <i class="bi bi-send-fill ms-2"></i></button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section><!-- /Contact Section -->
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { useSiteContent } from '../../composables/useSiteContent'
import { apiRequest, safeHttpUrl } from '../../services/api'
const content = useSiteContent()
const defaultMap = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3679.3441844291274!2d-47.35159662602098!3d-22.75260477936391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c89bde5bd26a4b%3A0x73aa44217bc4cce7!2sCol%C3%A9gio%20Politec!5e0!3m2!1sen!2sbr!4v1774652777448!5m2!1sen!2sbr'
const mapUrl = computed(() => {
  const contact = content.site?.contato
  if (!contact || Object.keys(contact).length === 0) return defaultMap
  return safeHttpUrl(contact.mapa)
})
const form = reactive({ nome: '', email: '', assunto: '', conteudo: '' })
const sending = ref(false)
const sent = ref(false)
const failed = ref(false)
async function sendMessage() {
  if (sending.value) return
  sending.value = true
  sent.value = false
  failed.value = false
  try {
    await apiRequest('mensagens', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    sent.value = true
    for (const key of Object.keys(form)) form[key] = ''
  } catch {
    failed.value = true
  } finally {
    sending.value = false
  }
}
</script>
