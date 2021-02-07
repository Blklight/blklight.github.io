<template>
  <div>
    <div class="card my-0">
      <img
        v-lazy="'https://i.imgur.com/ehfbNpw.jpg'"
        class="cyberpunk-header"
        style="width: 100%; height: 525px; object-fit: cover"
        alt=""
      />
      <div class="card-img-overlay">
        <div class="col-xl-10 col-12 offset-xl-1 offset-0 px-xl-0 px-1 py-2">
          <h1 v-if="error.statusCode === 404" class="text-light mb-3">
            <strong><em>404 Page not found </em></strong>
          </h1>
          <h1 v-else class="text-light">An error occurred</h1>
          <NuxtLink
            to="/"
            class="btn btn-flat"
            :class="isDarkMode ? 'btn-neon-yellow' : 'btn-uv'"
          >
            <font-awesome-icon :icon="['fas', 'home']" />
            Página Inicial
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="container-fluid">
    <div class="col-xl-10 col-12 offset-xl-1 offset-0 px-xl-0 px-1">
      <div class="card my-2">
        <img
          v-lazy="'https://i.imgur.com/ehfbNpw.jpg'"
          class="cyberpunk-header"
          style="width: 100%; height: 500px; object-fit: cover"
          alt=""
        />
        <div class="card-img-overlay">
          <h1
            v-if="error.statusCode === 404"
            class="mb-3"
            :class="isDarkMode ? 'text-light' : ''"
          >
            <strong><em>404 Page not found </em></strong>
          </h1>
          <h1 v-else :class="isDarkMode ? 'text-light' : ''">
            An error occurred
          </h1>
          <NuxtLink
            to="/"
            class="btn"
            :class="isDarkMode ? 'btn-neon-yellow' : 'btn-uv'"
            >Página Inicial</NuxtLink
          >
        </div>
      </div>
    </div>
  </div> -->
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["error"],
  layout: "error", // you can set a custom layout for the error page

  computed: {
    ...mapGetters(["isDarkMode"]),
  },
};
</script>
