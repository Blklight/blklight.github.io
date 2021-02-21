<template>
  <main :class="{ 'bg-dark': isDarkMode }">
    <Logo />
    <div class="container-fluid mb-4">
      <div class="col-xl-10 col-12 offset-xl-1 offset-0 px-xl-0 px-1">
        <div class="row py-3">
          <section class="col-lg-7 col-md-6 col-12 px-md-3 pad mb-3">
            <div class="sticky-top">
              <h2
                class="mt-3 mb-3"
                :class="isDarkMode ? 'text-light' : 'text-dark'"
              >
                <strong><em>Destaque</em></strong>
              </h2>
              <article v-for="(featured, i) in featured" :key="i">
                <Featured :article="featured" />
              </article>
            </div>
          </section>
          <section class="col-lg-5 col-md-6 col-12 px-md-3 pad mb-3">
            <h2
              class="mt-3 mb-3"
              :class="isDarkMode ? 'text-light' : 'text-dark'"
            >
              <strong> <em> Últimas notícias</em></strong>
            </h2>
            <article v-for="(article, i) in articles" :key="i">
              <Cards :article="article" :isFeatured="true" />
            </article>
          </section>
        </div>
        <div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-8 offset-2">
          <nuxt-link
            to="all-articles"
            class="btn btn-uv btn-flat mx-auto d-block"
            :class="{ 'btn-raised': !isDarkMode }"
          >
            Ver mais artigos
          </nuxt-link>
        </div>
      </div>
    </div>
    <!-- <section class="container-fluid pt-3 mb-4">
      <div class="col-xl-10 col-12 offset-xl-1 offset-0 px-xl-0 px-1">
        <h2 class="mt-3 mb-2" :class="isDarkMode ? 'text-light' : 'text-dark'">
          <strong><em>Todos artigos</em></strong>
        </h2>
        <div class="row">
          <article
            v-for="(post, i) in posts"
            :key="i"
            class="col-lg-4 col-md-6 col-12"
          >
            <Cards :article="post" :isFeatured="false" />
          </article>
        </div>
      </div>
    </section> -->
    <section class="container-fluid mb-4">
      <div class="col-xl-10 col-12 offset-xl-1 offset-0 px-xl-0 px-1">
        <h2 class="mb-3" :class="isDarkMode ? 'text-light' : 'text-dark'">
          <strong><em>Especiais</em></strong>
        </h2>

        <article v-for="(story, i) in stories" :key="i" class="mb-4">
          <Stories :story="story" />
        </article>
        <div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-8 offset-2">
          <NuxtLink
            to="/all-stories"
            class="btn btn-uv btn-flat mx-auto d-block"
            :class="{ 'btn-raised': !isDarkMode }"
          >
            Ver mais stories
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="container-fluid mb-4">
      <div class="col-xl-10 col-12 offset-xl-1 offset-0 px-xl-0 px-1">
        <h2 class="mb-2" :class="isDarkMode ? 'text-light' : 'text-dark'">
          <strong><em>Vagas</em></strong>
        </h2>
        <div class="row">
          <div
            v-for="(job, i) in jobs"
            :key="i"
            class="col-lg-4 col-md-6 col-12"
          >
            <JobsCards :job="job" />
          </div>
        </div>
        <div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-8 offset-2">
          <NuxtLink
            to="/jobs"
            class="btn btn-uv btn-flat mx-auto d-block"
            :class="{ 'btn-raised': !isDarkMode }"
          >
            Ver mais vagas
          </NuxtLink>
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

    <section class="container-fluid mb-4">
      <div class="col-xl-10 col-12 offset-xl-1 offset-0 px-xl-0 px-1 my-3">
        <h2 class="mb-3" :class="isDarkMode ? 'text-light' : 'text-dark'">
          <strong><em>Extras / Em desenvolvimento</em></strong>
        </h2>
        <nuxt-link to="/new-york-times" class="btn btn-neon-yellow btn-raised">
          New York Times API
        </nuxt-link>
        <nuxt-link
          to="/new-york-times-h"
          class="btn btn-neon-yellow btn-raised"
        >
          New York Times API - Horizontal Cards
        </nuxt-link>
        <nuxt-link
          to="/new-york-times-narrow"
          class="btn btn-neon-yellow btn-raised"
        >
          New York Times API - Narrow Cards
        </nuxt-link>
        <nuxt-link to="/playground" class="btn btn-neon-yellow btn-raised">
          Playground
        </nuxt-link>
        <nuxt-link to="/twitch" class="btn btn-neon-yellow btn-raised">
          Twitch
        </nuxt-link>

        <!-- <nuxt-link to="/dev-corporation" class="btn btn-neon-yellow btn-raised">
          Dev Corporation
        </nuxt-link>
        <nuxt-link to="/arts" class="btn btn-neon-yellow btn-raised">
          Arts
        </nuxt-link>
        <nuxt-link to="/redlight" class="btn btn-neon-yellow btn-raised">
          Redlight
        </nuxt-link>
        <nuxt-link to="/nerdstation" class="btn btn-neon-yellow btn-raised">
          Nerdstation
        </nuxt-link>
        <nuxt-link to="/search" class="btn btn-neon-yellow btn-raised">
          <font-awesome-icon :icon="['fas', 'search']" />
          Pesquisar
        </nuxt-link> -->
      </div>
    </section>
    <!-- <div class="container-fluid">
      <div class="col-xl-10 col-12 offset-xl-1 offset-0 px-xl-0 px-1 my-3">
        <TwitchModal />
      </div>
    </div> -->
    <!-- <div class="container">
      <pre :class="isDarkMode ? 'text-light' : 'text-dark'">{{ test }}</pre>
    </div> -->
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import Featured from "~/components/Featured";
import Cards from "~/components/Cards";
import Stories from "~/components/StoriesCard";
import JobsCards from "~/components/JobsCards";

export default {
  components: { Featured, Cards, Stories, JobsCards },

  async asyncData({ $content, params, $axios }) {
    const featured = await $content("articles", { deep: true }, params.slug)
      .only([
        "title",
        "abstract",
        "cover",
        "imageHeader",
        "type",
        "slug",
        "dir",
        "channel",
        "createdAt",
        "createdDate",
        "featured",
        "author",
        "isPublished",
      ])
      .sortBy("createdDate", "desc")
      .where({
        featured: true,
        type: "normal",
        isPublished: true,
        category: { $ne: "jobs" },
      })
      .limit(1)
      .fetch();

    const articles = await $content("articles", { deep: true }, params.slug)
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
        category: { $ne: "jobs" },
      })
      .limit(5)
      .fetch();

    const stories = await $content("articles", { deep: true }, params.slug)
      .only([
        "title",
        "abstract",
        "imageHeader",
        "cover",
        "slug",
        "dir",
        "channel",
        "createdDate",
        "type",
        "featured",
        "author",
        "isPublished",
      ])
      .sortBy("createdDate", "desc")
      .where({ featured: true, isPublished: true, type: "stories" })
      .limit(3)
      .fetch();

    const posts = await $content("articles", { deep: true }, params.slug)
      .only([
        "title",
        "abstract",
        "imageHeader",
        "cover",
        "slug",
        "dir",
        "channel",
        "createdDate",
        "type",
        "featured",
        "author",
      ])
      .sortBy("createdDate", "desc")
      .where({ type: "normal" })
      .skip(6)
      .limit(6)
      .fetch();

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
      .limit(3)
      .fetch();

    return {
      featured,
      articles,
      stories,
      posts,
      jobs,
    };
  },

  computed: {
    ...mapGetters(["isDarkMode"]),
  },
};
</script>
<style lang="scss">
.pad {
  padding: 0 0.75rem;
}
</style>
