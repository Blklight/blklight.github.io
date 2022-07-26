<template>
  <LayoutContent>
    <div class="container">
      <template v-if="isDarkTheme">
        <img
          src="../../static/blklight-white.svg"
          title="Ultimate Mercer"
          width="175"
          class="mx-auto d-block pt-3 mb-3"
        />
      </template>
      <template v-else>
        <img
          src="../../static/blklight-black.svg"
          title="Ultimate Mercer"
          width="175"
          class="mx-auto d-block mt-3 mb-3"
        />
      </template>
      <h3 class="font-monospace text-center text-uppercase mb-5">
        Blklight Idea
      </h3>
    </div>
    <section class="py-4">
      <article
        class="container font-monospace"
        :class="isDarkTheme ? 'text-light' : 'text-dark'"
      >
        <!-- <div class="p-3 mb-3 background-texture">
          <h2
            :class="
              isDarkTheme ? 'cyber-underline-light' : 'cyber-underline-dark'
            "
          >
            Quando surgiu?
          </h2>
          <p>Verão de 2019, num dia em que 3 amigos foram doar sangue.</p>
        </div> -->
        <div class="p-3 mb-3 background-texture">
          <h2
            :class="
              isDarkTheme ? 'cyber-underline-light' : 'cyber-underline-dark'
            "
          >
            Objetivo
          </h2>
          <p>
            Atualmente nosso objetivo é poder desenvolver esta ideia junto do
            nosso circulo de amigos, e inicialmente através da disponibilização
            de artigos, desenvolver habilidades, trabalhar a criatividade e quem
            sabe isso não a base para um projeto maior.
          </p>
        </div>
      </article>
    </section>
  </LayoutContent>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["isDarkTheme"]),
  },
};
</script>
