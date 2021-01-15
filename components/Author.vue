<template>
  <div
    class="container-fluid mb-4"
    :class="isDarkMode ? 'bg-neon-yellow' : 'bg-uv'"
  >
    <div class="container">
      <div class="card card-plain py-3">
        <div class="row">
          <div class="col-lg-3 col-12 p-0">
            <img
              v-lazy="author.avatar"
              :alt="author.name"
              class="author-avatar mx-auto rounded-circle d-block"
            />
          </div>
          <div class="col-lg-9 col-12">
            <div class="card-body">
              <h3>
                <span
                  class="marker marker-title"
                  :class="isDarkMode ? 'marker-dark' : 'marker-dark'"
                >
                  <strong
                    ><em> {{ author.name }} </em></strong
                  >
                </span>
              </h3>

              <p :class="isDarkMode ? 'text-dark' : 'text-light'">
                {{ author.bio }}
              </p>
            </div>
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
    ...mapGetters(["isDarkMode"]),
  },
};
</script>
<style lang="scss">
.author-avatar {
  width: 175px;
  height: 175px;
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
