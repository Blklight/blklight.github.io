<template>
  <main :class="isDarkTheme ? 'text-light bg-dark' : ''">
    <div class="main-container">
      <div class="main-flex-layout">
        <FlexSidebar />
        <div class="main-content">
          <Nuxt />
          <!-- <Footer /> -->
          <ColorFilters />
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  data() {
    return {
      data: [],
    }
  },

  // async fetch() {
  //   this.data = await this.$content("channels").fetch();
  // },

  computed: {
    ...mapGetters(['isDarkTheme', 'isSidebarOpen']),
  },

  methods: {
    ...mapMutations({
      darkTheme: 'darkTheme',
      sidebarSwitch: 'sidebarSwitch',
    }),
  },
}
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
    'Toolbar Toolbar Toolbar'
    'Content Content Content '
    'Content Content Content '
    'Content Content Content '
    'Footer Footer Footer ';
  height: 100vh;
}

.head-toolbar {
  grid-area: Toolbar;
  z-index: 50;
}
/*
.content {
  grid-area: Content;
  max-width: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
} */

.footer {
  grid-area: Footer;
  max-width: 100%;
  padding: 1rem 1.5rem 1rem;
  margin-top: auto;
  min-height: 250px;
}
</style>
