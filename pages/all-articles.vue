<template>
  <div :class="{ 'bg-dark': isDarkMode }">
    <div class="container-fluid pt-3 mb-4">
      <div class="col-xl-10 col-12 offset-xl-1 offset-0 px-xl-0 px-1">
        <h2 class="mt-3 mb-2" :class="isDarkMode ? 'text-light' : 'text-dark'">
          <strong><em>Todos artigos</em></strong>
        </h2>
        <div class="row">
          <div
            v-for="(article, i) in articles"
            :key="i"
            class="col-lg-4 col-md-6 col-12"
          >
            <Cards :article="article" :isFeatured="true" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import Cards from "~/components/Cards";

export default {
  components: { Cards },
  async asyncData({ $content, params }) {
    const articles = await $content({ deep: true }, params.slug)
      .only([
        "title",
        "abstract",
        "imageHeader",
        "cover",
        "slug",
        "dir",
        "channel",
        "createdDate",
        "featured",
        "type",
        "author",
      ])
      .sortBy("createdDate", "desc")
      .where({ type: "normal" })
      .fetch();

    return {
      articles,
    };
  },

  data() {
    return {
      query: "",
      results: [],
    };
  },

  computed: {
    ...mapGetters(["isDarkMode"]),
  },

  watch: {
    async query(query) {
      if (!query) {
        this.results = [];
        return;
      }

      this.results = await this.$content({ deep: true })
        .only([
          "title",
          "img",
          "imgAlt",
          "channel",
          "slug",
          "isFeatured",
          "createdAt",
        ])
        .sortBy("createdAt", "desc")
        .search(query)
        .fetch();
    },
  },

  methods: {
    formatDate(date) {
      const time = new Date(date);
      const formattedDate = format(new Date(time), "dd MMM yyyy", {
        locale: ptBR,
      });

      return formattedDate;
    },
    imageSrc(article) {
      const image = article.imgAlt ? article.imgAlt : article.img;

      return image;
    },
  },
};
</script>
<style lang="scss">
// .exo-font {
//   font-family: "Exo 2", "IBM Plex Sans Condensed", "Fira Code", monospace !important;
// }
</style>
