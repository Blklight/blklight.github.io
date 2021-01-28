<template>
  <div class="container-fluid">
    <div class="col-12 px-1 my-3">
      <h2 :class="isDarkMode ? 'text-light' : ''">
        <strong><em>Twitch</em></strong>
      </h2>
      <Twitch />
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Twitch from "~/components/Twitch";

export default {
  components: { Twitch },
  computed: {
    ...mapGetters(["isDarkMode"]),
  },
};
</script>
