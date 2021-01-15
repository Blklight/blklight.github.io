<template>
  <div
    class="card mb-4"
    :class="isDarkMode ? 'hover-card-yellow' : 'hover-card-uv card-raised'"
  >
    <img
      v-lazy="imageSrc(story)"
      :alt="story.title"
      class="card-image-stories card-img-border cyberpunk-effect"
    />
    <div class="card-img-overlay d-flex flex-column">
      <div class="d-flex mb-2">
        <span class="badge badge-dark badge-tag ml-0 mr-2">
          {{ formatDate(story.createdAt) }}
        </span>
        <ChannelBadge :channel="story.channel" :isTag="true" />
      </div>

      <h3 class="mb-2">
        <span class="marker marker-dark py-1">
          <strong>
            <em>{{ story.title }}</em>
          </strong>
        </span>
      </h3>
      <p v-if="story.abstract" class="d-none d-sm-block mb-1">
        <span class="marker marker-dark">
          {{ story.abstract }}
        </span>
      </p>
      <div class="my-1">
        <span class="badge badge-dark badge-tag ml-0">
          <em> Por {{ story.author.name }} </em>
        </span>
      </div>

      <div class="mt-auto ml-auto">
        <nuxt-link
          tag="a"
          :to="{
            name: `${slugName}-slug`,
            params: { slug: `${story.slug}` },
          }"
          class="btn btn-flat"
          :class="isDarkMode ? 'btn-neon-yellow' : 'btn-uv'"
        >
          Ler mais...
        </nuxt-link>
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
  name: "Stories",

  components: { ChannelBadge },
  props: {
    story: {
      type: Object,
      default: null,
    },
  },

  computed: {
    ...mapGetters(["isDarkMode"]),
    slugName() {
      const link = this.story.dir.replace("/", "");
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
    imageSrc(story) {
      const image = story.cover ? story.cover : story.imageHeader;

      return image;
    },
  },
};
</script>
