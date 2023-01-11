<template>
  <div
    class="card ultra-radius card-background flex-1 view-anchor mb-4"
    :class="[isDarkTheme ? 'hover-card-neon-yellow' : ' hover-card-uv']"
    style=""
    @mouseover="isHover = true"
    @mouseout="isHover = false"
  >
    <img
      :src="article.cover ? article.cover : article.imageHeader"
      class="hover-filter-cyberpunk-ix grad-filter"
      alt="teste"
      :class="
        isFeatured ? 'card-background-image-featured' : 'card-background-image'
      "
    />
    <div class="mask texture-mask-4"></div>
    <div
      class="card-img-overlay h-100 d-flex flex-column justify-content-end p-4"
    >
      <div class="d-flex align-items-center mb-2">
        <span
          class="marker-line py-1 bg-dark text-light"
          style="font-weight: 500"
        >
          {{ article.channel }}
        </span>
      </div>

      <h3 class="card-title">
        <span class="bg-dark text-light py-1">
          <span class="marker-line"> {{ article.title }} </span>
        </span>
      </h3>
      <!-- <div class="d-flex align-items-center mb-2">
        <span
          class="marker-line py-1 bg-dark text-light"
          style="font-weight: 500"
        >
          Por {{ article.author.name }} em {{ article.channel }}
        </span>
      </div> -->
      <div class="d-flex justify-content-between">
        <div class="d-flex align-items-center mt-1 mb-1">
          <div class="flex-shrink-0">
            <span class="visually-hidden-focusable">{{
              article.author.name
            }}</span>
            <img
              class="rounded-circle border border-dark"
              src="https://i.imgur.com/h4BIIOc.jpg"
              alt=""
              style="height: 48px; width: 48px; object-fit: cover"
            />
          </div>
          <div class="ms-2">
            <p class="text-sm font-medium text-light mb-0">
              <span class="marker-line bg-dark custom-padding">
                {{ article.author.name }}
              </span>
            </p>
            <div class="flex space-x-1 text-sm text-light">
              <time
                class="marker-line bg-dark text-capitalize custom-padding"
                dateTime="article.createdDate"
              >
                <DateFormat :date="article.createdDate" />
              </time>
            </div>
          </div>
        </div>
        <div class="d-flex align-items-end">
          <div class="">
            <nuxt-link
              :to="article.path"
              class="btn btn-read-more-sm"
              :class="isDarkTheme ? 'btn-neon-yellow' : 'btn-uv'"
            >
              Ler mais...
            </nuxt-link>
          </div>
        </div>
      </div>
      <!-- <div class="d-flex justify-content-between">
        <nuxt-link
          :to="article.path"
          class="btn btn-read-more-sm"
          :class="isDarkTheme ? 'btn-neon-yellow' : 'btn-uv'"
        >
          Ler mais...
        </nuxt-link>
      </div> -->
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: {
    article: {
      type: Object,
      default: null,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    badgeIsTag: {
      type: Boolean,
      default: false,
    },

    category: {
      type: Boolean,
      default: false,
    },

    tags: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      isHover: false,
    };
  },

  computed: {
    ...mapGetters(["isDarkTheme"]),
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
.ultra-radius {
  border-radius: 1.5rem !important;
}
.custom-padding {
  padding: 0.125rem 0.25rem !important;
}
</style>
