<template>
  <article
    class="card border mb-4"
    :class="[
      isDarkTheme
        ? 'card-plain border-light hover-card-bordered-neon-yellow'
        : 'border-dark hover-card-bordered-uv',
    ]"
  >
    <div class="d-flex align-items-center px-3 pt-3 pb-2">
      <span
        class="badge bg-dark border border-dark ms-0 me-2"
        :class="[badgeIsTag ? 'badge-tag' : '']"
      >
        <DateFormat :date="article.createdDate" />
      </span>
      <Badge :channel="article.channel" :isTag="badgeIsTag" />
    </div>
    <div class="d-sm-flex align-items-center px-3">
      <div class="flex-shrink-0">
        <img
          v-lazy="article.cover ? article.cover : article.imageHeader"
          :alt="article.title"
          class="card-image-h card-img-border hover-filter-blue-red-golden"
          :class="isDarkTheme ? 'border-light' : 'border-dark'"
        />
      </div>
      <div class="flex-grow-1 ms-sm-3 mt-sm-0 mt-2">
        <h3 class="mb-1">
          {{ article.title }}
        </h3>

        <p
          v-if="article.description"
          class="d-xl-block d-lg-block d-sm-none mb-3"
        >
          {{ article.description }}
        </p>

        <div class="d-flex align-items-center">
          <span class="badge bg-dark text-light border border-dark">
            Por {{ article.author.name }}
          </span>

          <template v-if="category">
            <Badge
              :channel="article.channel"
              :category="article.category"
              isCategory
            />
          </template>
        </div>

        <template v-if="tags">
          <div class="d-xl-block d-lg-block d-sm-none">
            <span
              v-for="tag in article.tags"
              :key="tag"
              class="badge bg-secondary text-dark"
            >
              {{ tag }}
            </span>
          </div>
        </template>
      </div>
    </div>
    <div class="d-flex align-items-center px-3 pt-2 pb-3">
      <NuxtLink
        :to="`${article.dir}/${article.slug}`"
        class="btn btn-read-more-sm ms-auto"
        :class="isDarkTheme ? 'btn-neon-yellow' : 'btn-uv'"
      >
        Ler mais...
      </NuxtLink>
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

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&display=swap");

.card-image-h {
  width: 375px;
  height: 250px;
  object-fit: cover;
}

@media screen and (max-width: 768px) {
  .card-image-h {
    width: 200px;
    height: 150px;
    object-fit: cover;
  }
}

@media screen and (max-width: 576px) {
  .card-image-h {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
}

.card-font-test {
  font-family: "Inter", sans-serif;
}
</style>
