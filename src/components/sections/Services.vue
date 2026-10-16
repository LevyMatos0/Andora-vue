<template>
    <!-- Services Section -->
    <section id="services" class="services section">

      <!-- Section Title -->
      <div class="container section-title" data-aos="fade-up">
        <span class="description-title">{{ $t('services.titulo') }}</span>
        <h2>{{ $t('services.subtitulo') }}</h2>
        <p>{{ $t('services.descricao') }}</p>
      </div><!-- End Section Title -->

      <div class="container" data-aos="fade-up" data-aos-delay="100">

        <div class="services-container">
          <div class="row g-4">
            <div v-for="service in services" :key="service.id" class="col-lg-6" data-aos="fade-up">
              <div class="service-item">
                <div class="service-icon">
                  <img v-if="service.imagem" :src="uploadUrl(service.imagem)" :alt="service.titulo">
                  <i v-else :class="service.icone || 'bi bi-code-slash'"></i>
                </div>
                <div class="service-content">
                  <h3 class="service-title">{{ service.titulo }}</h3>
                  <p class="service-text panel-text">{{ service.descricao }}</p>
                  <details v-if="service.informacoes" class="service-details">
                    <summary class="service-link">{{ $t('services.servico1Link') }}</summary>
                    <p class="panel-text">{{ service.informacoes }}</p>
                  </details>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="cta-wrapper mt-5 text-center" data-aos="fade-up" data-aos-delay="100">
          <div class="row">
            <div class="col-lg-8 offset-lg-2">
              <div class="cta-box">
                <div class="row align-items-center">
                  <div class="col-lg-4">
                    <div class="cta-image" data-aos="zoom-in" data-aos-delay="200">
                      <img src="../../assets/img/icone/ANDORA-COMPLETO.png" alt="Services" class="img-fluid rounded-circle">
                    </div>
                  </div>
                  <div class="col-lg-8">
                    <div class="cta-content text-lg-start" data-aos="fade-left" data-aos-delay="300">
                      <h3>{{ $t('services.ctaTitulo') }}</h3>
                      <p>{{ $t('services.ctaDescricao') }}</p>
                      <RouterLink :to="{ path: '/', hash: '#contact' }" class="primary-btn">{{ $t('services.ctaBotao') }}</RouterLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </section><!-- /Services Section -->
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSiteContent } from '../../composables/useSiteContent'
import { uploadUrl } from '../../services/api'
const content = useSiteContent()
const { t } = useI18n()
const services = computed(() => content.servicos === null
  ? [1, 2].map(i => ({ id: i, titulo: t(`services.servico${i}Titulo`), descricao: t(`services.servico${i}Descricao`), icone: i === 1 ? 'bi bi-code-slash' : 'bi bi-bar-chart' }))
  : content.servicos.map(item => ({ id: item.srv_codigo, titulo: item.srv_titulo, descricao: item.srv_descricao, informacoes: item.srv_informacoes, imagem: item.srv_icone })))
</script>

<style scoped>
.service-icon img { width: 48px; height: 48px; object-fit: contain; }
.panel-text { white-space: pre-line; }
.service-details summary { cursor: pointer; }
</style>
