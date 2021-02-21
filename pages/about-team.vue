<template>
  <div :class="{ 'bg-dark': isDarkMode }">
    <div class="container-fluid pt-3 mb-4">
      <div class="col-xl-10 col-12 offset-xl-1 offset-0 px-xl-0 px-1">
        <Logo />

        <h2 class="mt-3 mb-2" :class="isDarkMode ? 'text-light' : 'text-dark'">
          <strong><em>Time / Membros do projeto</em></strong>
        </h2>

        <div v-for="(member, i) in members" :key="i" class="row my-4">
          <div class="col-lg-4 col-12">
            <img
              v-lazy="member.cover"
              alt=""
              class="member-avatar rounded-circle shadow mx-auto d-block cyberpunk-header"
            />
          </div>
          <div
            class="col-lg-8 col-12"
            :class="isDarkMode ? 'text-light' : 'text-dark'"
          >
            <div class="py-3 px-3 seize-font text-lg-left text-center">
              <h2>
                <strong>
                  <em>
                    {{ member.nickname }}
                  </em>
                </strong>
              </h2>
              <h3>
                <em> {{ member.name }}</em>
              </h3>
              <template v-for="(role, i) in member.role">
                <span
                  :key="i"
                  class="badge badge-tag ml-0 mr-1 mb-3"
                  :class="isDarkMode ? 'badge-neon-yellow' : 'badge-uv'"
                >
                  {{ role }}
                </span>
              </template>

              <p>{{ member.description }}</p>
            </div>
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
