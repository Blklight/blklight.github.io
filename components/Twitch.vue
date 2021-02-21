<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-9 col-md-8 col-12 px-md-0">
        <iframe
          class="twitch-iframe-video"
          src="https://player.twitch.tv/?channel=teamblklight&parent=blklight.github.io&muted=true&layout=video-with-chat"
          frameborder="0"
          muted="true"
          allowfullscreen="true"
        >
        </iframe>
      </div>
      <div class="col-lg-3 col-md-4 col-12 px-md-0">
        <iframe
          class="twitch-iframe-chat"
          src="https://www.twitch.tv/embed/teamblklight/chat?parent=blklight.github.io"
          frameborder="0"
        >
        </iframe>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
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
    height: 600px;
  }
  &-chat {
    width: 100%;
    height: 600px;
  }
}

@media screen and (max-width: 768px) {
  .twitch-iframe {
    &-video {
      width: 100%;
      height: 400px;
    }
    &-chat {
      width: 100%;
      height: 250px;
    }
  }
}
</style>
