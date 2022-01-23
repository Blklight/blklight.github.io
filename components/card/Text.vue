<template>
  <article
    class="card card-plain card-flat py-4 border-bottom border-secondary"
  >
    <div class="card-body">
      <p class="mb-3 fw-normal">
        <DateFormat :date="article.createdDate" full />
      </p>
      <h2 class="font-monospace mb-3">
        <span
          class="py-2"
          :class="isDarkTheme ? 'text-dark bg-light' : 'text-light bg-dark'"
        >
          <span class="marker-line">{{ article.title }}</span>
        </span>
      </h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla eos et
        explicabo cupiditate suscipit iusto, error repellendus culpa doloremque
        sit quidem, perspiciatis qui soluta. Blanditiis aspernatur veritatis
        ipsa officia alias.
      </p>
      <nuxt-link
        v-if="article.isPublished"
        :to="article.path"
        :class="!isDarkTheme ? 'text-dark' : 'text-light'"
      >
        Ler mais...
      </nuxt-link>
      <p v-else>
        <u>
          <font-awesome-icon :icon="['fas', 'pen']" />
          <em> Em atualização...</em>
        </u>
      </p>
    </div>
  </article>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    article: {
      type: Object,
      default: null,
    },
  },

  computed: {
    ...mapGetters(['isDarkTheme']),
  },
}
</script>
<style lang="scss" scoped></style>
