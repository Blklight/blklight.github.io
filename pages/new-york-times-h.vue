<template>
  <section class="container-fluid">
    <div class="col-xl-10 col-12 offset-xl-1 offset-0 px-lg-0 px-3">
      <h1 class="mt-3" :class="isDarkMode ? 'text-light' : 'text-dark'">
        <strong
          ><em>New York Times - Top Stories / Horizontal Cards</em></strong
        >
      </h1>
      <hr class="mt-1 mb-4" :class="isDarkMode ? 'bg-light' : 'bg-dark'" />
      <template v-for="(article, i) in articles">
        <div
          :key="i"
          class="card mb-4"
          :class="
            isDarkMode
              ? 'card-plain hover-card-yellow'
              : 'hover-card-uv card-raised'
          "
        >
          <div class="row">
            <div class="col-md-5 col-12">
              <div class="view">
                <img
                  v-lazy="article.multimedia[0]['url']"
                  class="card-img-fit cyberpunk-effect"
                  style="height: 350px !important; width: 100% !important"
                  :title="article.multimedia[0].copyright"
                />
                <div class="mask texture-mask-2"></div>
              </div>
            </div>
            <div class="col-md-7 col-12">
              <div
                class="px-md-4 px-3 py-3"
                :class="isDarkMode ? 'text-light' : ''"
              >
                <span
                  class="badge badge-tag"
                  :class="isDarkMode ? 'badge-neon-yellow' : 'badge-uv'"
                >
                  {{ formatDate(article.updated_date) }}
                </span>
                <span
                  class="badge badge-uv badge-tag mb-2"
                  style="text-transform: capitalize"
                  :class="isDarkMode ? 'badge-neon-yellow' : 'badge-uv'"
                >
                  {{ article.section }}
                </span>
                <span
                  v-if="article.subsection"
                  class="badge badge-uv badge-tag mb-2"
                  style="text-transform: capitalize"
                  :class="isDarkMode ? 'badge-neon-yellow' : 'badge-uv'"
                >
                  {{ article.subsection }}
                </span>
                <h3 class="exo-font mt-1 mb-2" style="font-style: italic">
                  <span class="">
                    <strong>
                      {{ article.title }}
                    </strong>
                  </span>
                </h3>
                <h5 class="card-text mb-2">
                  <em>{{ article.byline }}</em>
                </h5>

                <p class="mb-3">
                  {{ article.abstract }}
                </p>

                <div class="text-right mb-2">
                  <a
                    :href="article.short_url"
                    target="_blank"
                    class="btn btn-custom"
                    :class="
                      isDarkMode ? 'btn-outline-neon-yellow' : 'btn-outline-uv'
                    "
                  >
                    Read more...
                  </a>
                </div>
              </div>
            </div>
          </div>
          <!-- <ImageFilter /> -->
        </div>
      </template>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default {
  data() {
    return {
      articles: [],
    };
  },
  async fetch() {
    const data = await this.$axios.$get(
      "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=oPWIpYcGwSdzOH2cqYKkyvcotJCkGRNn"
    );
    this.articles = data.results;
  },

  computed: {
    ...mapGetters(["isDarkMode"]),
  },

  methods: {
    formatDate(date) {
      const time = new Date(date);
      const formattedDate = format(new Date(time), "dd MMM yyyy", {
        locale: ptBR,
      });

      return formattedDate;
    },
  },
};
</script>
