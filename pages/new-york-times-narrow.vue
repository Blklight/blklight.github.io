<template>
  <section class="container-fluid">
    <div class="col-xl-10 col-12 offset-xl-1 offset-0 px-lg-0 px-3">
      <h1 class="mt-3" :class="isDarkMode ? 'text-light' : 'text-dark'">
        <strong><em>New York Times - Top Stories</em></strong>
      </h1>
      <hr class="mt-1 mb-5" :class="isDarkMode ? 'bg-light' : 'bg-dark'" />
      <div class="row">
        <div
          v-for="(article, i) in articles"
          :key="i"
          class="col-lg-4 col-md-6 col-12"
        >
          <div
            class="card mt-3 mb-5"
            :class="
              isDarkMode
                ? 'card-plain hover-card-yellow'
                : 'hover-card-uv card-raised'
            "
          >
            <div class="card-picture narrow">
              <div class="">
                <img
                  class="card-img card-img-fit rounded cyberpunk-effect"
                  v-lazy="article.multimedia[0]['url']"
                  alt="Card image cap"
                  :title="article.multimedia[0].copyright"
                  style="height: 325px !important"
                />
              </div>
            </div>
            <div class="card-body px-4" :class="isDarkMode ? 'text-light' : ''">
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
              <h4>
                <strong
                  ><em>{{ article.title }}</em></strong
                >
              </h4>
              <h5 class="card-text mb-3">
                <em>{{ article.byline }}</em>
              </h5>

              <p class="card-text">
                {{ article.abstract }}
              </p>

              <div class="text-right mt-2">
                <a
                  :href="article.short_url"
                  target="_blank"
                  class="btn btn-sm"
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
      </div>
    </div>
  </section>
</template>
<script>
import { mapGetters } from "vuex";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default {
  // data() {
  //   return {
  //     articles: "",
  //   };
  // },
  async asyncData({ $axios }) {
    const data = await $axios.$get(
      "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=oPWIpYcGwSdzOH2cqYKkyvcotJCkGRNn"
    );
    const articles = data.results;

    console.log(articles);
    return {
      articles,
    };
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
