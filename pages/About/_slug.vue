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
export default {
  async asyncData({ $content, params }) {
    const article = await $content("", params.slug).fetch();

    const author = await $content("authors")
      .only(["username", "bio", "cover"])
      .where({ username: article.author.name })
      .fetch();
    const [prev, next] = await $content("articles/DevCorporation")
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

    console.log(article);
    return { article, author, prev, next };
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
