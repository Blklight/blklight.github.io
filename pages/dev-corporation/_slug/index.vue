<template>
  <div :class="{ 'bg-dark': isDarkMode }">
    <div v-if="this.article.headerLayout === 'arts'">
      <div class="container-fluid py-4">
        <div class="row">
          <div class="col-xl-5 col-lg-5 col-12">
            <div class="sticky-top">
              <div class="card card-plain card-body mx-3">
                <img
                  v-lazy="imageSrc"
                  class="rounded mx-auto mb-4 d-block"
                  alt="article.title"
                  style="
                    width: 350px;
                    height: 350px;

                    object-fit: cover;
                  "
                />
                <div class="text-center">
                  <h1 class="blog-title">
                    <span
                      class="marker marker-title"
                      :class="isDarkMode ? 'marker-light' : 'marker-dark'"
                    >
                      <em>
                        {{ article.title }}
                      </em>
                    </span>
                  </h1>
                  <h5 class="blog-meta">
                    <span
                      class="marker"
                      :class="isDarkMode ? 'marker-light' : 'marker-dark'"
                    >
                      {{ dateFormat }}
                    </span>
                  </h5>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-6 col-lg-7 col-12">
            <div class="page px-2">
              <div class="post monospace" :class="{ 'dark-post': isDarkMode }">
                <nuxt-content :document="article" />
              </div>
            </div>
          </div>
        </div>
        <div class="container">
          <a :href="article.imageHeader" target="_blank">
            <img
              v-lazy="article.imageHeader"
              class="img-fluid mx-auto my-4 d-block"
              alt="article.title"
            />
          </a>
        </div>
      </div>
    </div>
    <div v-else>
      <HeaderLayout :article="headerInfo" />
      <div class="container-fluid px-md-0 py-4">
        <div
          class="col-xl-6 offset-xl-3 col-lg-8 offset-lg-2 p-lg-0 col-md-10 offset-md-1 p-md-0 col-12"
        >
          <div class="page">
            <div class="post monospace" :class="{ 'dark-post': isDarkMode }">
              <nuxt-content :document="article" />

              <!-- <pre>{{ article }}</pre> -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <Author :author="authorInfo" />
  </div>
</template>
<script>
import HeaderLayout from "@/components/HeaderLayout";
import Author from "@/components/Author";

import { mapGetters } from "vuex";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default {
  components: { HeaderLayout, Author },

  async asyncData({ $content, params }) {
    const article = await $content(
      "dev-corporation",
      { deep: true },
      params.slug
    ).fetch();
    // console.log(name, params.slug);
    return { article };
  },

  data() {
    return {};
  },

  computed: {
    ...mapGetters(["isDarkMode"]),

    headerInfo(article) {
      return {
        title: this.article.title,
        date: this.article.createdAt,
        abstract: this.article.abstract,
        category: this.article.category,
        channel: this.article.channel,
        // tags: this.article.attributes.tags,
        cover: this.article.cover,
        imageHeader: this.article.imageHeader,
        headerLayout: this.article.headerLayout,
      };
    },

    authorInfo(article) {
      return {
        name: this.article.author.name,
        bio: this.article.author.bio,
        avatar: this.article.author.avatar,
      };
    },
    imageSrc() {
      const image = this.article.cover
        ? this.article.cover
        : this.article.imageHeader;

      return image;
    },

    dateFormat() {
      const formattedDate = format(
        new Date(this.article.createdAt),
        "dd 'de' MMMM 'de' yyyy",
        {
          locale: ptBR,
        }
      );

      return formattedDate;
    },
  },
};
</script>
