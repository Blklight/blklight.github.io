<template>
  <div
    class="card card-flat card-background border view-anchor mb-4"
    :class="[
      isDarkTheme
        ? 'hover-card-bordered-neon-yellow border-light'
        : 'hover-card-bordered-uv border-dark',
    ]"
  >
    <img
      :src="article.cover ? article.cover : article.imageHeader"
      class="card-background-image hover-filter-blue-red-golden grad-filter"
      style="height: 350px"
      alt="teste"
    />
    <div class="mask texture-mask-4"></div>
    <div class="card-img-overlay h-100 d-flex flex-column justify-content-end">
      <div class="d-flex align-items-center mb-2">
        <span class="badge bg-dark badge-tag border border-dark ms-0 me-1">
          <DateFormat :date="article.createdDate" />
        </span>
        <Badge :channel="article.channel" :isTag="badgeIsTag" />
      </div>

      <h3 class="card-title">
        <span class="bg-dark text-light py-1">
          <span class="marker-line"> {{ article.title }} </span>
        </span>
      </h3>
      <div class="d-flex align-items-center">
        <span class="badge bg-dark text-light border border-dark"
          >Por {{ article.author.name }}
        </span>

        <template v-if="category">
          <Badge
            :channel="article.channel"
            :category="article.category"
            isCategory
          />
        </template>
      </div>

      <div class="d-flex justify-content-between mt-auto">
        <nuxt-link
          :to="`${article.dir}/${article.slug}`"
          class="btn btn-uv btn-read-more-sm ms-auto"
        >
          Ler mais...
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: {
    article: {
      type: Object,
      default: null,
    },

    badgeIsTag: {
      type: Boolean,
      default: false,
    },

    category: {
      type: Boolean,
      default: false,
    },

    tags: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    ...mapGetters(["isDarkTheme"]),
  },

  methods: {
    slugName(data) {
      const link = data.replace("articles/", "").replace("/", "");
      return link;
    },
  },
};
</script>
