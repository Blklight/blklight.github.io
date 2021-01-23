<template>
  <div>
    <div v-if="headerTemplate === 'portrait-left'">
      <div class="header-content header-h-full d-md-inline-flex">
        <div
          class="header-image-half header-h-full header-border-right hover-header"
        >
          <div
            v-lazy:background-image="article.imageHeader"
            class="header-image-background header-h-full cyberpunk-effect fade-in-left"
          ></div>
        </div>
        <div class="header-info-half header-h-full">
          <div class="h-100 d-flex flex-column justify-content-end">
            <h1 class="blog-title">
              <span
                class="marker marker-title"
                :class="isDarkMode ? 'marker-light' : 'marker-dark'"
              >
                <em> {{ article.title }}</em>
              </span>
            </h1>
            <h5 class="blog-meta">
              <span
                class="marker"
                :class="isDarkMode ? 'marker-light' : 'marker-dark'"
              >
                {{ dateFormat }}
              </span>
            </h5>
            <div class="d-flex">
              <div class="mt-1">
                <span
                  v-if="article.channel === 'dev-corporation'"
                  class="badge badge-tag badge-primary mx-0"
                >
                  Dev Corporation
                </span>
                <span
                  v-if="article.channel === 'nerdstation'"
                  class="badge badge-tag badge-orange mx-0"
                >
                  Nerdstation
                </span>
                <span
                  v-if="article.category"
                  class="badge badge-tag badge-dark mx-0"
                >
                  {{ article.category }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="headerTemplate === 'portrait-right'">
      <div class="header-content header-h-full d-md-inline-flex">
        <div class="header-info-half header-h-full">
          <div class="h-100 d-flex flex-column justify-content-end">
            <h1 class="blog-title">
              <span
                class="marker marker-title"
                :class="isDarkMode ? 'marker-light' : 'marker-dark'"
              >
                <em>
                  {{ article.title }}
                </em>
              </span>
            </h1>
            <h5 class="blog-meta">
              <span
                class="marker"
                :class="isDarkMode ? 'marker-light' : 'marker-dark'"
              >
                {{ dateFormat }}
              </span>
            </h5>
            <div class="d-flex">
              <div class="mt-1">
                <span
                  v-if="article.channel === 'dev-corporation'"
                  class="badge badge-tag badge-primary mx-0"
                >
                  Dev Corporation
                </span>
                <span
                  v-if="article.channel === 'nerdstation'"
                  class="badge badge-tag badge-orange mx-0"
                >
                  Nerdstation
                </span>
                <span
                  v-if="article.category"
                  class="badge badge-tag badge-dark mx-0"
                >
                  {{ article.category }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div
          class="header-image-half header-h-full header-border-left hover-header"
        >
          <div
            v-lazy:background-image="article.imageHeader"
            class="header-image-background header-h-full cyberpunk-effect fade-in-right"
          ></div>
        </div>
      </div>
    </div>

    <div v-if="headerTemplate === 'landscape'">
      <div class="header-content d-md-inline-flex hover-header">
        <div class="header-info">
          <div class="h-100 d-flex flex-column justify-content-end">
            <h1 class="blog-title">
              <span class="marker marker-dark marker-title">
                <em> {{ article.title }} </em>
              </span>
            </h1>
            <h5 class="blog-meta">
              <span class="marker marker-dark sm-mark">
                {{ dateFormat }}
              </span>
            </h5>
            <div class="d-flex">
              <div class="mt-1">
                <span v-if="article.category === 'Design'">
                  <span class="badge badge-tag badge-uv mx-0">
                    {{ article.category }}
                  </span>
                </span>
                <span v-if="article.category === 'Dev'">
                  <span class="badge badge-tag badge-primary text-dark mx-0">
                    {{ article.category }}
                  </span>
                </span>
                <span v-if="article.type === 'Pro'">
                  <span class="badge badge-tag badge-dark mx-0">
                    {{ article.type }}
                  </span>
                </span>
                <span v-if="article.type === 'Pessoal'">
                  <span class="badge badge-tag badge-orange mx-0">
                    {{ article.type }}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="header-image">
          <div
            v-lazy:background-image="article.imageHeader"
            class="header-image-background header-h-full cyberpunk-effect fade-in"
          ></div>
        </div>
      </div>
    </div>

    <div v-if="headerTemplate === 'parallax'">
      <div class="header-simple">
        <div
          class="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1 p-lg-0 col-md-10 offset-md-1 p-md-0 col-12"
        >
          <div class="header-simple-info mb-0 mx-lg-0">
            <h1 class="blog-title">
              <span
                class="marker marker-title"
                :class="isDarkMode ? 'marker-light' : 'marker-dark'"
              >
                <em> {{ article.title }}</em>
              </span>
            </h1>

            <h5 class="blog-meta">
              <span
                class="marker"
                :class="isDarkMode ? 'marker-light' : 'marker-dark'"
              >
                {{ dateFormat }}
              </span>
            </h5>
            <div class="d-flex">
              <div class="mt-1">
                <span>
                  <span
                    v-if="article.category === 'Design'"
                    class="badge badge-tag badge-uv mx-0"
                  >
                    {{ article.category }}
                  </span>
                </span>
                <span
                  v-if="article.category === 'Dev'"
                  class="badge badge-tag badge-primary text-dark mx-0"
                >
                  {{ article.category }}
                </span>
                <span
                  v-if="article.type === 'Pro'"
                  class="badge badge-tag badge-dark mx-0"
                >
                  {{ article.type }}
                </span>
                <span
                  v-if="article.type === 'Pessoal'"
                  class="badge badge-tag badge-orange mx-0"
                >
                  {{ article.type }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="hover-header">
          <div
            v-lazy:background-image="article.imageHeader"
            class="header-simple-image-parallax cyberpunk-effect fade-in"
          ></div>
        </div>
      </div>
    </div>

    <div v-if="headerTemplate === 'square-profile'">
      <div class="container-fluid p-0">
        <div class="container p-0">
          <div class="col-12 pt-lg-3 py-2 px-3">
            <div class="header-profile">
              <div class="row">
                <div class="col-lg-4 col-md-4 col-xs-12 col-12">
                  <div
                    v-lazy-container="{ selector: 'img' }"
                    class="head-avatar"
                  >
                    <img
                      :data-src="imageSrc"
                      class="post-avatar rounded img-fluid mx-auto d-block mb-4"
                      :alt="article.title"
                    />
                  </div>
                </div>
                <div class="col-lg-8 col-md-8 col-xs-12 col-12">
                  <div class="head-text my-3">
                    <h1 class="blog-title">
                      <span
                        class=""
                        :class="isDarkMode ? 'text-light' : 'text-dark'"
                      >
                        <em> {{ article.title }}</em>
                      </span>
                    </h1>
                    <template v-if="article.abstract">
                      <h5 class="blog-meta">
                        <span :class="isDarkMode ? 'text-light' : 'text-dark'">
                          {{ article.abstract }}
                        </span>
                      </h5>
                    </template>

                    <h5 class="blog-meta">
                      <span :class="isDarkMode ? 'text-light' : 'text-dark'">
                        {{ dateFormat }}
                      </span>
                    </h5>
                    <div class="d-flex">
                      <div class="mt-1">
                        <span
                          v-if="article.category === 'Design'"
                          class="badge badge-tag badge-uv mx-0"
                        >
                          {{ article.category }}
                        </span>
                        <span
                          v-if="article.category === 'Dev'"
                          class="badge badge-tag badge-primary text-dark mx-0"
                        >
                          {{ article.category }}
                        </span>
                        <span
                          v-if="article.type === 'Pro'"
                          class="badge badge-tag badge-dark mx-0"
                        >
                          {{ article.type }}
                        </span>
                        <span
                          v-if="article.type === 'Pessoal'"
                          class="badge badge-tag badge-orange mx-0"
                        >
                          {{ article.type }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="headerTemplate === 'circle-profile'">
      <div class="container-fluid p-0">
        <div class="container p-0">
          <div class="col-12 pt-lg-3 py-2 px-3">
            <div class="header-profile">
              <div class="row">
                <div class="col-lg-4 col-md-4 col-xs-12 col-12">
                  <div
                    v-lazy-container="{ selector: 'img' }"
                    class="head-avatar"
                  >
                    <img
                      :data-src="imageSrc"
                      width="325"
                      class="rounded-circle shadow-image img-fluid mx-auto d-block mb-4"
                      :alt="article.title"
                    />
                  </div>
                </div>
                <div class="col-lg-8 col-md-8 col-xs-12 col-12">
                  <div class="head-text my-3">
                    <h1 class="blog-title">
                      <span class="marker marker-dark title">
                        {{ article.title }}
                      </span>
                    </h1>
                    <h5 class="blog-meta">
                      <span class="marker marker-dark sm-mark">
                        {{ article.abstract }}
                      </span>
                    </h5>
                    <h5 class="blog-meta">
                      <span class="marker marker-dark sm-mark">
                        {{ dateFormat }}
                      </span>
                    </h5>
                    <div class="d-flex">
                      <div class="mt-1">
                        <span v-if="article.category === 'Design'">
                          <span class="badge badge-tag badge-uv mx-1">
                            {{ article.category }}
                          </span>
                        </span>
                        <span v-if="article.category === 'Dev'">
                          <span
                            class="badge badge-tag badge-primary text-dark mx-1"
                          >
                            {{ article.category }}
                          </span>
                        </span>
                        <span v-if="article.type === 'Pro'">
                          <span class="badge badge-tag badge-dark mx-1">
                            {{ article.type }}
                          </span>
                        </span>
                        <span v-if="article.type === 'Pessoal'">
                          <span class="badge badge-tag badge-orange mx-1">
                            {{ article.type }}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="headerTemplate === 'image-top'">
      <div class="container-fluid p-0">
        <div class="col-lg-10 offset-lg-1 col-12 p-lg-0">
          <div class="header-simple">
            <div v-lazy-container="{ selector: 'img' }" class="hover-header">
              <img
                :data-src="article.imageHeader"
                alt=""
                class="header-simple-image-top cyberpunk-effect"
              />
            </div>
          </div>
        </div>
        <div
          class="col-xl-6 offset-xl-3 col-lg-8 offset-lg-2 p-lg-0 col-md-10 offset-md-1 p-md-0 col-12"
        >
          <div class="header-simple-info mt-2 mb-0 mx-lg-0">
            <h1 class="blog-title exo-font" style="font-style: italic">
              <span
                class="marker marker-title"
                :class="isDarkMode ? 'marker-light' : 'marker-dark'"
              >
                {{ article.title }}
              </span>
            </h1>
            <h5 class="blog-meta exo-font" style="font-style: italic">
              <span
                class="marker px-1"
                :class="isDarkMode ? 'marker-light' : 'marker-dark'"
              >
                {{ dateFormat }}
              </span>
            </h5>
            <div class="d-flex">
              <div class="mt-1">
                <span
                  v-if="article.category === 'Design'"
                  class="badge badge-tag badge-uv mx-0"
                >
                  {{ article.category }}
                </span>
                <span
                  v-if="article.category === 'Dev'"
                  class="badge badge-tag badge-primary text-dark mx-0"
                >
                  {{ article.category }}
                </span>
                <span
                  v-if="article.type === 'Pro'"
                  class="badge badge-tag badge-dark mx-0"
                >
                  {{ article.type }}
                </span>
                <span
                  v-if="article.type === 'Pessoal'"
                  class="badge badge-tag badge-orange mx-0"
                >
                  {{ article.type }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default {
  name: "HeaderLayout",

  props: {
    article: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      // headerLayout: this.article.imgheaderLayout
    };
  },

  computed: {
    ...mapGetters(["isDarkMode"]),

    imageSrc() {
      const image = this.article.cover
        ? this.article.cover
        : this.article.imageHeader;

      return image;
    },

    dateFormat() {
      const formattedDate = format(
        new Date(this.article.date),
        "dd 'de' MMMM 'de' yyyy",
        {
          locale: ptBR,
        }
      );

      return formattedDate;
    },

    headerTemplate() {
      const layoutTemplate = ["portrait-left", "portrait-right"];
      const num = Math.floor(Math.random() * layoutTemplate.length);

      const layout = this.article.headerLayout
        ? this.article.headerLayout
        : layoutTemplate[num];

      return layout;
    },
  },
};
</script>
<style lang="scss">
.fade-in {
  -webkit-animation: fade-in 1.2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  animation: fade-in 1.2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}
.scale-in-tl {
  -webkit-animation: scale-in-tl 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: scale-in-tl 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

.fade-in-left {
  -webkit-animation: fade-in-left 0.6s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  animation: fade-in-left 0.6s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}

.fade-in-right {
  -webkit-animation: fade-in-right 0.6s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  animation: fade-in-right 0.6s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}

/* ----------------------------------------------
 * Generated by Animista on 2020-12-7 17:1:30
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation scale-in-tl
 * ----------------------------------------
 */
@-webkit-keyframes scale-in-tl {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
    -webkit-transform-origin: 0% 0%;
    transform-origin: 0% 0%;
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-transform-origin: 0% 0%;
    transform-origin: 0% 0%;
    opacity: 1;
  }
}
@keyframes scale-in-tl {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
    -webkit-transform-origin: 0% 0%;
    transform-origin: 0% 0%;
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-transform-origin: 0% 0%;
    transform-origin: 0% 0%;
    opacity: 1;
  }
}

/* ----------------------------------------------
 * Generated by Animista on 2020-12-7 17:3:46
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation fade-in-left
 * ----------------------------------------
 */
@-webkit-keyframes fade-in-left {
  0% {
    -webkit-transform: translateX(-50px);
    transform: translateX(-50px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}
@keyframes fade-in-left {
  0% {
    -webkit-transform: translateX(-50px);
    transform: translateX(-50px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}

/* ----------------------------------------------
 * Generated by Animista on 2020-12-7 17:7:10
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation fade-in-right
 * ----------------------------------------
 */
@-webkit-keyframes fade-in-right {
  0% {
    -webkit-transform: translateX(50px);
    transform: translateX(50px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}
@keyframes fade-in-right {
  0% {
    -webkit-transform: translateX(50px);
    transform: translateX(50px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}
/* ----------------------------------------------
 * Generated by Animista on 2020-12-7 17:13:27
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation fade-in
 * ----------------------------------------
 */
@-webkit-keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
