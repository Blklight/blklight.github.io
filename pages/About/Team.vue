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

      <div
        v-for="(member, i) in members"
        :key="i"
        class="d-md-flex align-middle my-4"
      >
        <div>
          <img
            v-lazy="member.cover"
            alt=""
            class="member-avatar rounded mx-auto d-block filter-cyberpunk-v"
            :class="isDarkTheme ? 'border border-light' : 'border border-dark'"
          />
        </div>
        <div class="" :class="isDarkTheme ? 'text-light' : 'text-dark'">
          <div class="px-lg-5 py-1 px-3 seize-font text-lg-start text-center">
            <h2
              class="mb-3"
              :class="
                isDarkTheme
                  ? 'text-light cyber-underline-light'
                  : 'text-dark cyber-underline-dark'
              "
            >
              <em>{{ member.nickname }}</em>
            </h2>
            <!-- <h4>
            <em>{{ member.name }}</em>
          </h4> -->
            <span
              v-for="(role, j) in member.role"
              :key="j"
              class="badge badge-tag ml-0 mr-1 mb-3"
              :class="isDarkTheme ? 'bg-light text-dark' : 'bg-dark text-light'"
            >
              {{ role }}
            </span>

            <p class="font-monospace">{{ member.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </LayoutContent>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  async asyncData({ $content, params }) {
    const members = await $content("project-blklight/members", params.slug)
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
