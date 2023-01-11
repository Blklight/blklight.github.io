<template>
  <div class="">
    <section class="alter-article">
      <div class="hover-header">
        <div
          v-lazy:background-image="
            article.imageHeader ? article.imageHeader : article.cover
          "
          class="alter-article-header hover-header"
          :class="[colorFilterRandom]"
        ></div>
      </div>

      <!-- <HeaderBasicOverflow :article="article" /> -->

      <div class="alter-article-block">
        <div
          class="alter-article-container"
          :class="isDarkTheme ? 'bg-dark' : 'bg-light'"
        >
          <div class="alter-article-container-title">
            <h1 class="article-title">{{ article.title }}</h1>
            <h5 class="article-meta mb-1">
              <DateFormat :date="headerData.date" fulltime />
            </h5>
          </div>
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
              <div class="nuxt-content mb-3">
                <span class="mb-2" style="font-size: 18px; font-weight: 500"
                  >Canal:</span
                >
                <div class="d-flex flex-wrap">
                  <span class="badge bg-secondary text-dark">
                    {{ article.channel }}
                  </span>
                </div>
              </div>
              <div class="nuxt-content mb-3">
                <span class="mb-2" style="font-size: 18px; font-weight: 500"
                  >Categoria:</span
                >
                <div class="d-flex flex-wrap">
                  <span class="badge bg-secondary text-dark">
                    {{ article.category }}
                  </span>
                </div>
              </div>
              <template v-if="article.tags">
                <div class="nuxt-content">
                  <h5>Tags:</h5>
                  <div class="d-flex flex-wrap">
                    <span
                      v-for="tag in article.tags"
                      :key="tag"
                      class="badge bg-secondary text-dark"
                    >
                      {{ tag }}
                    </span>
                    <span
                      v-for="tag in article.tags"
                      :key="tag"
                      class="badge bg-secondary text-dark"
                    >
                      {{ tag }}
                    </span>
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
      </div>
    </section>
    <Author :author="authorInfo" />
  </div>
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
    colorFilterRandom() {
      const filters = [
        "black-green",
        "black-white",
        "blue-red",
        "cyberpunk-v",
        "cyberpunk-vi",
        "cyberpunk-vii",
        "pink-blue",
        "purple-red-green",
        "purple-red-orange",
        "red-sunset",
        "soft-blue-pink",
      ];
      const num = Math.floor(Math.random() * filters.length);
      const filter = `hover-filter-${filters[num]}`;
      return filter;
    },
  },
};
</script>
