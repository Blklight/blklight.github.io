<template>
  <div>
    <section class="two-column-article mb-5">
      <ArticleTCHeader :article="headerData" />

      <article class="content-article">
        <template v-if="article.type === 'stories'">
          <div
            class="nuxt-content"
            :class="[
              article.type === 'stories' ? 'mono-font' : '',
              !isDarkTheme ? 'light-theme' : '',
            ]"
          >
            <p class="mb-2">{{ article.abstract }}</p>
            <hr
              v-if="article.toc.length < 2"
              :class="isDarkTheme ? 'bg-light' : 'bg-dark'"
            />
          </div>
        </template>
        <template v-if="article.type === 'stories' && article.toc.length >= 2">
          <div
            class="nuxt-content"
            :class="[
              article.type === 'stories' ? 'mono-font' : '',
              !isDarkTheme ? 'light-theme' : '',
            ]"
          >
            <nav
              class="border py-3 px-md-4 px-3 my-4 rounded"
              :class="isDarkTheme ? 'border-light' : 'border-dark'"
            >
              <h4 class="mb-1">
                <strong><em>Índice</em></strong>
              </h4>
              <hr class="mt-2" :class="isDarkTheme ? 'bg-light' : 'bg-dark'" />

              <ul>
                <li v-for="link of article.toc" :key="link.id" class="mb-2">
                  <NuxtLink :to="`#${link.id}`">
                    {{ link.text }}
                  </NuxtLink>
                </li>
              </ul>
            </nav>
          </div>
        </template>
        <nuxt-content
          :document="article"
          :class="[
            article.type === 'stories' ? 'mono-font' : '',
            !isDarkTheme ? 'light-theme' : '',
          ]"
        />
      </article>
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
  },
};
</script>
