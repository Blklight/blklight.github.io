<template>
  <footer class="mt-auto">
    <div
      class="container-fluid mt-4"
      :class="isDarkMode ? 'bg-dark text-light' : 'bg-polen text-dark'"
    >
      <div class="col-xl-10 col-12 offset-xl-1 offset-0 px-xl-0 px-2 py-5">
        <div class="row">
          <div class="col-12 col-md">
            <img
              v-if="isDarkMode"
              src="~/static/blklight-base-w.svg"
              width="60"
              alt=""
            />
            <img v-else src="~/static/blklight-base.svg" width="60" alt="" />
            <small class="d-block mb-3 text-muted">&copy;2020</small>
          </div>
          <div class="col-6 col-md">
            <h5 :class="isDarkMode ? 'text-light' : 'text-dark'">
              <strong><em> Redes sociais </em></strong>
            </h5>
            <ul class="list-unstyled">
              <li class="">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener"
                  title="E-mail"
                  :class="isDarkMode ? 'text-light' : 'text-dark'"
                >
                  <font-awesome-icon :icon="['fas', 'envelope']" size="lg" />
                  E-mail
                </a>
              </li>
            </ul>
          </div>
          <div class="col-6 col-md">
            <h5 :class="isDarkMode ? 'text-light' : 'text-dark'">
              <strong><em>Sobre</em></strong>
            </h5>
            <ul class="list-unstyled text-small">
              <li>
                <nuxt-link
                  :class="isDarkMode ? 'text-light' : 'text-dark'"
                  to="/about-team"
                >
                  Projeto Blklight
                </nuxt-link>
              </li>
              <li>
                <nuxt-link
                  :class="isDarkMode ? 'text-light' : 'text-dark'"
                  to="/about-team"
                >
                  Site
                </nuxt-link>
              </li>
              <li>
                <nuxt-link
                  :class="isDarkMode ? 'text-light' : 'text-dark'"
                  to="/old-home"
                >
                  Home (Layout antigo)
                </nuxt-link>
              </li>
            </ul>
          </div>
        </div>
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
