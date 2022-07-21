<template>
  <article
    class="card card-background-small card-flat view-anchor mb-4"
    :class="[
      isDarkTheme ? codeStyle.hover.dark : codeStyle.hover.light,
      codeStyle.card,
    ]"
  >
    <img
      v-lazy="article.cover ? article.cover : article.imageHeader"
      class="card-background-image-small"
      alt=""
    />
    <div class="mask texture-mask-4"></div>

    <div class="card-img-overlay d-flex flex-column">
      <div class="d-flex align-items-center py-3">
        <span
          v-for="tag in article.tags"
          :key="tag"
          class="badge badge-tag"
          :class="[codeStyle.badges]"
        >
          {{ tag }}
        </span>
      </div>
      <div class="d-sm-flex align-items-center px-1">
        <div class="flex-grow-1">
          <h4 class="font-monospace mb-2">
            <span class="marker-line py-1" :class="[codeStyle.title]">
              {{ article.title }}
            </span>
          </h4>
          <p class="font-monospace mb-2">
            <span class="marker-line py-1" :class="[codeStyle.title]">
              <DateFormat :date="article.createdDate" full />
            </span>
          </p>

          <p class="font-monospace mb-1">
            <span class="marker-line py-1" :class="[codeStyle.title]">
              Por Ultimate
            </span>
          </p>
        </div>
      </div>
      <div class="d-flex align-items-center py-3 mt-auto">
        <NuxtLink
          :to="article.path"
          class="btn btn-read-more-sm ms-auto"
          :class="[codeStyle.button]"
        >
          Ler mais...
        </NuxtLink>
      </div>
    </div>
  </article>
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
      styleDefault: {
        card: "bg-polen text-dark",
        badges: "bg-light text-uv",
        title: "text-uv bg-light",
        button: "btn-light text-uv",
        hover: {
          dark: "border border-uv hover-card-uv",
          light: "border border-uv hover-card-uv",
        },
      },
      codeStylesDefault: [
        {
          name: "Javascript",
          styles: {
            card: "",
            badges: "",
            title: "",
            text: "",
            button: "",
            hover: "",
          },
        },
        {
          name: "React",
          styles: {
            card: "bg-react text-dark",
            badges: "bg-dark text-react",
            title: "text-react bg-dark",
            button: "btn-dark text-react",
            hover: {
              dark: "border border-react hover-card-react",
              light: "border border-dark hover-card-dark",
            },
          },
        },
        {
          name: "Vue",
          styles: {
            card: "bg-vue text-dark",
            badges: "bg-dark text-vue",
            title: "text-vue bg-dark",
            button: "btn-dark text-vue",
            hover: {
              dark: "border border-vue hover-card-vue",
              light: "border border-dark hover-card-dark",
            },
          },
        },
      ],
      languages: ["React", "Javascript", "Vue"],
    };
  },

  computed: {
    ...mapGetters(["isDarkTheme"]),
    codeStyle() {
      let style = {};
      for (let i = 0; i < this.article.tags.length; i++) {
        if (this.languages.includes(this.article.tags[i])) {
          // tag = this.article.tags[i];

          style = this.codeStylesDefault
            .filter((obj) => obj.name === this.article.tags[i])
            .map((obj) => ({
              card: obj.styles.card,
              badges: obj.styles.badges,
              title: obj.styles.title,
              button: obj.styles.button,
              hover: {
                ...obj.styles.hover,
              },
            }));
        }
      }
      let codeStyle = {};
      if (style[0]) {
        codeStyle = {
          ...style[0],
        };
      } else {
        codeStyle = {
          ...this.styleDefault,
        };
      }

      return codeStyle;
    },
  },

  methods: {},
};
</script>
