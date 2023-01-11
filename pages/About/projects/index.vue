<template>
  <section class="container">
    <h1>Projetos Blklight</h1>
    <div class="grid-cards">
      <div class="grid-cards-content">
        <CardBase
          v-for="article in articles"
          :key="article.slug"
          :article="article"
        />
      </div>

      <!-- <div class="card card-plain flex-1 mx-3">
        <img
          src="https://i.imgur.com/Jm2T2pP.jpg"
          class="ultra-radius shadow-image rounded-3"
          style="max-width: 100%; height: 350px; object-fit: cover"
        />
        <div class="card-body">
          <h4 class="card-title">Arts & Design</h4>
          <p class="mb-3" style="font-size: 18px; font-family: 'Barlow'">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente
            accusamus maxime, porro, nam eum quibusdam velit placeat.
          </p>
          <button
            class="btn btn-read-more-sm"
            :class="isDarkTheme ? 'btn-neon-yellow' : 'btn-uv'"
          >
            Ler mais...
          </button>
        </div>
      </div>
      <div class="card card-plain flex-1 mx-3">
        <img
          src="https://i.imgur.com/Jm2T2pP.jpg"
          class="ultra-radius shadow-image rounded-3"
          style="max-width: 100%; height: 350px; object-fit: cover"
        />
        <div class="card-body">
          <h4 class="card-title">Arts & Design</h4>
          <p class="mb-3" style="font-size: 18px; font-family: 'Barlow'">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente
            accusamus maxime, porro, nam eum quibusdam velit placeat.
          </p>
          <button
            class="btn btn-read-more-sm"
            :class="isDarkTheme ? 'btn-neon-yellow' : 'btn-uv'"
          >
            Ler mais...
          </button>
        </div>
      </div>
      <div class="card card-plain flex-1 mx-3">
        <img
          src="https://i.imgur.com/Jm2T2pP.jpg"
          class="ultra-radius shadow-image rounded-3"
          style="max-width: 100%; height: 350px; object-fit: cover"
        />
        <div class="card-body">
          <h4 class="card-title">Arts & Design</h4>
          <p class="mb-3" style="font-size: 18px; font-family: 'Barlow'">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente
            accusamus maxime, porro, nam eum quibusdam velit placeat.
          </p>
          <button
            class="btn btn-read-more-sm"
            :class="isDarkTheme ? 'btn-neon-yellow' : 'btn-uv'"
          >
            Ler mais...
          </button>
        </div>
      </div> -->
    </div>
    <pre>
      {{ articles }}
    </pre>
  </section>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  async asyncData({ $content, params }) {
    const articles = await $content(
      "about/projects",
      { deep: true },
      params.slug
    )
      .only([
        "title",
        "description",
        "imageHeader",
        "cover",
        "slug",
        "dir",
        "channel",
        "category",
        "createdDate",
        "featured",
        "type",
        "author",
        "isPublished",
        "path",
        "tags",
        "cardComponent",
      ])
      .sortBy("createdDate", "desc")
      .where({
        isPublished: true,
        channel: { $ne: "Jobs" },
      })
      .fetch();
    // console.log(articles);
    return { articles };
  },
  computed: {
    ...mapGetters(["isDarkTheme"]),
  },
};
</script>
<style lang="scss" scoped>
.grid-cards {
  max-width: 100vw;
  margin: 0 auto;
  /* padding: 0 20px; */
  &-content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    grid-auto-columns: auto auto;
    column-gap: 24px;
    align-items: flex-start;
  }
}
</style>
