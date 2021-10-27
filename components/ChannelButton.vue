<template>
  <div>
    <nuxt-link v-if="isHome" to="/" class="channelbutton channelbutton-brand">
      <img
        src="../static/blklight-white.svg"
        class="brand"
        title="Ultimate Mercer"
      />
      <!-- <div class="mentions" v-if="mentions">{{ mentions }}</div> -->
    </nuxt-link>
    <nuxt-link v-else :to="{ name: null }" class="channelbutton">
      <img v-lazy="thumbSrc" class="channelbutton-img" :title="channel.name" />
      <div class="overlay">
        <div class="h-100 d-flex justify-content-center align-items-center">
          <p class="font-monospace mb-0">
            <span class="text-light bg-dark px-2 py-1">
              <strong>
                <em>
                  <i class="marker-line">{{ channel.name }}</i>
                </em>
              </strong>
            </span>
          </p>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    channel: {
      type: Object,
      default: null,
    },
    selected: {
      type: Boolean,
      default: null,
    },
    isHome: {
      type: Boolean,
      default: null,
    },
    hasNotification: {
      type: Boolean,
      default: null,
    },
    mentions: {
      type: Number,
      default: null,
    },
  },

  computed: {
    ...mapGetters(["isDarkTheme"]),

    constructslug() {
      const slug = `${this.channel.slug}/`;
      return slug;
    },

    thumbSrc() {
      if (
        this.channel.cover.startsWith("http") ||
        this.channel.cover.startsWith("https")
      ) {
        return this.channel.cover;
      } else {
        return require(`~/assets/images/thumbs/blklight-thumbs.jpg`);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.brand {
  // background-color: #121212;
  width: 60px !important;
  height: 60px !important;
  // object-fit: cover;
  border-radius: 50%;
  // &.active,
  // &:hover {
  //   border-radius: 0.25rem;
  //   b;order: 2px solid #121212;
  // }
}

.channel-img {
  // background-color: #121212;
  width: 60px !important;
  height: 60px !important;
  object-fit: cover;

  /* &.active,
  &:hover {
    //border-radius: 0.5rem;
  } */
}

.channelbutton {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  margin-top: 8px;
  margin-bottom: 8px;
  // background-color: #eaeaea;
  cursor: pointer;
  position: relative;
  border-radius: 50%;
  transition: all 0.3s;

  &-img {
    width: 60px !important;
    height: 60px !important;
    object-fit: cover;
    border-radius: 50%;
    border: 1px solid #121212;

    &.active,
    &:hover {
      transition: all ease-out 0.2s;
      border-radius: 0.5rem;
      border: 1px solid #121212;
      transition: all ease-out 0.2s;
    }
  }

  &.active,
  &:hover {
    transition: all ease-out 0.2s;
    border-radius: 0.5rem;
  }

  transition: all ease-out 0.2s;
  .overlay {
    display: none;
  }
  .mentions {
    background-color: #ffff00;
    width: auto;
    // height: 24px;
    padding: 0 4px;
    position: absolute;
    bottom: -4px;
    right: -4px;
    border-radius: 12px;
    border: solid 2px #121212;
    text-align: right;
    font-family: monospace;
    font-size: 12px;
    font-weight: bold;
    color: #121212;
  }
}

.channelbutton-brand {
  // background-color: var(--rocketseat);

  &.active,
  &:hover {
    transition: all ease-out 0.2s;
    border: none;
    border-radius: 50%;
  }
}

.channelbutton-hasNotification {
  &::before {
    width: 10px;
    height: 10px;
    background-color: #ffff00;
    position: absolute;
    left: -16px;
    top: calc(50% - 4.5px);
    border-radius: 50%;
    content: "";

    display: block;
  }
}

@media screen and (max-width: 576px) {
  .brand {
    // background-color: #121212;
    width: 75px !important;
    height: 75px !important;
    // object-fit: cover;
    border-radius: 50%;
    // &.active,
    // &:hover {
    //   border-radius: 0.25rem;
    //   b;order: 2px solid #121212;
    // }
  }
  .channelbutton {
    position: relative;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    //justify-content: center;
    width: 100%;
    height: 75px;
    margin: 8px 0 16px;
    padding: 8px;
    // background-color: #eaeaea;
    cursor: pointer;
    position: relative;
    border-radius: 10rem;
    transition: all 0.3s;

    &-img {
      width: 100% !important;
      height: 75px !important;
      object-fit: cover;
      border-radius: 10rem;
      border: 1px solid #121212;

      &.active,
      &:hover {
        transition: all ease-out 0.2s;
        border-radius: 0.25rem;
        border: 1px solid #121212;
      }
    }

    &.active,
    &:hover {
      transition: all ease-out 0.2s;
      border-radius: 0.25rem;
    }

    transition: all ease-out 0.2s;

    .overlay {
      // z-index: 1001;
      position: absolute;
      // top: 0;
      // right: 0;
      // bottom: 0;
      // left: 0;
      display: block;
    }
    .mentions {
      background-color: #ffff00;
      width: auto;
      // height: 24px;
      padding: 0 4px;
      position: absolute;
      bottom: -4px;
      right: -4px;
      border-radius: 12px;
      border: solid 2px #121212;
      text-align: right;
      font-family: monospace;
      font-size: 12px;
      font-weight: bold;
      color: #121212;
    }
  }
}
</style>
