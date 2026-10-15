<template>
  <div class="container section-title" data-aos="fade-up">
    <h2>{{ $t('faq.titulo') }}</h2>
  </div>
  <section id="faq" class="faq section">
    <div class="container" data-aos="fade-up" data-aos-delay="100">
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div class="faq-wrapper">
            <div v-for="(faq, i) in faqs" :key="faq.id" class="faq-item" :class="{ 'faq-active': aberto === i }">
              <div class="faq-header" role="button" tabindex="0" :aria-expanded="aberto === i" @click="alternar(i)" @keydown.enter="alternar(i)" @keydown.space.prevent="alternar(i)">
                <div class="faq-icon"><i class="bi bi-question-circle"></i></div>
                <h4>{{ faq.pergunta }}</h4>
                <div class="faq-toggle"><i class="bi bi-plus"></i><i class="bi bi-dash"></i></div>
              </div>
              <div class="faq-content">
                <div class="content-inner"><p class="panel-text">{{ faq.resposta }}</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSiteContent } from '../../composables/useSiteContent'
const content = useSiteContent()
const { t } = useI18n()
const faqs = computed(() => content.faqs ?? [1, 2, 3, 4, 5].map(i => ({ id: i, pergunta: t(`faq.pergunta${i}`), resposta: t(`faq.resposta${i}`) })))
const aberto = ref(0)
function alternar(i) { aberto.value = aberto.value === i ? null : i }
</script>

<style scoped>
.panel-text { white-space: pre-line; }
</style>
