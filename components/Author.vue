<template>
  <div
    class="container-fluid mb-4"
    :class="isDarkTheme ? 'bg-neon-yellow text-dark' : 'bg-uv text-light'"
  >
    <div class="container">
      <div class="py-3">
        <!-- <h4 class="text-center"><em>Escrito por</em></h4> -->

        <div class="d-md-flex align-middle">
          <img
            v-lazy="author.cover"
            :alt="author.username"
            class="
              author-avatar
              my-3
              rounded-circle
              border border-dark
              filter-cyberpunk-v
            "
          />
          <div class="py-2 px-5 mx-md-3">
            <h3>
              <span class="py-1 px-2 bg-dark text-light">
                <em>
                  <i class="marker-line">{{ author.username }}</i>
                </em>
              </span>
            </h3>
            <h5 v-if="author.quote" class="mb-3">
              <span class="bg-dark text-light p-1">
                <em>
                  <i class="marker-line">"{{ author.quote }}"</i>
                </em>
              </span>
            </h5>
            <h5><em> Sobre o autor:</em></h5>
            <p>
              {{ author.bio }}
            </p>
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
