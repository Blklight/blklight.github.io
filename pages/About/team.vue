<template>
  <LayoutContent>
    <div class="container">
      <template v-if="isDarkTheme">
        <img
          src="../../static/blklight-white.svg"
          title="Ultimate Mercer"
          width="175"
          class="mx-auto d-block pt-3 mb-3"
        />
      </template>
      <template v-else>
        <img
          src="../../static/blklight-black.svg"
          title="Ultimate Mercer"
          width="175"
          class="mx-auto d-block mt-3 mb-3"
        />
      </template>
      <h3 class="font-monospace text-center text-uppercase mb-5">
        Blklight Team
      </h3>
    </div>
    <div class="container">
      <article
        v-for="(member, i) in members"
        :key="i"
        class="card card-raised mb-4"
        :class="[
          isDarkTheme ? 'card-plain hover-card-yellow' : 'hover-card-uv',
        ]"
      >
        <div class="d-sm-flex align-items-center p-4">
          <div class="flex-shrink-0">
            <img
              v-lazy="member.cover"
              :alt="member.nickname"
              class="member-avatar card-img-border hover-filter-cyberpunk-v"
            />
          </div>
          <div class="flex-grow-1 ms-sm-3">
            <h3
              class="mb-3"
              :class="
                isDarkTheme
                  ? 'text-light cyber-underline-light'
                  : 'text-dark cyber-underline-dark'
              "
            >
              <em>{{ member.nickname }}</em>
            </h3>

            <div class="seize-font">
              <p class="d-xl-block d-lg-block d-sm-none font-monospace mb-2">
                {{ member.description }}
              </p>
            </div>

            <span
              v-for="(role, j) in member.role"
              :key="j"
              class="badge badge-tag ml-0 mr-1 mb-3"
              :class="isDarkTheme ? 'bg-light text-dark' : 'bg-dark text-light'"
            >
              {{ role }}
            </span>
          </div>
        </div>
      </article>
    </div>
  </LayoutContent>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  async asyncData({ $content, params }) {
    const members = await $content("about/members", params.slug)
      .sortBy("name", "asc")
      .fetch();
    return {
      members,
    };
  },

  computed: {
    ...mapGetters(["isDarkTheme"]),
  },
};
</script>
<style lang="scss" scoped>
.seize-font {
  p {
    font-size: 18px;
  }

  @media screen and (max-width: 768px) {
    p {
      font-size: 16px;
    }
  }
}
</style>
