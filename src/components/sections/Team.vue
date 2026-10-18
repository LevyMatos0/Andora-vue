<template>
  <section id="team" class="team section">
    <div class="container section-title" data-aos="fade-up">
      <span class="description-title">{{ $t('team.titulo') }}</span>
      <h2>{{ $t('team.subtitulo') }}</h2>
      <p>{{ $t('team.descricao') }}</p>
    </div>
    <div class="container" data-aos="fade-up" data-aos-delay="100">
      <div class="row g-4">
        <div v-for="member in members" :key="member.id" class="col-lg-4 col-md-6" data-aos="fade-up">
          <div class="team-member">
            <div class="member-image">
              <img v-if="member.imagem" :src="member.imagem" class="img-fluid" :alt="member.nome" loading="lazy">
              <div v-if="member.linkedin || member.github || member.instagram" class="social-overlay">
                <div class="social-icons">
                  <a v-if="member.linkedin" :href="member.linkedin" :aria-label="`LinkedIn: ${member.nome}`"><i class="bi bi-linkedin"></i></a>
                  <a v-if="member.github" :href="member.github" :aria-label="`GitHub: ${member.nome}`"><i class="bi bi-github"></i></a>
                  <a v-if="member.instagram" :href="member.instagram" :aria-label="`Instagram: ${member.nome}`"><i class="bi bi-instagram"></i></a>
                </div>
              </div>
            </div>
            <div class="member-info">
              <h4>{{ member.nome }}</h4>
              <span>{{ member.cargo }}</span>
              <p class="panel-text">{{ member.texto }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSiteContent } from '../../composables/useSiteContent'
import { safeHttpUrl, uploadUrl } from '../../services/api'
import clara from '../../assets/img/person/clara.jpeg'
import levy from '../../assets/img/person/levy.png'
import eduarda from '../../assets/img/person/doarda.jpeg'
const content = useSiteContent()
const { t } = useI18n()
const defaults = [
  { nome: 'Clara Dearo Gonzalez', imagem: clara, linkedin: 'https://www.linkedin.com/in/clara-dearo-gonzalez-87bab334a/', instagram: 'https://www.instagram.com/claradg__/' },
  { nome: 'Levy Santos Matos', imagem: levy, linkedin: 'https://www.linkedin.com/in/levy-matos/', instagram: 'https://www.instagram.com/levy._matos/' },
  { nome: 'Maria Eduarda Pires Zerbeto', imagem: eduarda, linkedin: 'https://www.linkedin.com/in/maria-eduarda-pires-zerbeto-5081b1352', instagram: 'https://www.instagram.com/mariaeduarda_zerbeto/' },
]
const members = computed(() => content.equipe === null
  ? defaults.map((member, i) => ({ ...member, id: i, cargo: t(`team.cargo${i + 1}`), texto: t(`team.bio${i + 1}`) }))
  : content.equipe.map(item => ({ id: item.tms_codigo, nome: item.tms_nome, cargo: item.tms_cargo, texto: item.tms_apresentacao, imagem: uploadUrl(item.tms_imagem), linkedin: safeHttpUrl(item.tms_linkedin), github: safeHttpUrl(item.tms_github) })))
</script>

<style scoped>
.panel-text { white-space: pre-line; }
</style>
