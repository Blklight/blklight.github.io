<template>
  <footer class="mt-auto">
    <div
      class="container-fluid"
      :class="isDarkMode ? 'bg-dark text-light' : 'bg-polen text-dark'"
    >
      <div class="col-xl-10 col-12 offset-xl-1 offset-0 px-xl-0 px-2 py-5">
        <article>
          <img
            v-if="isDarkMode"
            src="~/static/blklight-base-w.svg"
            width="125"
            class="mx-auto d-block mb-4"
            alt=""
          />
          <img
            v-else
            src="~/static/blklight-base.svg"
            width="125"
            class="mx-auto d-block mb-4"
            alt=""
          />
          <div class="row">
            <div class="col-md-6 col-12">
              <h3 class="mb-3" :class="isDarkMode ? 'text-light' : 'text-dark'">
                <strong><em>Sobre</em></strong>
              </h3>
              <ul class="list-unstyled">
                <li>
                  <nuxt-link
                    class="about-links"
                    :class="isDarkMode ? 'text-light' : 'text-dark'"
                    to="/about"
                  >
                    Blklight
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link
                    class="about-links"
                    :class="isDarkMode ? 'text-light' : 'text-dark'"
                    to="/about-team"
                  >
                    Time / Membros
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link
                    class="about-links"
                    :class="isDarkMode ? 'text-light' : 'text-dark'"
                    to="/about-website"
                  >
                    Website
                  </nuxt-link>
                </li>
              </ul>
            </div>
            <div class="col-md-6 col-12">
              <h3 class="mb-3" :class="isDarkMode ? 'text-light' : 'text-dark'">
                <strong><em> Redes sociais </em></strong>
              </h3>
              <div class="my-2">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener"
                  title="Acesse a Twitch"
                  class="badge badge-tag"
                  :class="
                    isDarkMode
                      ? 'badge-dark border border-light'
                      : 'badge-light border border-dark'
                  "
                >
                  <font-awesome-icon :icon="['fab', 'twitch']" size="lg" />
                  Twitch
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener"
                  title="Acesse a Twitch"
                  class="badge badge-tag"
                  :class="
                    isDarkMode
                      ? 'badge-dark border border-light'
                      : 'badge-polen border border-dark'
                  "
                >
                  <font-awesome-icon :icon="['fab', 'facebook-f']" size="lg" />
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </footer>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "Footer",
  computed: {
    ...mapGetters(["isDarkMode"]),
  },
};
</script>
