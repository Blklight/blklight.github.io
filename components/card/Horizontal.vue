<template>
  <article
    class="card card-raised mb-4"
    :class="[isDarkTheme ? 'card-plain hover-card-yellow' : 'hover-card-uv']"
  >
    <div class="d-flex align-items-center px-3 py-3">
      <span
        class="badge badge-tag bg-transparent border ms-0 me-2"
        :class="isDarkTheme ? ' border-neon-yellow' : ' border-uv text-dark'"
      >
        <DateFormat :date="article.createdDate" />
      </span>
      <ChannelBadge :channel="article.channel" is-tag />
    </div>
    <div class="d-sm-flex align-items-center px-3">
      <div class="flex-shrink-0">
        <img
          v-lazy="article.cover ? article.cover : article.imageHeader"
          :alt="article.title"
          class="card-image-h card-img-border hover-filter-cyberpunk-v"
          :class="isDarkTheme ? 'border-light' : 'border-dark'"
        />
      </div>
      <div class="flex-grow-1 ms-sm-3">
        <h5 class="font-monospace my-2">
          <em>
            {{ article.title }}
          </em>
        </h5>

        <p class="d-xl-block d-lg-block d-sm-none">
          <template v-if="article.abstract">
            {{ article.abstract }}
          </template>
          <template v-else>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde
            aliquam ut fuga non delectus fugiat, aperiam nulla autem officia,
            hic pariatur temporibus voluptatem saepe magni, beatae laboriosam et
            maxime repellendus.
          </template>
        </p>

        <p class="font-monospace">Por {{ article.author.name }}</p>
      </div>
    </div>
    <div class="d-flex align-items-center px-3 py-3">
      <NuxtLink
        :to="{
          name: `${slugName(article.dir)}-slug`,
          params: { slug: `${article.slug}` },
        }"
        class="btn btn-raised btn-read-more-sm ms-auto"
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
.card-image-h {
  width: 350px;
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
</style>
