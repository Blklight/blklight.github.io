<template>
  <div>
    <div class="card my-0">
      <img
        v-lazy="'https://i.imgur.com/ehfbNpw.jpg'"
        class="filter-cyberpunk-v"
        style="width: 100%; height: 75vh; object-fit: cover"
        alt=""
      />
      <div class="card-img-overlay">
        <div
          class="
            d-flex
            flex-column
            justify-content-center
            h-100
            px-xl-0 px-1
            py-2
          "
        >
          <h1
            v-if="error.statusCode === 404"
            class="text-light font-monospace mb-3"
          >
            <span class="bg-dark py-1"
              ><em> <i class="marker-line">404 Page not found</i> </em></span
            >
          </h1>
          <h1 v-else class="text-light">An error occurred</h1>
          <div class="">
            <NuxtLink
              to="/"
              class="btn"
              :class="isDarkTheme ? 'btn-neon-yellow' : 'btn-uv'"
            >
              <font-awesome-icon :icon="['fas', 'home']" />
              Página Inicial
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  layout: "error",
  props: ["error"], // you can set a custom layout for the error page
  computed: {
    ...mapGetters(["isDarkTheme"]),
  },
};
</script>
