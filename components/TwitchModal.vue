<template>
  <div class="twitch-modal" :style="open ? 'display: block;' : 'display: none'">
    <div class="twitch-modal-content">
      <div class="twitch-modal-content-header">
        <h3 class="text-right"><strong> Streamer parceiro</strong></h3>
        <span class="close" @click="open = !open" style="margin-left: auto"
          >&times;</span
        >
      </div>

      <div class="twitch-grid-container">
        <div class="twitch-video">
          <iframe
            class="twitch-iframe-video"
            src="https://player.twitch.tv/?channel=teamblklight&parent=blklight.github.io&muted=true&layout=video-with-chat"
            frameborder="0"
            muted="true"
            allowfullscreen="true"
          >
          </iframe>
        </div>
        <div class="twitch-chat">
          <iframe
            class="twitch-iframe-chat"
            src="https://www.twitch.tv/embed/teamblklight/chat?parent=blklight.github.io"
            frameborder="0"
          >
          </iframe>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      open: true,
    };
  },
};
</script>
<style lang="scss" scoped>
$orange: #f29c12;

.twitch-modal {
  display: none;
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  //overflow: hidden;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-animation-name: fadeIn;
  -webkit-animation-duration: 0.4s;
  animation-name: fadeIn;
  animation-duration: 0.4s;
}

.twitch-modal-body {
  background-color: rgba(25, 25, 25, 0.9);
  display: flex;
  margin: 7.5% auto;
  border-radius: 12px;
  width: 60%;
  padding: 0.5rem;
  font-family: "Neo Sans", sans-serif;
  -webkit-animation-name: fadeIn;
  -webkit-animation-duration: 0.4s;
  animation-name: fadeIn;
  animation-duration: 0.4s;
}

.twitch-modal-content {
  margin: 2.5% auto;
  width: 75%;
  -webkit-animation-name: fadeIn;
  -webkit-animation-duration: 0.4s;
  animation-name: fadeIn;
  animation-duration: 0.4s;
  &-header {
    width: 100%;
    margin: 0.5rem 0;
    color: #fff;
    display: flex;
  }
}

.twitch-grid-container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-template-areas: "twitch-video twitch-chat";
}

.twitch-iframe {
  &-video {
    width: 100%;
    height: 500px;
  }
  &-chat {
    width: 100%;
    height: 500px;
  }
}

@media screen and (max-width: 1024px) {
  .twitch-grid-container {
    width: 100%;
    max-width: 100%;
    grid-template-columns: 100%;
    gap: 0px 0px;
    grid-template-areas: "twitch-video" "twitch-chat";
  }

  .twitch-iframe {
    &-video {
      width: 100%;
      height: 400px;
      margin-bottom: 0;
    }
    &-chat {
      width: 100%;
      height: 200px;
      margin-top: 0;
    }
  }
}

@media screen and (max-width: 360px) {
  .twitch-iframe {
    &-video {
      width: 100%;
      height: 400px;
      margin-bottom: 0;
    }
    &-chat {
      display: none;
    }
  }
}

.close {
  color: #aaa;
  float: right;
  font-size: 40px;
  font-weight: bold;
  margin: 0 0.125rem;

  &.close-tooltip {
    float: none;
    right: 0;
    position: absolute;
    margin: -0.5rem 0;
  }

  &:hover,
  &:focus {
    color: $orange;
    text-decoration: none;
    cursor: pointer;
  }
}
</style>
