<template>
  <div :class="{ 'bg-dark': isDarkMode }">
    <div class="container-fluid pt-3 mb-4">
      <div class="col-xl-10 col-12 offset-xl-1 offset-0 px-xl-0 px-1">
        <Logo />
        <h1
          class="py-5 text-center"
          :class="isDarkMode ? 'text-light' : 'text-dark'"
        >
          <strong><em>Em atualização!!</em></strong>
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import Logo from "~/components/Logo";

export default {
  components: { Logo },
  async asyncData({ $content, params }) {
    const members = await $content("project-blklight/members", params.slug)
      .sortBy("name", "asc")
      .fetch();
    return {
      members,
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
<style lang="scss" scoped>
.seize-font {
  p {
    font-size: 20px;
  }

  @media screen and (max-width: 768px) {
    p {
      font-size: 17px;
    }
  }
}
</style>
