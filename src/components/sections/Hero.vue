<template>
<section id="hero" class="hero section">
      <div class="hero-background">
        <div class="hero-overlay"></div>
      </div>

      <div class="container" data-aos="fade-up" data-aos-delay="100">
        <div class="row justify-content-center text-center">
          <div class="col-lg-10">
            <div class="hero-content" data-aos="fade-up" data-aos-delay="200">
              <h1>{{ content.site?.hero?.titulo ?? $t('hero.titulo') }}</h1>
              <p class="panel-text">{{ content.site?.hero?.descricao ?? $t('hero.descricao') }}</p>

              <div class="hero-btns" data-aos="fade-up" data-aos-delay="300">
                <RouterLink :to="{ path: '/', hash: '#about' }" class="btn btn-primary">{{ $t('hero.saibaMais') }}</RouterLink>
              </div>
            </div>
          </div>
        </div>

        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="hero-image-container" data-aos="zoom-in" data-aos-delay="400">
              <div class="hero-image">
                <img :src="uploadUrl(content.site?.hero?.imagem) || defaultImage" :alt="content.site?.hero?.titulo ?? 'Andora'" class="img-fluid">
                <div class="image-decoration"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

</template>

<script setup>
import { useSiteContent } from '../../composables/useSiteContent'
import { uploadUrl } from '../../services/api'
import defaultImage from '../../assets/img/icone/ANDORA-COMPLETO.png'
const content = useSiteContent()
</script>

<style scoped>
.panel-text { white-space: pre-line; }
</style>
