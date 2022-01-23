<template>
  <div class="flex-sidebar">
    <nav>
      <div class="flex-sidebar-container">
        <div class="flex-sidebar-content">
          <div class="flex-sidebar-brand">
            <nuxt-link to="/">
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
          </div>
          <div class="d-block">
            <div class="flex-sidebar-items">
              <NuxtLink
                to="/search"
                class="btn btn-flat mx-auto d-block"
                :class="isDarkTheme ? 'btn-outline-light' : 'btn-outline-dark'"
              >
                <font-awesome-icon :icon="['fas', 'search']" />
              </NuxtLink>
            </div>
            <div class="flex-sidebar-items"></div>
          </div>
          <div class="d-block">
            <div class="flex-sidebar-items">
              <a
                href="#"
                class="btn btn-flat mx-auto d-block"
                :class="isDarkTheme ? 'btn-outline-light' : 'btn-outline-dark'"
                @click.prevent="darkTheme"
              >
                <font-awesome-icon :icon="['fas', 'adjust']" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
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
.flex-sidebar {
  background-color: transparent;
  width: 80px;
  min-height: 100vh;
  flex-shrink: 1;
  border-right: 1px solid #ced4da;
  height: 100vh;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-self: flex-start;
  top: 0;
  position: sticky;
  z-index: 1;

  nav {
    height: 100%;
  }

  &-container {
    display: block;
    height: 100%;
  }

  &-content {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    height: 100vh;
  }

  &-brand {
    padding: 2rem 0;
    text-align: center;
  }

  &-items {
    padding-bottom: 2rem;
  }
}

@media screen and (max-width: 768px) {
  .flex-sidebar {
    display: none;
  }
}
</style>
