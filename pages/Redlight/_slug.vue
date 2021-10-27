<template>
  <LayoutContent>
    <template v-if="article.layout === 'two-column'">
      <ArticleTwoColumn :article="article" :author="author" />
    </template>
    <template v-else>
      <Article :article="article" :author="author" />
    </template>
  </LayoutContent>
</template>
<script>
import { createSEOMeta } from "~/utils/seo.js";

export default {
  async asyncData({ $content, params }) {
    const article = await $content("articles/Redlight", params.slug).fetch();
    const author = await $content("authors")
      .only(["username", "bio", "cover"])
      .where({ username: article.author.name })
      .fetch();
    return { article, author };
  },

  head() {
    const url = this.article.slug;
    const image = this.article.cover
      ? this.article.cover
      : this.article.imageHeader;
    const { title, description, channel } = this.article;
    return {
      title: `${title} - ${channel} - Blklight`,
      meta: createSEOMeta({ title, description, image, url }),
    };
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
