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
<style lang="scss">
// .card {
//   .hover-card {
//     &-uv {
//       &:hover {
//         border: 1px solid #4c00ff !important;
//       }
//     }
//   }
// }

.hover-card {
  &-uv {
    &:hover {
      -webkit-animation: shadow-pop-br-uv 0.2s
        cubic-bezier(0.47, 0, 0.745, 0.715) both;
      animation: shadow-pop-br-uv 0.2s cubic-bezier(0.47, 0, 0.745, 0.715) both;
      border-radius: 0 !important;
      border: 1px solid #4c00ff;
    }
  }
  &-yellow {
    &:hover {
      // transition: all ease-in-out 0.2s;
      // box-shadow: 6px 6px 1px 1px rgba(255, 255, 0, 1);
      -webkit-animation: shadow-pop-br-yellow 0.2s
        cubic-bezier(0.47, 0, 0.745, 0.715) both;
      animation: shadow-pop-br-yellow 0.2s cubic-bezier(0.47, 0, 0.745, 0.715)
        both;
      border-radius: 0 !important;
      border: 1px solid #ffff00;
    }
  }
}

@-webkit-keyframes shadow-pop-br-yellow {
  0% {
    -webkit-box-shadow: 0 0 #ffff00, 0 0 #ffff00, 0 0 #ffff00, 0 0 #ffff00,
      0 0 #ffff00, 0 0 #ffff00, 0 0 #ffff00, 0 0 #ffff00;
    box-shadow: 0 0 #ffff00, 0 0 #ffff00, 0 0 #ffff00, 0 0 #ffff00, 0 0 #ffff00,
      0 0 #ffff00, 0 0 #ffff00, 0 0 #ffff00;
    -webkit-transform: translateX(0) translateY(0);
    transform: translateX(0) translateY(0);
  }
  100% {
    -webkit-box-shadow: 1px 1px #ffff00, 2px 2px #ffff00, 3px 3px #ffff00,
      4px 4px #ffff00, 5px 5px #ffff00, 6px 6px #ffff00, 7px 7px #ffff00,
      8px 8px #ffff00;
    box-shadow: 1px 1px #ffff00, 2px 2px #ffff00, 3px 3px #ffff00,
      4px 4px #ffff00, 5px 5px #ffff00, 6px 6px #ffff00, 7px 7px #ffff00,
      8px 8px #ffff00;
    -webkit-transform: translateX(-8px) translateY(-8px);
    transform: translateX(-8px) translateY(-8px);
  }
}
@keyframes shadow-pop-br-yellow {
  0% {
    -webkit-box-shadow: 0 0 #ffff00, 0 0 #ffff00, 0 0 #ffff00, 0 0 #ffff00,
      0 0 #ffff00, 0 0 #ffff00, 0 0 #ffff00, 0 0 #ffff00;
    box-shadow: 0 0 #ffff00, 0 0 #ffff00, 0 0 #ffff00, 0 0 #ffff00, 0 0 #ffff00,
      0 0 #ffff00, 0 0 #ffff00, 0 0 #ffff00;
    -webkit-transform: translateX(0) translateY(0);
    transform: translateX(0) translateY(0);
  }
  100% {
    -webkit-box-shadow: 1px 1px #ffff00, 2px 2px #ffff00, 3px 3px #ffff00,
      4px 4px #ffff00, 5px 5px #ffff00, 6px 6px #ffff00, 7px 7px #ffff00,
      8px 8px #ffff00;
    box-shadow: 1px 1px #ffff00, 2px 2px #ffff00, 3px 3px #ffff00,
      4px 4px #ffff00, 5px 5px #ffff00, 6px 6px #ffff00, 7px 7px #ffff00,
      8px 8px #ffff00;
    -webkit-transform: translateX(-8px) translateY(-8px);
    transform: translateX(-8px) translateY(-8px);
  }
}

@-webkit-keyframes shadow-pop-br-uv {
  0% {
    -webkit-box-shadow: 0 0 #4c00ff, 0 0 #4c00ff, 0 0 #4c00ff, 0 0 #4c00ff,
      0 0 #4c00ff, 0 0 #4c00ff, 0 0 #4c00ff, 0 0 #4c00ff;
    box-shadow: 0 0 #4c00ff, 0 0 #4c00ff, 0 0 #4c00ff, 0 0 #4c00ff, 0 0 #4c00ff,
      0 0 #4c00ff, 0 0 #4c00ff, 0 0 #4c00ff;
    -webkit-transform: translateX(0) translateY(0);
    transform: translateX(0) translateY(0);
  }
  100% {
    -webkit-box-shadow: 1px 1px #4c00ff, 2px 2px #4c00ff, 3px 3px #4c00ff,
      4px 4px #4c00ff, 5px 5px #4c00ff, 6px 6px #4c00ff, 7px 7px #4c00ff,
      8px 8px #4c00ff;
    box-shadow: 1px 1px #4c00ff, 2px 2px #4c00ff, 3px 3px #4c00ff,
      4px 4px #4c00ff, 5px 5px #4c00ff, 6px 6px #4c00ff, 7px 7px #4c00ff,
      8px 8px #4c00ff;
    -webkit-transform: translateX(-8px) translateY(-8px);
    transform: translateX(-8px) translateY(-8px);
  }
}
@keyframes shadow-pop-br-uv {
  0% {
    -webkit-box-shadow: 0 0 #4c00ff, 0 0 #4c00ff, 0 0 #4c00ff, 0 0 #4c00ff,
      0 0 #4c00ff, 0 0 #4c00ff, 0 0 #4c00ff, 0 0 #4c00ff;
    box-shadow: 0 0 #4c00ff, 0 0 #4c00ff, 0 0 #4c00ff, 0 0 #4c00ff, 0 0 #4c00ff,
      0 0 #4c00ff, 0 0 #4c00ff, 0 0 #4c00ff;
    -webkit-transform: translateX(0) translateY(0);
    transform: translateX(0) translateY(0);
  }
  100% {
    -webkit-box-shadow: 1px 1px #4c00ff, 2px 2px #4c00ff, 3px 3px #4c00ff,
      4px 4px #4c00ff, 5px 5px #4c00ff, 6px 6px #4c00ff, 7px 7px #4c00ff,
      8px 8px #4c00ff;
    box-shadow: 1px 1px #4c00ff, 2px 2px #4c00ff, 3px 3px #4c00ff,
      4px 4px #4c00ff, 5px 5px #4c00ff, 6px 6px #4c00ff, 7px 7px #4c00ff,
      8px 8px #4c00ff;
    -webkit-transform: translateX(-8px) translateY(-8px);
    transform: translateX(-8px) translateY(-8px);
  }
}
</style>
