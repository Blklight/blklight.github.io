<template>
  <footer class="footer" :class="!isDarkTheme ? 'text-dark bg-light' : ''">
    <div class="container-lg">
      <template v-if="isDarkTheme">
        <img
          src="../static/blklight-white.svg"
          title="Ultimate Mercer"
          width="60"
          class="mx-auto d-block"
        />
      </template>
      <template v-else>
        <img
          src="../static/blklight-black.svg"
          title="Ultimate Mercer"
          width="60"
          class="mx-auto d-block"
        />
      </template>
      <div class="d-md-flex justify-content-between">
        <div class="">
          <h4 class="mb-3" :class="isDarkTheme ? 'text-light' : 'text-dark'">
            <strong><em> Redes sociais </em></strong>
          </h4>
          <div class="mt-2 mb-4">
            <a
              href="https://www.twitch.tv/TeamBlklight"
              target="_blank"
              rel="noopener"
              title="Acesse a Twitch"
              class="btn btn-uv btn-read-more"
            >
              <font-awesome-icon :icon="['fab', 'twitch']" size="lg" />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener"
              title="Acesse a Twitch"
              class="btn btn-uv btn-read-more"
            >
              <font-awesome-icon :icon="['fab', 'facebook-f']" size="lg" />
            </a>
          </div>
        </div>
        <div>
          <h4 class="mb-3" :class="isDarkTheme ? 'text-light' : 'text-dark'">
            <strong><em> Sobre </em></strong>
          </h4>
          <ul class="list-unstyled">
            <li>
              <NuxtLink
                to="/about/idea"
                :class="isDarkTheme ? 'text-light' : 'text-dark'"
              >
                Idea
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/about/team"
                :class="isDarkTheme ? 'text-light' : 'text-dark'"
              >
                Team
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["isDarkTheme"]),
  },
};
</script>
