<template>
  <div class="py-4">
    <section class="container-maximum">
      <h2
        class="mb-3"
        :class="
          isDarkTheme
            ? 'border-bottom border-light'
            : 'border-bottom border-dark'
        "
      >
        <span class="marker-line"> Destaques </span>
      </h2>
      <div class="featured-grid">
        <CardBackground
          v-for="feat in featured"
          :key="feat.slug"
          :article="feat"
          isFeatured
        />
      </div>

      <div class="">
        <h3
          class="mb-3"
          :class="
            isDarkTheme
              ? 'border-bottom border-light'
              : 'border-bottom border-dark'
          "
        >
          <span class="marker-line"> Últimos artigos </span>
        </h3>

        <div class="subcontent-grid">
          <div class="lasts">
            <CardBackground
              v-for="article in articles"
              :key="article.slug"
              :article="article"
              badgeIsTag
              category
            />
          </div>
          <div class="reviews">
            <div class="card card-background view-anchor">
              <img
                src="https://i.imgur.com/BPkUdL7.jpg"
                class="card-background-image"
                alt=""
              />
              <div class="mask texture-mask-4"></div>
              <div
                class="card-img-overlay h-100 d-flex flex-column justify-content-end"
              >
                <h3 class="card-title mb-3">
                  <span class="bg-dark text-light py-1">
                    <span class="marker-line"> Deck: Gordo Primordial </span>
                  </span>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- <template v-for="article in articles">
        <CardText
          v-if="article.cardComponent === 'CardText'"
          :key="article.slug"
          :article="article"
          badgeIsTag
          category
        />
        <CardHorizontal
          v-else-if="article.cardComponent === 'CardHorizontal'"
          :key="article.slug"
          :article="article"
          badgeIsTag
          category
        />
        <CardBackground
          v-else-if="article.cardComponent === 'CardBackground'"
          :key="article.slug"
          :article="article"
          badgeIsTag
          category
        />
        <CardCode
          v-else-if="article.cardComponent === 'CardCode'"
          :key="article.slug"
          :article="article"
          badgeIsTag
          category
        />
      </template> -->
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  async asyncData({ $content, params }) {
    const featured = await $content("Articles", { deep: true }, params.slug)
      .only([
        "title",
        "description",
        "imageHeader",
        "cover",
        "slug",
        "dir",
        "channel",
        "category",
        "createdDate",
        "featured",
        "type",
        "author",
        "isPublished",
        "path",
        "tags",
        "cardComponent",
      ])
      .sortBy("createdDate", "desc")
      .where({
        isPublished: true,
        channel: { $ne: "Jobs" },
      })
      .limit(2)
      .fetch();

    const articles = await $content("Articles", { deep: true }, params.slug)
      .only([
        "title",
        "description",
        "imageHeader",
        "cover",
        "slug",
        "dir",
        "channel",
        "category",
        "createdDate",
        "featured",
        "type",
        "author",
        "isPublished",
        "path",
        "tags",
        "cardComponent",
      ])
      .sortBy("createdDate", "desc")
      .where({
        isPublished: true,
        channel: { $ne: "Jobs" },
      })
      .fetch();
    // console.log(articles);
    return { featured, articles };
  },

  computed: {
    ...mapGetters(["isDarkTheme"]),
  },

  data() {
    return {
      isHover: false,
    };
  },
};
</script>
<style lang="scss">
.container-maximum {
  max-width: 1500px;
  margin: 0 auto;
  padding: 0 20px;
}

.featured-grid {
  display: grid;
  grid-template-columns: auto auto;
  gap: 20px;
}

.subcontent-grid {
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-areas: "Lasts Reviews";
  gap: 20px;
}

.lasts {
  grid-area: Lasts;
}

.reviews {
  grid-area: Reviews;
}
</style>
