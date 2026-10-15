<template>
 <!-- About Section -->
    <section id="about" class="about section">

      <!-- Section Title -->
      <div class="container section-title" data-aos="fade-up">
        <span class="description-title">{{ $t('about.titulo') }}</span>
        <h2>{{ $t('about.subtitulo') }}</h2>
        <p>{{ $t('about.descricao') }}</p>
      </div><!-- End Section Title -->

      <div class="container" data-aos="fade-up" data-aos-delay="100">

        <div class="row gx-0 gx-lg-5 gy-5 align-items-center">
          <div class="col-lg-6" data-aos="zoom-out" data-aos-delay="200">
            <div class="image-wrapper">
              <div class="image-box">
                <img :src="uploadUrl(content.site?.sobre?.imagem) || defaultImage" class="img-fluid" :alt="content.site?.sobre?.titulo ?? $t('about.titulo')" loading="lazy">
              </div>
            </div>
          </div>

          <div class="col-lg-6" data-aos="fade-left" data-aos-delay="200">
            <div class="content">
              <div class="section-header">
                <h2>{{ content.site?.sobre?.titulo ?? $t('about.headline') }}</h2>
              </div>

              <p v-if="content.site?.sobre?.texto" class="highlight-text panel-text">{{ content.site.sobre.texto }}</p>

              <div v-if="!content.site?.sobre?.texto" class="features-list">
                <div class="feature-item" data-aos="zoom-in" data-aos-delay="300">
                  <div class="icon-box">
                    <i class="bi bi-check2-circle"></i>
                  </div>
                  <div class="text">
                    <h4>{{ $t('about.feature1Titulo') }}</h4>
                    <p>{{ $t('about.feature1Descricao') }}</p>
                  </div>
                </div>

                <div class="feature-item" data-aos="zoom-in" data-aos-delay="400">
                  <div class="icon-box">
                    <i class="bi bi-lightbulb"></i>
                  </div>
                  <div class="text">
                    <h4>{{ $t('about.feature2Titulo') }}</h4>
                    <p>{{ $t('about.feature2Descricao') }}</p>
                  </div>
                </div>

                <div class="feature-item" data-aos="zoom-in" data-aos-delay="500">
                  <div class="icon-box">
                    <i class="bi bi-graph-up-arrow"></i>
                  </div>
                  <div class="text">
                    <h4>{{ $t('about.feature3Titulo') }}</h4>
                    <p>{{ $t('about.feature3Descricao') }}</p>
                  </div>
                </div>
              </div>

              <div class="cta-buttons">
                <a href="#" class="btn-learn-more">{{ $t('about.saibaMais') }}</a>
                <a href="#" class="btn-get-started">{{ $t('about.contato') }}</a>
              </div>
            </div>
          </div>
        </div>

      </div>

    </section><!-- /About Section -->
</template>

<script setup>
import { useSiteContent } from '../../composables/useSiteContent'
import { uploadUrl } from '../../services/api'
import defaultImage from '../../assets/img/icone/Voando em direção à (2).png'
const content = useSiteContent()
</script>

<style scoped>
.panel-text { white-space: pre-line; }
</style>
