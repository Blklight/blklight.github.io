<template>
  <div>
    <div
      class="card card-featured-post card-background mb-4"
      :class="[isDarkMode ? 'hover-card-yellow' : 'hover-card-uv card-raised']"
    >
      <img
        v-lazy="imageSrc(article)"
        class="card-background-image featured-image card-img-border cyberpunk-effect"
        :alt="article.title"
        style="height: 650px !important"
      />
      <div
        class="card-img-overlay h-100 d-flex flex-column justify-content-end px-3"
      >
        <div class="d-flex mb-1">
          <span class="badge badge-dark badge-tag ml-0 mr-1">
            {{ formatDate(article.createdAt) }}
          </span>
          <ChannelBadge :channel="article.channel" :isTag="true" />
        </div>

        <h3 class="marker marker-dark">
          <strong>
            <em> {{ article.title }} </em>
          </strong>
        </h3>
        <!-- <p class="d-none d-sm-block mb-1">
          <span class="marker marker-dark">
            {{ article.abstract }}
          </span>
        </p> -->

        <div class="d-flex justify-content-between my-1">
          <span class="badge badge-dark badge-tag ml-0">
            <em> Por {{ article.author.name }} </em>
          </span>
          <nuxt-link
            tag="a"
            :to="{
              name: `${slugName}-slug`,
              params: { slug: `${article.slug}` },
            }"
            class="btn btn-sm"
            :class="isDarkMode ? 'btn-neon-yellow' : 'btn-uv'"
          >
            Ler mais...
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import ChannelBadge from "@/components/ChannelBadge";

export default {
  name: "Featured",

  components: { ChannelBadge },

  props: {
    article: {
      type: Object,
      default: null,
    },
  },

  computed: {
    ...mapGetters(["isDarkMode"]),
    slugName() {
      const link = this.article.dir.replace("/", "").replace("/articles", "");
      return link;
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
      const image = article.cover ? article.cover : article.imageHeader;

      return image;
    },
    // slugName(dir) {
    //   const link = dir.replace("articles", "");
    //   console.log(link);
    //   return link;
    // },
  },
};
</script>
