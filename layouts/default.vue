<template>
  <main class="main-layout">
    <!-- <Sidebar :channels="data" /> -->
    <div class="main-grid">
      <div
        class="head-toolbar"
        :class="!isDarkTheme ? 'text-dark bg-light' : ''"
      >
        <div class="d-flex align-middle py-2 px-md-4 px-2">
          <nuxt-link to="/" class="d-flex text-center px-2">
            <template v-if="isDarkTheme">
              <img
                src="../static/blklight-white.svg"
                title="Ultimate Mercer"
                width="45"
                class="mx-auto d-block"
              />
            </template>
            <template v-else>
              <img
                src="../static/blklight-black.svg"
                title="Ultimate Mercer"
                width="45"
                class="mx-auto d-block"
              />
            </template>
          </nuxt-link>
          <!-- <div class="d-flex d-sm-none d-md-none d-xl-none d-xxl-none ms-2">
            <button
              type="button"
              class="btn"
              :class="isDarkTheme ? 'btn-outline-light' : 'btn-outline-dark'"
              @click.prevent="sidebarSwitch"
            >
              <font-awesome-icon :icon="['fas', 'bars']" size="lg" />
            </button>
          </div> -->

          <div class="ms-auto">
            <!-- <NuxtLink
              to="/search"
              class="btn ml-auto"
              :class="isDarkTheme ? 'btn-outline-light' : 'btn-outline-dark'"
            >
              <font-awesome-icon :icon="['fas', 'search']" />
            </NuxtLink> -->
            <span
              class="badge bg-uv text-light border border-dark font-monospace"
            >
              Alpha v0.0.1
            </span>

            <button
              class="btn ml-auto"
              :class="isDarkTheme ? 'btn-outline-light' : 'btn-outline-dark'"
              @click.prevent="darkTheme"
            >
              <font-awesome-icon :icon="['fas', 'adjust']" />
            </button>
            <UserSettings />
          </div>
        </div>
      </div>
      <div class="content" :class="!isDarkTheme ? 'text-dark bg-light' : ''">
        <Nuxt />
        <Footer />
        <ColorFilters />
      </div>
    </div>
  </main>
</template>
<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
      data: [],
    };
  },

  // async fetch() {
  //   this.data = await this.$content("channels").fetch();
  // },

  computed: {
    ...mapGetters(["isDarkTheme", "isSidebarOpen"]),
  },

  methods: {
    ...mapMutations({
      darkTheme: "darkTheme",
      sidebarSwitch: "sidebarSwitch",
    }),
  },
};
</script>
<style lang="scss">
.bar-test {
  display: flex;
  max-width: 100%;
}

.main-grid {
  flex: 1;
  display: grid;
  grid-template-columns: auto auto auto;
  grid-template-rows: 60px auto;
  grid-template-areas:
    "Toolbar Toolbar Toolbar"
    "Content Content Content "
    "Content Content Content "
    "Content Content Content "
    "Footer Footer Footer ";
  height: 100vh;
}

.head-toolbar {
  grid-area: Toolbar;
  z-index: 50;
}

.content {
  grid-area: Content;
  max-width: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.footer {
  grid-area: Footer;
  max-width: 100%;
  padding: 1rem 1.5rem 1rem;
  margin-top: auto;
  min-height: 250px;
}
</style>
