<template>
  <section class="mb-5">
    <div class="two-col-grid">
      <div
        class="image-col"
        :class="
          isDarkTheme
            ? 'border-end border-bottom border-light'
            : 'border-end border-bottom border-dark'
        "
      >
        <!-- <div class="sticky-content">
          <div class="overlay">
            <div class="d-flex flex-column text-lg-center">
              <img
                v-lazy="site.cover"
                class="mx-auto d-block rounded-circle my-3"
                style="width: 350px; height: 350px; object-fit: cover"
                alt=""
                :class="
                  isDarkTheme ? 'border border-light' : 'border border-dark'
                "
              />
              <h2>
                <span class="bg-dark text-light px-2 py-1">
                  {{ site.title }}
                </span>
              </h2>
            </div>
          </div>
        </div> -->

        <div class="sticky-content">
          <img :src="site.cover" class="image-content" alt="" />
          <div class="overlay">
            <div class="h-100 d-flex flex-column justify-content-end">
              <h2>
                <span class="bg-dark text-light px-2 py-1">
                  {{ site.title }}
                </span>
              </h2>
            </div>
          </div>
        </div>

        <!-- <div v-lazy:background-image="site.cover" class="sticky-img">
          <div class="overlay">
            <div class="h-100 d-flex flex-column justify-content-end">
              <h2>
                <span class="bg-dark text-light px-2 py-1">
                  {{ site.title }}
                </span>
              </h2>
            </div>
          </div>
        </div> -->
      </div>
      <div
        class="text-col"
        :class="
          isDarkTheme
            ? ' border-bottom border-light'
            : 'border-bottom border-dark'
        "
      >
        <nuxt-content :document="site" />
      </div>
    </div>
  </section>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  async asyncData({ $content, params }) {
    const site = await $content("project-blklight/about", params.slug).fetch();
    // log(JSON.stringify(site, 0, 2));
    return {
      site,
    };
  },
  computed: {
    ...mapGetters(["isDarkTheme"]),
  },
};
</script>
