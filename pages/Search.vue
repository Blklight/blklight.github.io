<template>
  <LayoutContent>
    <div class="grid-cards">
      <div
        class="card card-raised mt-lg-4 mb-4"
        :class="
          isDarkTheme ? 'card-plain border border-light' : ' border border-dark'
        "
      >
        <div class="card-body">
          <div class="input-group input-group-lg">
            <span
              id="search"
              class="input-group-text border-0 font-monospace d-none d-sm-block"
              :class="
                isDarkTheme ? 'bg-neon-yellow text-dark' : 'bg-uv text-light'
              "
            >
              Pesquisar
            </span>
            <span
              id="search"
              class="input-group-text border-0 font-monospace d-block d-sm-none"
              :class="
                isDarkTheme ? 'bg-neon-yellow text-dark' : 'bg-uv text-light'
              "
            >
              <font-awesome-icon :icon="['fas', 'search']" />
            </span>
            <input
              v-model="query"
              type="search"
              autocomplete="off"
              class="form-control form-control-lg"
              placeholder="Pesquisar artigo..."
              aria-label="search"
              aria-describedby="search"
              :class="
                !isDarkTheme
                  ? 'form-control-light-theme form-underline-uv'
                  : 'form-underline-neon-yellow'
              "
            />
          </div>
        </div>
      </div>
      <template v-if="articles.length">
        <h3
          class="mb-3"
          :class="
            isDarkTheme
              ? 'text-light cyber-underline-light'
              : 'text-dark cyber-underline-dark'
          "
        >
          <em> {{ articles.length }} para a busca: "{{ query }}"</em>
        </h3>
        <div class="grid-cards-content">
          <div
            v-for="article of articles"
            :key="article.slug"
            class="card card-raised card-background view mb-4"
            :class="[
              isDarkTheme
                ? 'hover-card-yellow-bordered border border-light'
                : 'hover-card-uv-bordered border border-dark',
            ]"
          >
            <img
              v-lazy="article.cover ? article.cover : article.imageHeader"
              class="
                card-background-image card-img-border
                hover-filter-cyberpunk-v
              "
              :alt="article.title"
            />
            <!-- <div v-if="texture" class="mask texture-mask-2"></div> -->
            <div
              class="
                card-img-overlay
                h-100
                d-flex
                flex-column
                justify-content-end
              "
            >
              <div class="d-xl-flex d-lg-block d-md-flex mb-1">
                <span class="badge bg-dark border border-dark ms-0 me-1">
                  <DateFormat :date="article.createdDate" />
                </span>
                <ChannelBadge :channel="article.channel" class="" />
              </div>

              <h5 class="card-title">
                <span class="bg-dark text-light py-1">
                  <em>
                    <i class="marker-line"> {{ article.title }} </i>
                  </em>
                </span>
              </h5>

              <div class="d-flex justify-content-between my-1">
                <nuxt-link
                  :to="{
                    name: `${slugName(article.dir)}-slug`,
                    params: { slug: `${article.slug}` },
                  }"
                  class="btn btn-uv btn-raised btn-read-more-sm ms-auto"
                >
                  Ler mais...
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
        <!-- <CardHorizontal
          v-for="article in articles"
          :key="article.slug"
          :article="article"
        /> -->
      </template>
    </div>
  </LayoutContent>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      query: "",
      articles: [],
    };
  },
  computed: {
    ...mapGetters(["isDarkTheme"]),
  },
  watch: {
    async query(query) {
      if (!query) {
        this.articles = [];
        return;
      }

      this.articles = await this.$content("articles", { deep: true })
        .only([
          "title",
          "abstract",
          "imageHeader",
          "cover",
          "slug",
          "dir",
          "channel",
          "category",
          "createdDate",
        ])
        .sortBy("createdAt", "desc")
        .search(query)
        .fetch();
    },
  },

  methods: {
    slugName(data) {
      const link = data.replace("articles/", "").replace("/", "");
      return link;
    },
  },
};
</script>

<style lang="scss">
.grid-cards {
  max-width: 85vw;
  margin: 0 auto;
  padding: 0 20px;

  &-content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    grid-auto-columns: auto auto;
    column-gap: 16px;
  }
}

@media screen and (max-width: 1200px) {
  .grid-cards {
    &-content {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}

@media screen and (max-width: 992px) {
  .grid-cards {
    &-content {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

@media screen and (max-width: 768px) {
  .grid-cards {
    padding: 0 16px;

    &-content {
      grid-template-columns: 1fr;
    }
  }
}
</style>
