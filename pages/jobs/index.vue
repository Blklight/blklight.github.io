<template>
  <section class="container-fluid mb-4">
    <div class="col-xl-10 col-12 offset-xl-1 offset-0 px-xl-0 px-1">
      <h2 class="mb-3" :class="isDarkMode ? 'text-light' : 'text-dark'">
        <strong><em>Vagas</em></strong>
      </h2>
      <div class="row">
        <div v-for="(job, i) in jobs" :key="i" class="col-lg-4 col-md-6 col-12">
          <JobsCards :job="job" />
        </div>
      </div>

      <!-- <template v-for="(job, i) in jobs">
          <article
            :key="i"
            class="card mb-4"
            :class="
              isDarkMode
                ? 'card-plain hover-card-yellow'
                : 'hover-card-uv card-raised'
            "
          >
            <div class="row">
              <div class="col-md-5 col-12">
                <div class="view">
                  <img
                    v-lazy="job.cover"
                    class="card-img-fit cyberpunk-effect"
                    style="height: 350px !important; width: 100% !important"
                    :title="job.title"
                  />
                  <div class="mask texture-mask-2"></div>
                </div>
              </div>
              <div class="col-md-7 col-12">
                <div
                  class="px-md-4 px-3 py-3"
                  :class="isDarkMode ? 'text-light' : ''"
                >
                  <span
                    class="badge badge-tag"
                    :class="isDarkMode ? 'badge-neon-yellow' : 'badge-uv'"
                  >
                    {{ job.createdDate }}
                  </span>
                  <span
                    class="badge badge-uv badge-tag mb-2"
                    style="text-transform: capitalize"
                    :class="isDarkMode ? 'badge-neon-yellow' : 'badge-uv'"
                  >
                    {{ job.channel }}
                  </span>

                  <h3 class="exo-font mt-1 mb-2" style="font-style: italic">
                    <span class="">
                      <strong>
                        {{ job.title }}
                      </strong>
                    </span>
                  </h3>
                  <h5 class="card-text mb-2">
                    <em>{{ job.byline }}</em>
                  </h5>

                  <p class="mb-3">
                    {{ job.abstract }}
                  </p>

                  <div class="text-right mb-2">
                    <a
                      :href="job.dir"
                      target="_blank"
                      class="btn btn-sm"
                      :class="
                        isDarkMode
                          ? 'btn-outline-neon-yellow'
                          : 'btn-outline-uv'
                      "
                    >
                      Read more...
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
          </article>
        </template> -->
    </div>
  </section>
</template>
<script>
import { mapGetters } from "vuex";
import JobsCards from "~/components/JobsCards";

export default {
  components: { JobsCards },

  async asyncData({ $content, params }) {
    const jobs = await $content("articles", { deep: true }, params.slug)
      .only([
        "title",
        "abstract",
        "imageHeader",
        "cover",
        "slug",
        "dir",
        "channel",
        "createdDate",
        "featured",
        "type",
        "author",
        "isPublished",
      ])
      .sortBy("createdDate", "desc")
      .where({
        featured: false,
        type: "normal",
        isPublished: true,
        category: "jobs",
      })
      .fetch();

    return {
      jobs,
    };
  },
  computed: {
    ...mapGetters(["isDarkMode"]),
  },
};
</script>
