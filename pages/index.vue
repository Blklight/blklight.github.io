<template>
  <div class="">
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
      <CardText
        v-for="article in articles"
        :key="article.slug"
        :article="article"
        badgeIsTag
        category
      />
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  async asyncData({ $content, params }) {
    const articles = await $content('Articles', { deep: true }, params.slug)
      .only([
        'title',
        'description',
        'imageHeader',
        'cover',
        'slug',
        'dir',
        'channel',
        'category',
        'createdDate',
        'featured',
        'type',
        'author',
        'isPublished',
        'path',
        'tags',
      ])
      .sortBy('createdDate', 'desc')
      .where({
        type: 'normal',
        isPublished: true,
        channel: { $ne: 'Jobs' },
      })
      .fetch()
    // console.log(articles);
    return { articles }
  },

  computed: {
    ...mapGetters(['isDarkTheme']),
  },
}
</script>
