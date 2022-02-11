<template>
  <article
    class="card card-flat card-plain py-3 border-bottom border-secondary mb-4"
    :class="isDarkTheme ? 'hover-card-secondary' : 'hover-card-dark'"
  >
    <div class="card-body">
      <p class="mb-2 fw-normal">
        <DateFormat :date="article.createdDate" full />
      </p>
      <h4 class="card-font-test mb-3">
        <span
          class="py-1"
          :class="isDarkTheme ? 'text-dark bg-light' : 'text-light bg-dark'"
        >
          <span class="marker-line">{{ article.title }}</span>
        </span>
      </h4>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla eos et
        explicabo cupiditate suscipit iusto, error repellendus culpa doloremque
        sit quidem, perspiciatis qui soluta. Blanditiis aspernatur veritatis
        ipsa officia alias.
      </p>
      <div class="d-flex justify-content-end">
        <nuxt-link
          v-if="article.isPublished"
          :to="article.path"
          class="mx-2"
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
    </div>
  </article>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  props: {
    article: {
      type: Object,
      default: null,
    },
  },

  computed: {
    ...mapGetters(["isDarkTheme"]),
  },
};
</script>
<style lang="scss" scoped></style>
