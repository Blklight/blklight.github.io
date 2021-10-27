<template>
  <div
    id="sidebar"
    class=""
    :class="[switchSidebar, isDarkTheme ? 'bg-darkest' : 'bg-dark']"
  >
    <div class="brand-header">
      <ChannelButton is-home />
      <button
        type="button"
        class="btn btn-dark close"
        @click.prevent="sidebarSwitch"
      >
        <font-awesome-icon :icon="['fas', 'chevron-left']" size="2x" />
      </button>
    </div>

    <div v-for="(channel, i) in channels" :key="i">
      <ChannelButton :channel="channel" />
    </div>

    <!-- <ChannelButton v-for="servers in 18" :key="servers.id" /> -->
    <!-- <div class="separator"></div> -->
  </div>
</template>
<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  props: {
    channels: {
      type: Array,
      default: null,
    },
  },

  data() {
    return {
      windowWidth: 0,
    };
  },

  computed: {
    ...mapGetters(["isDarkTheme", "isSidebarOpen"]),
    switchSidebar() {
      let sidebarClass = "";
      const sidebarOpen = this.isSidebarOpen;
      if (this.windowWidth <= 576) {
        if (sidebarOpen) {
          sidebarClass = "slide-in-left";
        } else {
          sidebarClass = "slide-out-left";
        }
      } else {
        if (sidebarOpen) {
          this.$store.commit("sidebarSwitch", false);
        }
        sidebarClass = "";
      }
      return sidebarClass;
    },
  },

  created() {},

  mounted() {
    window.addEventListener("resize", this.getWidth);
    this.getWidth();
  },

  destroyed() {
    window.removeEventListener("resize", this.getWidth);
  },

  methods: {
    ...mapMutations({
      darkTheme: "darkTheme",
      sidebarSwitch: "sidebarSwitch",
    }),

    getWidth() {
      this.windowWidth = window.innerWidth;
    },
  },
};
</script>
<style lang="scss">
#sidebar {
  border-right: 1px solid #121212;
  width: 80px;
  padding: 0 0.25rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1001;
  // background-color: #0d40e9;
  //background-color: #f85b1a;
  background-color: #000000;
  height: 100vh;
  overflow-y: scroll;
  box-shadow: 0px 0px 8px 0px rgba(18, 18, 18, 0.75);
  // -webkit-box-shadow: 0px 0px 8px 0px rgba(18, 18, 18, 0.75);
  // -moz-box-shadow: 0px 0px 8px 0px rgba(18, 18, 18, 0.75);
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  .brand-header {
    position: sticky;
    top: 0;
    z-index: 1020;
    //background-color: #f85b1a;
    background-color: #000000;

    padding: 0.5rem 0.75rem 0.5rem;

    .close {
      display: none;
    }
  }

  .scroller {
    overflow-y: scroll;
    z-index: 1000;
    padding: 0.5rem;
    height: 100%;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}

@media screen and (max-width: 576px) {
  #sidebar {
    position: absolute;
    width: 100%;
    padding: 0 2rem 0.5rem;
    // align-items: ;
    display: block;
    .brand-header {
      .close {
        display: block;
        position: absolute;
        z-index: 1025;
        margin: 0.5rem 0;
        top: 0;
        right: 0;
        line-height: 1;
      }
    }
  }
}
</style>
