<template>
  <LayoutContent>
    <template v-if="article.layout === 'two-column'">
      <ArticleTwoColumn :article="article" :author="author" />
    </template>
    <template v-else>
      <Article :article="article" :author="author" />
    </template>
    <!-- <PrevNextArticles :prev="prev" :next="next" /> -->
  </LayoutContent>
</template>
<script>
// import global from "@/utils/global";
import getSiteMeta from "@/utils/getSiteMeta";

export default {
  async asyncData({ $content, params }) {
    const article = await $content(
      "Articles/DevCorporation",
      params.slug
    ).fetch();

    const author = await $content("authors")
      .only(["username", "bio", "cover"])
      .where({ username: article.author.name })
      .fetch();
    const [prev, next] = await $content("Articles/DevCorporation")
      .only([
        "title",
        "slug",
        "cover",
        "imageHeader",
        "createdDate",
        "channel",
        "dir",
      ])
      .sortBy("createdDate", "desc")
      .where({ isPublished: true })
      .surround(params.slug)
      .fetch();

    return { article, author, prev, next };
  },

  head() {
    return {
      title: this.article.title,
      meta: [
        ...this.meta,
        {
          property: "article:published_time",
          content: this.article.createdDate,
        },
        { name: "twitter:label1", content: "By" },
        { name: "twitter:data1", content: this.article.channel || "" },
      ],
      link: [
        {
          hid: "canonical",
          rel: "canonical",
          href: `${this.$config.baseUrl}/${this.$route.params.slug}`,
        },
      ],
    };
  },

  computed: {
    meta() {
      const metaData = {
        type: "article",
        title: this.article.title,
        description: this.article.abstract,
        url: `${this.$config.baseUrl}/${this.$route.params.slug}`,
        mainImage: this.article.image,
      };
      return getSiteMeta(metaData);
    },
  },
};
</script>

<style lang="scss">
.header-post {
  width: 100%;
  height: 600px;
  object-fit: cover;
  margin: 0 0 1rem 0;
  // border-radius: 0.5rem;
}
</style>
