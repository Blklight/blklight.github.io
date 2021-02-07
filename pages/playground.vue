<template>
  <section class="container-fluid">
    <div class="container">
      <img src="https://i.imgur.com/ehfbNpw.jpg" class="img-fluid" alt="" />
      <div class="p-5 bg-orange"></div>
    </div>
    <div class="col-xl-10 col-12 offset-xl-1 offset-0 px-xl-0 px-1">
      <template v-if="isDarkMode">
        <img
          src="~/static/blklight-base-w.svg"
          width="160"
          class="mx-auto d-block mt-2"
          alt=""
        />
      </template>
      <template v-else>
        <img
          src="~/static/blklight-base.svg"
          width="160"
          class="mx-auto d-block mt-2"
          alt=""
        />
      </template>
      <h1 class="text-center" :class="isDarkMode ? 'text-light' : 'text-dark'">
        <strong><em>Playground</em></strong>
      </h1>
    </div>

    <div class="col-xl-10 col-12 offset-xl-1 offset-0 px-lg-0 px-3 pt-5">
      <div class="row">
        <div
          v-for="(article, i) in articles"
          :key="i"
          class="col-lg-4 col-md-6 col-12"
        >
          <div
            class="card mb-5"
            :class="
              isDarkMode
                ? 'card-plain hover-card-yellow'
                : 'hover-card-uv card-raised'
            "
          >
            <div class="card-picture narrow">
              <div class="">
                <img
                  v-lazy="article.multimedia[0].url"
                  class="card-img card-img-fit rounded cyberpunk-effect"
                  alt="Card image cap"
                  style="height: 325px !important"
                />
              </div>
            </div>
            <div class="card-body px-4" :class="isDarkMode ? 'text-light' : ''">
              <h4 class="mb-3">
                <strong
                  ><em>{{ article.title }}</em></strong
                >
              </h4>
              <p class="card-text">
                {{ article.abstract }}
              </p>
              <span
                class="badge badge-uv badge-tag mb-2"
                style="text-transform: capitalize"
              >
                {{ article.section }}
              </span>
              <span class="badge badge-uv badge-tag">
                {{ formatDate(article.updated_date) }}
              </span>
              <div class="text-right mb-2">
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
      <div class="row">
        <div
          v-for="(article, i) in articles"
          :key="i"
          class="col-lg-4 col-md-6 col-12"
        >
          <div
            class="card mb-4"
            :class="
              isDarkMode
                ? 'card-plain hover-card-yellow'
                : 'hover-card-uv card-raised'
            "
          >
            <img
              v-lazy="article.multimedia[0].url"
              class="card-img-top card-img-fit cyberpunk-effect"
              alt="..."
              style="height: 350px !important"
            />
            <div class="card-body px-4" :class="isDarkMode ? 'text-light' : ''">
              <h4>
                <strong
                  ><em>{{ article.title }}</em></strong
                >
              </h4>
              <p class="card-text">
                {{ article.abstract }}
              </p>
              <span
                class="badge badge-uv badge-tag mb-2"
                style="text-transform: capitalize"
              >
                {{ article.section }}
              </span>
              <span class="badge badge-uv badge-tag">
                {{ formatDate(article.updated_date) }}
              </span>
              <div class="text-right mb-2">
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
  async asyncData({ $axios, $content, params }) {
    const featureds = await $content({ deep: true }, params.slug)
      .only([
        "title",
        "description",
        "img",
        "imgAlt",
        "slug",
        "dir",
        "channel",
        "createdAt",
        "updatedAt",
        "isFeatured",
      ])
      .sortBy("updatedAt", "desc")
      .where({ isFeatured: true })
      .limit(1)
      .fetch();

    const posts = await $content({ deep: true }, params.slug)
      .only([
        "title",
        "description",
        "img",
        "imgAlt",
        "slug",
        "dir",
        "channel",
        "createdAt",
        "updatedAt",
        "isFeatured",
      ])
      .sortBy("updatedAt", "desc")
      .where({ isFeatured: false })
      .limit(5)
      .fetch();

    const data = await $axios.$get(
      "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=oPWIpYcGwSdzOH2cqYKkyvcotJCkGRNn"
    );
    const articles = data.results;
    // console.log(articles);
    return {
      articles,
      featureds,
      posts,
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
    slugName(archive) {
      const link = archive.replace("/", "").replace("/articles", "");
      return link;
    },
  },
};
</script>
<style>
.linear-background {
  background-image: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0) 20%,
      rgba(0, 0, 0, 1) 85%
    ),
    url("../static/rock-in-rio.png");
  background-position: top, top;
  background-size: cover, cover;
  background-repeat: no-repeat;
}

.bg-img {
  background-image: url("../static/rock-in-rio.png");
  background-position: bottom;
}
</style>
