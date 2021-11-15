<template>
  <LayoutContent>
    <main class="d-flex flex-column justify-content-center py-2">
      <template v-if="isDarkTheme">
        <img
          src="../static/blklight-white.svg"
          title="Blklight"
          width="125"
          class="mx-auto my-2 d-block"
        />
      </template>
      <template v-else>
        <img
          src="../static/blklight-black.svg"
          title="Blklight"
          width="125"
          class="mx-auto my-2 d-block"
        />
      </template>
      <h1 class="font-monospace text-center text-uppercase">Blklight</h1>
    </main>
    <section class="container-lg">
      <h2
        class="mb-4"
        :class="
          isDarkTheme
            ? 'text-light cyber-underline-light'
            : 'text-dark cyber-underline-dark'
        "
      >
        <em>Últimas artigos</em>
      </h2>
      <CardHorizontal
        v-for="article in articles"
        :key="article.slug"
        :article="article"
        badgeIsTag
        category
      />
    </section>
  </LayoutContent>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  async asyncData({ $content, params }) {
    const articles = await $content("Articles", { deep: true }, params.slug)
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
      ])
      .sortBy("createdDate", "desc")
      .where({
        type: "normal",
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
