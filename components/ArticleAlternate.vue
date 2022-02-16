<template>
  <section class="alter-article mb-5">
    <HeaderBasicOverflow :article="article" />

    <div class="alter-article-block">
      <div class="alter-article-content">
        <div class="alter-article-content-text">
          <nuxt-content
            :document="article"
            :class="[
              article.type === 'stories' ? 'mono-font' : '',
              isDarkTheme ? 'dark-theme' : '',
            ]"
          />
        </div>
        <div class="alter-article-content-info">
          <template v-if="article.tags">
            <div class="nuxt-content">
              <h5>Tags:</h5>
              <div class="d-flex">
                <span
                  v-for="tag in article.tags"
                  :key="tag"
                  class="badge bg-secondary text-dark"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  props: {
    article: {
      type: Object,
      default: null,
    },

    author: {
      type: Object,
      default: null,
    },
  },

  computed: {
    ...mapGetters(["isDarkTheme"]),
    headerData() {
      return {
        title: this.article.title,
        date: this.article.createdDate,
        abstract: this.article.abstract,
        category: this.article.category,
        channel: this.article.channel,
        // tags: this.article.attributes.tags,
        cover: this.article.cover,
        imageHeader: this.article.imageHeader,
        headerLayout: this.article.headerLayout,
      };
    },
    authorInfo() {
      return {
        username: this.author[0].username,
        bio: this.author[0].bio,
        quote: this.article.author.quote,
        cover: this.author[0].cover,
      };
    },
  },
};
</script>
