<template>
  <div :class="{ 'bg-dark': isDarkMode }">
    <div class="container-fluid pt-3 mb-4">
      <div class="col-xl-10 col-12 offset-xl-1 offset-0 px-xl-0 px-1">
        <h2 class="mt-3 mb-2" :class="isDarkMode ? 'text-light' : 'text-dark'">
          <strong><em>Sobre</em></strong>
        </h2>

        <div v-for="(member, i) in members" :key="i" class="row my-4">
          <div class="col-md-4 col-12">
            <div class="view">
              <img
                v-lazy="member.cover"
                alt=""
                class="rounded shadow-image mx-auto d-block cyberpunk-header"
                style="width: 100%; height: 300px; object-fit: cover"
              />
              <div class="mask texture-mask-2"></div>
            </div>
          </div>
          <div
            class="col-md-8 col-12"
            :class="isDarkMode ? 'text-light' : 'text-dark'"
          >
            <div class="py-2">
              <h3>
                <strong>
                  <em>
                    {{ member.nickname }}
                  </em>
                </strong>
              </h3>
              <h4>
                <em> {{ member.name }}</em>
              </h4>
              <p>{{ member.description }}</p>
            </div>
          </div>
        </div>

        <template v-for="(member, i) in members">
          <div class="row my-4" :key="i">
            <div class="col-md-4 col-12">
              <img
                v-lazy="member.cover"
                alt=""
                class="card-img-fit cyberpunk-header"
                style="height: 400px !important; width: 100% !important"
              />
            </div>
            <div
              class="col-md-8 col-12"
              :class="isDarkMode ? 'text-light' : 'text-dark'"
            >
              <div class="py-3">
                <h3>
                  <strong>
                    <em>
                      {{ member.nickname }}
                    </em>
                  </strong>
                </h3>
                <h4>
                  <em> {{ member.name }}</em>
                </h4>
                <p>{{ member.description }}</p>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default {
  async asyncData({ $content, params }) {
    const members = await $content(
      "project-blklight/members",
      params.slug
    ).fetch();
    console.log(members);
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
<style lang="scss">
// .exo-font {
//   font-family: "Exo 2", "IBM Plex Sans Condensed", "Fira Code", monospace !important;
// }
</style>
