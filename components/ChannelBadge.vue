<template>
  <div>
    <span
      v-if="channel === 'Dev Corporation'"
      class="badge bg-dark text-info border border-info ms-0"
      :class="isTag ? 'badge-tag' : ''"
    >
      Dev Corporation
    </span>
    <span
      v-if="channel === 'Danger Zone'"
      class="badge bg-neon-yellow text-dark border border-dark ms-0"
      :class="isTag ? 'badge-tag' : ''"
    >
      Danger Zone
    </span>
    <span
      v-if="channel === 'arts'"
      class="badge badge-indigo ms-0"
      :class="isTag ? 'badge-tag' : ''"
    >
      Design & Arts
    </span>
    <span
      v-if="channel === 'Redlight'"
      class="badge bg-pink text-light border border-dark ms-0"
      :class="isTag ? 'badge-tag' : ''"
    >
      Redlight
    </span>
    <span
      v-if="channel === 'Blklight Gaming'"
      class="badge bg-dark text-orange border border-orange ms-0"
      :class="isTag ? 'badge-tag' : ''"
    >
      Blklight Gaming
    </span>
    <span
      v-if="channel === 'Blklight Developers'"
      class="badge bg-info text-dark border border-dark ms-0"
      :class="isTag ? 'badge-tag' : ''"
    >
      Dev Team
    </span>
    <!-- <span v-else class="badge badge-dark"> {{ channel }}</span> -->
  </div>
</template>
<script>
export default {
  name: "ChannelBadge",

  props: {
    channel: {
      type: String,
      default: null,
    },

    isTag: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
