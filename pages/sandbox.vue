<template>
  <main>
    <h1 :class="isShowEffect ? 'fade-in-bottom' : 'fade-out-top'">
      {{ text }}
    </h1>

    <!-- <div class="container py-5">
      <div class="test-cat-btn">
        <img src="../static/blklight-white.svg" width="40" alt="" />
      </div>
    </div>

    <div class="container py-5">
      <article
        class="card card-raised bg-polen text-dark mb-4"
        :class="[
          isDarkTheme
            ? 'border border-javascript hover-card-javascript'
            : 'border border-dark hover-card-dark',
        ]"
        style="border-left: 8px solid #121212 !important"
      >
        <div
          class="d-flex rounded-top-3 align-items-center px-3 py-3 bg-dark mb-3"
        >
          <span class="badge badge-tag bg-light text-dark" value=""
            >21 ago 2021</span
          >
          <span class="badge badge-tag bg-light text-dark" value=""
            >Full Stack</span
          >
        </div>
        <div class="d-sm-flex align-items-center px-1">
          <div class="flex-grow-1 ms-sm-3">
            <h3 class="mb-2">Ultimate Series - Javascript</h3>
            <p class="mb-1">10 de fevereiro de 2022, às 19:45</p>
            <p class="d-xl-block d-lg-block d-sm-none mb-1">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum
              quas fuga debitis, nostrum tempore aut. Quis ipsum unde, neque
              temporibus corporis qui incidunt? Beatae ullam molestiae atque
              quia! Voluptates, officiis?
            </p>
          </div>
        </div>
        <div class="d-flex align-items-center px-3 py-3">
          <NuxtLink
            to="#"
            class="btn btn-read-more-sm btn-dark text-javascript ms-auto"
          >
            Ler mais...
          </NuxtLink>
        </div>
      </article>
    </div>
    <div class="container py-5">
      <article
        class="card card-raised bg-javascript text-dark mb-4"
        :class="[
          isDarkTheme
            ? 'border border-javascript hover-card-javascript'
            : 'border border-dark hover-card-dark',
        ]"
      >
        <div class="d-flex align-items-center px-3 py-3">
          <span class="badge badge-tag bg-dark text-javascript" value=""
            >Ultimates</span
          >
          <span class="badge badge-tag bg-dark text-javascript" value=""
            >Ultimates</span
          >
          <span class="badge badge-tag bg-dark text-javascript" value=""
            >Ultimates</span
          >
        </div>
        <div class="d-sm-flex align-items-center px-1">
          <div class="flex-grow-1 ms-sm-3">
            <h4 class="font-monospace mb-2">
              <span class="marker-line py-1 bg-dark text-javascript">
                Ultimate Series - Javascript
              </span>
            </h4>
            <p class="mb-1">10 de fevereiro de 2022, às 19:45</p>
            <p class="d-xl-block d-lg-block d-sm-none mb-1">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum
              quas fuga debitis, nostrum tempore aut. Quis ipsum unde, neque
              temporibus corporis qui incidunt? Beatae ullam molestiae atque
              quia! Voluptates, officiis?
            </p>

            <p class="font-monospace mb-1">Por Ultimate</p>
          </div>
        </div>
        <div class="d-flex align-items-center px-3 py-3">
          <NuxtLink
            to="#"
            class="btn btn-read-more-sm btn-dark text-javascript ms-auto"
          >
            Ler mais...
          </NuxtLink>
        </div>
      </article>
      <article
        class="card card-raised bg-vue text-dark mb-4"
        :class="[
          isDarkTheme
            ? 'border border-vue hover-card-vue'
            : 'border border-dark hover-card-dark',
        ]"
      >
        <div class="d-flex align-items-center px-3 py-3 rounded-top">
          <span class="badge badge-tag bg-dark text-vue" value=""
            >Ultimates</span
          >
          <span class="badge badge-tag bg-dark text-vue" value=""
            >Ultimates</span
          >
          <span class="badge badge-tag bg-dark text-vue" value=""
            >Ultimates</span
          >
        </div>
        <div class="d-sm-flex align-items-center px-1">
          <div class="flex-grow-1 ms-sm-3">
            <h4 class="font-monospace mb-2">
              <span class="marker-line py-1 text-vue bg-dark">
                Ultimate Series - Vue
              </span>
            </h4>

            <p class="d-xl-block d-lg-block d-sm-none mb-1">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum
              quas fuga debitis, nostrum tempore aut. Quis ipsum unde, neque
              temporibus corporis qui incidunt? Beatae ullam molestiae atque
              quia! Voluptates, officiis?
            </p>

            <p class="font-monospace mb-1">Por Ultimate</p>
          </div>
        </div>
        <div class="d-flex align-items-center px-3 py-3">
          <NuxtLink
            to="#"
            class="btn btn-read-more-sm btn-dark text-vue ms-auto"
          >
            Ler mais...
          </NuxtLink>
        </div>
      </article>
      <article
        class="card card-raised bg-react text-dark mb-4"
        :class="[
          isDarkTheme
            ? 'border border-react hover-card-react'
            : 'border border-dark hover-card-dark',
        ]"
      >
        <div class="d-flex align-items-center px-3 py-3 rounded-top">
          <span class="badge badge-tag bg-dark text-react" value=""
            >Ultimates</span
          >
          <span class="badge badge-tag bg-dark text-react" value=""
            >Ultimates</span
          >
          <span class="badge badge-tag bg-dark text-react" value=""
            >Ultimates</span
          >
        </div>
        <div class="d-sm-flex align-items-center px-1">
          <div class="flex-grow-1 ms-sm-3">
            <h4 class="font-monospace mb-2">
              <span class="marker-line py-1 text-react bg-dark">
                Ultimate Series - React
              </span>
            </h4>

            <p class="d-xl-block d-lg-block d-sm-none mb-1">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum
              quas fuga debitis, nostrum tempore aut. Quis ipsum unde, neque
              temporibus corporis qui incidunt? Beatae ullam molestiae atque
              quia! Voluptates, officiis?
            </p>

            <p class="font-monospace mb-1">Por Ultimate</p>
          </div>
        </div>
        <div class="d-flex align-items-center px-3 py-3">
          <NuxtLink
            to="#"
            class="btn btn-read-more-sm btn-dark text-react ms-auto"
          >
            Ler mais...
          </NuxtLink>
        </div>
      </article>
      <article
        badge-tag
        class="card card-raised bg-orange text-dark mb-4"
        :class="[
          isDarkTheme
            ? 'border border-orange hover-card-orange'
            : 'border border-dark hover-card-dark',
        ]"
      >
        <div class="d-flex align-items-center px-3 py-3 rounded-top">
          <span class="badge badge-tag text-orange bg-dark" value=""
            >Ultimates</span
          >
          <span class="badge badge-tag text-orange bg-dark" value=""
            >Ultimates</span
          >
          <span class="badge badge-tag text-orange bg-dark" value=""
            >Ultimates</span
          >
        </div>
        <div class="d-sm-flex align-items-center px-1">
          <div class="flex-grow-1 ms-sm-3">
            <h4 class="font-monospace mb-2">
              <span class="marker-line py-1 text-orange bg-dark">
                Ultimate Series - CSS
              </span>
            </h4>

            <p class="d-xl-block d-lg-block d-sm-none mb-1">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum
              quas fuga debitis, nostrum tempore aut. Quis ipsum unde, neque
              temporibus corporis qui incidunt? Beatae ullam molestiae atque
              quia! Voluptates, officiis?
            </p>

            <p class="font-monospace mb-1">Por Ultimate</p>
          </div>
        </div>
        <div class="d-flex align-items-center px-3 py-3">
          <NuxtLink
            to="#"
            class="btn btn-read-more-sm btn-dark text-orange ms-auto"
          >
            Ler mais...
          </NuxtLink>
        </div>
      </article>
      <article
        class="card card-raised bg-danger text-dark mb-4"
        :class="[
          isDarkTheme
            ? 'border border-secondary hover-card-secondary'
            : 'border border-dark hover-card-dark',
        ]"
      >
        <div class="d-flex align-items-center px-3 py-3 rounded-top">
          <span class="badge badge-tag bg-dark text-danger" value=""
            >Ultimates</span
          >
          <span class="badge badge-tag bg-dark text-danger" value=""
            >Ultimates</span
          >
          <span class="badge badge-tag bg-dark text-danger" value=""
            >Ultimates</span
          >
        </div>
        <div class="d-sm-flex align-items-center px-1">
          <div class="flex-grow-1 ms-sm-3">
            <h4 class="font-monospace mb-2">
              <span class="marker-line py-1 text-danger bg-dark">
                Ultimate Series - HTML
              </span>
            </h4>

            <p class="d-xl-block d-lg-block d-sm-none mb-1">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum
              quas fuga debitis, nostrum tempore aut. Quis ipsum unde, neque
              temporibus corporis qui incidunt? Beatae ullam molestiae atque
              quia! Voluptates, officiis?
            </p>

            <p class="font-monospace mb-1">Por Ultimate</p>
          </div>
        </div>
        <div class="d-flex align-items-center px-3 py-3">
          <NuxtLink
            to="#"
            class="btn btn-read-more-sm btn-dark text-danger ms-auto"
          >
            Ler mais...
          </NuxtLink>
        </div>
      </article>
      <article
        class="card card-raised bg-polen text-dark mb-4"
        :class="[
          isDarkTheme
            ? 'border border-uv hover-card-uv'
            : 'border border-uv hover-card-uv',
        ]"
      >
        <div class="d-flex align-items-center px-3 py-3 rounded-top">
          <span class="badge badge-tag bg-light text-uv" value=""
            >Ultimates</span
          >
          <span class="badge badge-tag bg-light text-uv" value=""
            >Ultimates</span
          >
          <span class="badge badge-tag bg-light text-uv" value=""
            >Ultimates</span
          >
        </div>
        <div class="d-sm-flex align-items-center px-1">
          <div class="flex-grow-1 ms-sm-3">
            <h4 class="font-monospace mb-2">
              <span class="marker-line py-1 text-uv bg-light">
                Ultimate Series - HTML
              </span>
            </h4>

            <p class="d-xl-block d-lg-block d-sm-none mb-1">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum
              quas fuga debitis, nostrum tempore aut. Quis ipsum unde, neque
              temporibus corporis qui incidunt? Beatae ullam molestiae atque
              quia! Voluptates, officiis?
            </p>

            <p class="font-monospace mb-1">Por Ultimate</p>
          </div>
        </div>
        <div class="d-flex align-items-center px-3 py-3">
          <NuxtLink
            to="#"
            class="btn btn-read-more-sm btn-light text-uv ms-auto"
          >
            Ler mais...
          </NuxtLink>
        </div>
      </article>
      <div
        class="card card-raised card-background"
        :class="[isDarkTheme ? 'hover-card-neon-yellow' : 'hover-card-uv']"
      >
        <img
          src="https://i.imgur.com/KMN1KQ5.jpg"
          class="card-background-image card-img-border"
          alt=""
        />
        <div
          class="card-img-overlay h-100 d-flex flex-column justify-content-end"
        >
          <h3 class="mb-2">
            <span class="marker-line py-1 bg-dark text-light">
              Ultimate Series
            </span>
          </h3>
        </div>
      </div>
    </div>
    <div class="container-fluid bg-light p-5">
      <div class="py-5">
        <select id="" class="mts-form-select" name="">
          <option value="">Ultimates</option>
          <option value="">Ultimates</option>
          <option value="">Ultimates</option>
        </select>
      </div>

      <div class="py-5">
        <div class="select-container">div</div>
      </div>
    </div> -->
  </main>
</template>
<script>
import { mapGetters } from "vuex";

import Logo from "@/assets/images/ultimate-logo-red.svg";
export default {
  async asyncData({ $content, params }) {
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
      ])
      .sortBy("createdDate", "desc")
      .where({
        type: "normal",
        isPublished: true,
        channel: { $ne: "Jobs" },
      })
      .fetch();
    // console.log(articles);
    return { articles };
  },
  data() {
    return {
      isShowEffect: false,
      steps: ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5", "Step 6"],
      logo: Logo,
      text: "",
      parents: [
        {
          id: 1,
          title: "All",
          tagsId: [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20,
          ],
        },
        {
          id: 2,
          title: "Basics",
          tagsId: [1, 2],
        },
        {
          id: 3,
          title: "Front-end Frameworks",
          tagsId: [3, 4, 5, 6],
        },
        {
          id: 4,
          title: "Back-end Frameworks",
          tagsId: [7, 8, 9, 10, 11],
        },
        {
          id: 5,
          title: "Startups Ideas",
          tagsId: [],
        },
        {
          id: 6,
          title: "Databases",
          tagsId: [12, 13, 14, 15, 16, 17, 18],
        },
        {
          id: 7,
          title: "CMS",
          tagsId: [19, 20, 21],
        },
        {
          id: 8,
          title: "Games",
          tagsId: [],
        },
        {
          id: 9,
          title: "Games",
          tagsId: [],
        },
        {
          id: 10,
          title: "APIs",
          tagsId: [],
        },
        {
          id: 11,
          title: "Crypto, NFT & Metaverse",
          tagsId: [],
        },
        {
          id: 12,
          title: "Social",
          tagsId: [],
        },
        {
          id: 13,
          title: "Payment",
          tagsId: [],
        },
        {
          id: 14,
          title: "Authentication",
          tagsId: [],
        },
      ],
      templateChildrens: [
        {
          id: 1,
          title: "Portfolio",
        },
        {
          id: 2,
          title: "Blog",
        },
        {
          id: 3,
          title: "React",
        },
        {
          id: 4,
          title: "Angular",
        },
        {
          id: 5,
          title: "Vue",
        },
        {
          id: 6,
          title: "Svelte",
        },
        {
          id: 7,
          title: "Next.JS",
        },
        {
          id: 8,
          title: "Nuxt",
        },
        {
          id: 9,
          title: "Gatsby",
        },
        {
          id: 10,
          title: "Express",
        },
        {
          id: 11,
          title: "Fastify",
        },
        {
          id: 12,
          title: "Fauna",
        },
        {
          id: 13,
          title: "Upstash",
        },
        {
          id: 14,
          title: "Prisma",
        },
        {
          id: 15,
          title: "PlanetScale",
        },
        {
          id: 16,
          title: "MySQL",
        },
        {
          id: 17,
          title: "PostgreSQL",
        },
        {
          id: 18,
          title: "MongoDB",
        },
        {
          id: 19,
          title: "DatoCMS",
        },
        {
          id: 20,
          title: "Sanity.io",
        },
        {
          id: 21,
          title: "Forestry",
        },
      ],
      childrens: [],
      tags: [],
      defaultParent: {
        id: 1,
        title: "All",
        tagsId: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        ],
      },
      activeParent: {
        id: null,
        title: "",
        tagsId: [],
      },
      activeTags: [],
      test: "",
    };
  },
  computed: {
    ...mapGetters(["isDarkTheme"]),
  },
  mounted() {
    this.activeParent = {
      ...this.defaultParent,
    };
    this.showChildrenByParent(this.activeParent);
    this.updateLoading(this.steps);
  },
  methods: {
    updateLoading(array) {
      for (let i = 0; i < array.length; i++) {
        setTimeout(() => {
          this.isShowEffect = false;
          console.log("start", this.isShowEffect);
          const element = array[i];
          this.isShowEffect = true;
          this.text = element;
          console.log(element, this.isShowEffect);
          // this.isShowEffect = undefined;
          // console.log("end", this.isShowEffect);

          if (i !== array.length - 1) {
            setTimeout(() => {
              console.time();
              this.isShowEffect = undefined;
              console.log("end", this.isShowEffect);
              console.timeEnd();
            }, 3000);
          }
        }, i * 4000);
      }
      // setTimeout(() => {
      //   this.classEffect = "fade-in-bottom";
      //   this.text = text;
      // });
    },

    toggleParent(parent) {
      const isActive = this.activeParent.id === parent.id; // true or false
      if (isActive) {
        this.activeParent = {
          ...this.defaultParent,
        };
        this.showChildrenByParent(this.activeParent);
        return;
      }
      this.activeParent = {
        id: parent.id,
        title: parent.title,
        tagsId: [...parent.tagsId],
      };
      this.showChildrenByParent(parent);
    },
    toggleChildren(children) {
      const isActive = this.activeTags.find((obj) => obj.id === children.id);
      if (isActive) {
        const index = this.activeTags.findIndex(
          (obj) => obj.id === children.id
        );
        if (index > -1) {
          this.activeTags.splice(index, 1);
        }
        return;
      }
      this.activeTags.push(children);
    },
    showChildrenByParent(parent) {
      const tagsForShow = this.templateChildrens
        .filter((obj) => parent.tagsId.includes(obj.id))
        .map((obj) => ({
          ...obj,
        }));
      this.tags = [];
      for (let i = 0; i < tagsForShow.length; i++) {
        this.tags.push(tagsForShow[i]);
      }
    },
    checkChildrenByParents(parent) {
      const isActive = this.activeTags.find(
        (obj) => obj.parentId === parent.id
      ); // true or false
      if (isActive) {
        const uncheck = this.activeTags
          .filter((obj) => obj.parentId === parent.id)
          .map((obj) => ({
            ...obj,
          }));
        console.log(JSON.stringify(uncheck));
        debugger;
        for (let i = 0; i < uncheck.length; i++) {
          const element = uncheck[i];
          console.log(element);
          debugger;
          const index = this.activeTags.findIndex(
            (obj) => obj.id === element.id
          );
          if (index > -1) {
            this.activeTags.splice(index, 1);
            this.tags.splice(index, 1);
          }
        }
        debugger;
        return;
      }
      const mappedTags = this.templateChildrens
        .filter((obj) => obj.parentId === parent.id)
        .map((obj) => ({
          ...obj,
        }));
      for (let i = mappedTags.length - 1; i >= 0; i--) {
        const element = mappedTags[i];
        this.toggleChildren(element);
        const filter = this.tags.find((obj) => obj.id === element.id);
        const isTrue = filter;
        if (!isTrue) {
          this.tags.unshift(element);
        }
      }
      this.filterDuplicates();
    },
    filterDuplicates() {
      this.activeParent = Array.from(
        new Set(this.activeParent.map((obj) => obj.id))
      ).map((id) => {
        return this.activeParent.find((e) => e.id === id);
      });
      this.activeTags = Array.from(
        new Set(this.activeTags.map((obj) => obj.id))
      ).map((id) => {
        return this.activeTags.find((e) => e.id === id);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,700;1,400;1,700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,400;1,700&display=swap");
*,
::before,
::after {
  box-sizing: inherit;
}

body {
  text-rendering: optimizeLegibility;
  color: rgba(0, 0, 0, 0.8);
  font-weight: 400;
  font-family: "Inter", sans-serif;
}

.first {
  display: block;
  background-color: #ebebeb;
}

.second {
  max-width: 1600px;
  margin: auto;
}

.third {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.element-left {
  background-color: transparent;
  width: 80px;
  min-height: 80vh;
  flex-shrink: 1;
  border: 2px solid #121212;
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;

  nav {
    height: 100%;
  }

  &-block {
    display: block;
  }
  &-content {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    top: 0;
    position: sticky;
    z-index: 10;
    height: 100%;
  }

  &-brand {
    padding: 2rem 0;
    text-align: center;
  }

  &-links {
    padding-bottom: 2rem;
  }
}

.element-footer {
  display: block;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 500;

  &-block {
    display: block;
  }

  &-content {
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    height: 60px;
    position: relative;
    background-color: #fff6dd;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 10px;
    z-index: 600;
  }
  &-container {
    height: 100%;
    display: flex;
    justify-content: space-between;
  }

  &-items {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1 1 0%;
  }
}

.header-overflow {
  width: 100%;
  height: auto;
  position: relative;

  &-background {
    background-image: url("https://i.imgur.com/KMN1KQ5.jpg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 500px;
  }

  &-content {
    display: grid;
    grid-template-columns: 1fr 10px 750px 10px 1fr;
    grid-template-areas: ". . Info . .";

    &-info {
      border-top-left-radius: 0.5rem;
      border-top-right-radius: 0.5rem;
      background-color: #eaeaea;
      grid-area: Info;
      padding: 1.25rem 10px;
      margin-top: -150px;
    }
  }
}
</style>
<style lang="scss" scoped>
$mts-form-select-padding: 0.5rem 0.75rem * 3 0.5rem 0.75rem;
$mts-form-select-bg: #ffffff;
$mts-form-select-border: 1px solid #ffffff;
$mts-form-select-border-radius: 8px;

.mts-form-select {
  display: block;
  width: 100%;
  min-width: 150px;
  color: blue;
  padding: $mts-form-select-padding;
  background-color: $mts-form-select-bg;
  border: $mts-form-select-border;
  border-radius: $mts-form-select-border-radius;

  &:focus {
    outline: 0;
  }
  > option {
    padding: 8px 4px !important;
    font-weight: bold;
  }
}

.spin-right {
  animation-name: spin;
  animation-duration: 5000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  transform-origin: 50% 50%;
}

.spin-left {
  animation-name: spin;
  animation-duration: 5000ms;
  animation-direction: reverse;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  transform-origin: 50% 50%;
}

@-ms-keyframes spin {
  from {
    -ms-transform: rotate(0deg);
  }
  to {
    -ms-transform: rotate(360deg);
  }
}

@-moz-keyframes spin {
  from {
    -moz-transform: rotate(0deg);
  }
  to {
    -moz-transform: rotate(360deg);
  }
}

@-webkit-keyframes spin {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.rect-test {
  /* transform: rotate(45deg) rotate(-45deg); */
  transform: rotate(90deg) translate(0, -100%)
    /* go from bottom right to top right */ rotate(90deg) translate(0, 100%);
  /* doesn't work as intended in Firefox
   * % values are taken relative to the SVG, not the element
   * which actually seems to be correct */
  transform-origin: 50% 50%;
}

.mask-svg-test svg g path {
  fill: linear-gradient(
    90deg,
    rgba(244, 205, 59, 1) 0%,
    rgba(241, 102, 34, 1) 54%,
    rgba(232, 72, 86, 1) 100%
  );
  /* background: linear-gradient(
    90deg,
    rgba(244, 205, 59, 1) 0%,
    rgba(241, 102, 34, 1) 54%,
    rgba(232, 72, 86, 1) 100%
  );
  mask-image: linear-gradient(
    90deg,
    rgba(244, 205, 59, 1) 0%,
    rgba(241, 102, 34, 1) 54%,
    rgba(232, 72, 86, 1) 100%
  ); */
}
</style>
<style>
.test-cat-btn {
  width: 64px;
  height: 64px;
  background-color: #480bff;
  color: #eaeaea;
  vertical-align: middle;
  padding: 12px 12px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
}
.bohr {
  background: rgb(244, 204, 58);
  background: linear-gradient(
    180deg,
    rgba(244, 204, 58, 1) 0%,
    rgba(242, 100, 25, 1) 50%,
    rgba(232, 72, 85, 1) 100%
  );
}

.basics {
  background: rgb(227, 233, 236);
  background: linear-gradient(
    180deg,
    rgba(227, 233, 236, 1) 0%,
    rgba(194, 206, 213, 1) 100%
  );
}

.api {
  background: rgb(245, 126, 142);
  background: linear-gradient(
    180deg,
    rgba(245, 126, 142, 1) 0%,
    rgba(232, 72, 85, 1) 100%
  );
}

.authentication {
  background: rgb(213, 139, 240);
  background: linear-gradient(
    180deg,
    rgba(213, 139, 240, 1) 0%,
    rgba(170, 83, 221, 1) 100%
  );
}

.backend {
  background: rgb(102, 149, 171);
  background: linear-gradient(
    180deg,
    rgba(102, 149, 171, 1) 0%,
    rgba(54, 92, 115, 1) 100%
  );
}

.cms {
  background: rgb(219, 157, 64);
  background: linear-gradient(
    180deg,
    rgba(219, 157, 64, 1) 0%,
    rgba(181, 100, 30, 1) 100%
  );
}

.crypto {
  background: rgb(250, 232, 108);
  background: linear-gradient(
    180deg,
    rgba(250, 232, 108, 1) 0%,
    rgba(244, 204, 58, 1) 100%
  );
}

.databases {
  background: rgb(251, 215, 89);
  background: linear-gradient(
    180deg,
    rgba(251, 215, 89, 1) 0%,
    rgba(246, 174, 45, 1) 100%
  );
}

.frontend {
  background: rgb(142, 240, 242);
  background: linear-gradient(
    180deg,
    rgba(142, 240, 242, 1) 0%,
    rgba(85, 221, 224, 1) 100%
  );
}

.games {
  background: rgb(253, 183, 239);
  background: linear-gradient(
    180deg,
    rgba(253, 183, 239, 1) 0%,
    rgba(249, 128, 218, 1) 100%
  );
}

.payment {
  background: rgb(139, 240, 165);
  background: linear-gradient(
    180deg,
    rgba(139, 240, 165, 1) 0%,
    rgba(83, 221, 108, 1) 100%
  );
}

.social {
  background: rgb(139, 178, 240);
  background: linear-gradient(
    180deg,
    rgba(139, 178, 240, 1) 0%,
    rgba(83, 122, 221, 1) 100%
  );
}

.startups {
  background: rgb(139, 208, 157);
  background: linear-gradient(
    180deg,
    rgba(139, 208, 157, 1) 0%,
    rgba(83, 163, 100, 1) 100%
  );
}
</style>

<style scoped>
.fade-in-bottom {
  -webkit-animation: fade-in-bottom 0.6s cubic-bezier(0.39, 0.575, 0.565, 1)
    both;
  animation: fade-in-bottom 0.6s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}

@-webkit-keyframes fade-in-bottom {
  0% {
    -webkit-transform: translateY(50px);
    transform: translateY(50px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes fade-in-bottom {
  0% {
    -webkit-transform: translateY(50px);
    transform: translateY(50px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
}
.fade-out-top {
  -webkit-animation: fade-out-top 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: fade-out-top 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

@-webkit-keyframes fade-out-top {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateY(-50px);
    transform: translateY(-50px);
    opacity: 0;
  }
}
@keyframes fade-out-top {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateY(-50px);
    transform: translateY(-50px);
    opacity: 0;
  }
}
</style>
