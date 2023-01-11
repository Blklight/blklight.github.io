<template>
  <div class="card card-plain">
    <img
      v-lazy="article.cover ? article.cover : article.imageHeader"
      class="ultra-radius shadow-image rounded-3"
      style="max-width: 100%; height: 400px; object-fit: cover"
    />
    <div class="card-body">
      <div class="d-flex align-items-center mb-2">
        <span style="font-weight: 500">
          <DateFormat :date="article.createdDate" full />
        </span>
      </div>
      <h4 class="card-title">{{ article.title }}</h4>
      <p class="mb-2" style="font-size: 18px; font-family: 'Barlow'">
        {{ article.description }}
      </p>
      <!-- <div class="d-flex align-items-center mb-2">
        <span style="font-weight: 500">
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
            <p class="text-sm font-medium mb-0">
              <span class="marker-line custom-padding">
                {{ article.author.name }}
              </span>
            </p>
            <div class="flex space-x-1 text-sm">
              <time
                class="marker-line text-capitalize custom-padding"
                dateTime="article.createdDate"
              >
                <DateFormat :date="article.createdDate" />
              </time>
            </div>
          </div>
        </div>
        <div class="d-flex align-items-center">
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
      <!-- <nuxt-link
        :to="article.path"
        class="btn btn-read-more-sm"
        :class="isDarkTheme ? 'btn-neon-yellow' : 'btn-uv'"
      >
        Ler mais...
      </nuxt-link> -->
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
    // slugName(data) {
    //   const link = data.replace("articles/", "").replace("/", "");
    //   return link;
    // },
  },
};
</script>
