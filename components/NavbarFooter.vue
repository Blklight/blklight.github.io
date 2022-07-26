<template>
  <div>
    <nav class="navbar-footer">
      <div
        class="navbar-footer-content border"
        :class="isDarkTheme ? 'bg-dark border-light' : 'bg-light border-dark'"
      >
        <div class="navbar-footer-container">
          <div class="navbar-footer-items">
            <nuxt-link to="/">
              <template v-if="isDarkTheme">
                <img
                  src="../static/blklight-white.svg"
                  title="Ultimate Mercer"
                  width="50"
                  class="mx-auto d-block"
                />
              </template>
              <template v-else>
                <img
                  src="../static/blklight-black.svg"
                  title="Ultimate Mercer"
                  width="50"
                  class="mx-auto d-block"
                />
              </template>
            </nuxt-link>
          </div>
          <div class="navbar-footer-items">
            <!-- <button
              class="btn rounded-circle"
              :class="isDarkTheme ? 'btn-outline-light' : 'btn-outline-dark'"
              style="width: 40px; height: 40px; padding: 8px"
              @click.prevent="sidebarSwitch"
            >
              <font-awesome-icon :icon="['fas', 'bars']" />
            </button> -->
          </div>
          <div class="navbar-footer-items">
            <a
              href="#"
              class="btn rounded-circle"
              :class="isDarkTheme ? 'btn-outline-light' : 'btn-outline-dark'"
              style="width: 40px; height: 40px; padding: 8px"
              @click.prevent="darkTheme"
            >
              <font-awesome-icon :icon="['fas', 'adjust']" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from "vuex";
import UMThumb from "@/assets/images/thumbs/ultimate-mercer-thumbs.jpg";
import UMProThumb from "@/assets/images/thumbs/ultimate-mercer-pro-thumbs.jpg";
import DevThumb from "@/assets/images/thumbs/blklight-thumbs.jpg";
export default {
  data() {
    return {
      skillThumb: UMThumb,
      proThumb: UMProThumb,
      devThumb: DevThumb,
      artThumb: UMThumb,
    };
  },
  computed: {
    ...mapGetters(["isDarkTheme"]),
  },

  mounted() {
    console.log(this.isSidebarOpen);
  },

  updated() {
    console.log(this.isSidebarOpen);
  },

  methods: {
    ...mapMutations({
      darkTheme: "darkTheme",
      // sidebarSwitch: "sidebarSwitch",
    }),
  },
};
</script>
<style lang="scss">
.navbar-footer {
  display: none;
}

@media screen and (max-width: 768px) {
  .navbar-footer {
    display: block;
    position: fixed;
    left: 16px;
    right: 16px;
    bottom: 8px;
    z-index: 500;

    &-block {
      display: block;
    }

    &-content {
      height: 64px;
      position: relative;
      /* background-color: #fff6dd; */
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
}
</style>
