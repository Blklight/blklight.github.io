<template>
  <div class="py-4">
    <section class="container-xxl">
      <h2
        class="mb-4"
        :class="
          isDarkTheme
            ? 'text-light cyber-underline-light'
            : 'text-dark cyber-underline-dark'
        "
      >
        Últimos artigos
      </h2>
      <template v-for="article in articles">
        <CardText
          v-if="article.cardComponent === 'CardText'"
          :key="article.slug"
          :article="article"
          badgeIsTag
          category
        />
        <CardHorizontal
          v-else-if="article.cardComponent === 'CardHorizontal'"
          :key="article.slug"
          :article="article"
          badgeIsTag
          category
        />
        <CardCode
          v-else-if="article.cardComponent === 'CardCode'"
          :key="article.slug"
          :article="article"
          badgeIsTag
          category
        />
      </template>
    </section>
  </div>
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
