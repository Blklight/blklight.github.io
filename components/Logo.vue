<template>
  <div class="container-fluid">
    <div class="col-xl-10 col-12 offset-xl-1 offset-0 px-xl-0 px-1">
      <template v-if="isDarkMode">
        <img
          src="~/static/blklight-base-w.svg"
          width="160"
          class="mx-auto d-block my-2"
          alt=""
        />
      </template>
      <template v-else>
        <img
          src="~/static/blklight-base.svg"
          width="160"
          class="mx-auto d-block my-2"
          alt=""
        />
      </template>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "Logo",
  computed: {
    ...mapGetters(["isDarkMode"]),
  },
};
</script>
