<template>
  <div
    class="container-fluid background-texture mb-4"
    :class="isDarkTheme ? 'text-light' : 'text-dark'"
  >
    <div class="container">
      <div class="py-5">
        <h3
          class="mb-3"
          :class="isDarkTheme ? 'bg-light text-dark' : 'bg-dark text-light'"
        >
          <span class="marker-line py-2 px-3">Escrito por:</span>
        </h3>

        <div class="d-flex align-items-center">
          <img
            v-lazy="author.cover"
            :alt="author.username"
            class="author-avatar my-3 rounded-circle border border-dark filter-cyberpunk-v"
          />
          <div
            class="py-2 px-5 mx-md-3 d-flex flex-column justify-content-center"
          >
            <h2 class="mb-3">
              <span
                class="py-1 px-2"
                :class="
                  isDarkTheme ? 'bg-light text-dark' : 'bg-dark text-light'
                "
              >
                <span class="marker-line">{{ author.username }}</span>
              </span>
            </h2>
            <h4 v-if="author.quote" class="fw-normal mb-3">
              <span
                class="p-1"
                :class="
                  isDarkTheme ? 'bg-light text-dark' : 'bg-dark text-light'
                "
              >
                <span class="marker-line">"{{ author.quote }}"</span>
              </span>
            </h4>
            <!-- <h5><em> Sobre o autor:</em></h5>
            <p>
              {{ author.bio }}
            </p> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "Author",

  props: {
    author: {
      type: Object,
      default: null,
    },
  },

  computed: {
    ...mapGetters(["isDarkTheme"]),
  },
};
</script>
<style lang="scss">
.author-avatar {
  width: 200px;
  height: 200px;
  object-fit: cover;
}

@media screen and (max-width: 768px) {
  .author-avatar {
    width: 200px;
    height: 200px;
    object-fit: cover;
    margin-bottom: 1rem;
  }
}
</style>
