<template>
  <div>
    <span
      v-if="channel === 'Dev Corporation'"
      class="badge bg-dark text-info border border-info ms-0"
      :class="isTag ? 'badge-tag' : ''"
    >
      <template v-if="!isCategory">{{ channel }}</template>
      <template v-else>{{ category }}</template>
    </span>
    <span
      v-if="channel === 'Danger Zone'"
      class="badge bg-neon-yellow text-dark border border-dark ms-0"
      :class="isTag ? 'badge-tag' : ''"
    >
      <template v-if="!isCategory">{{ channel }}</template>
      <template v-else>{{ category }}</template>
    </span>
    <span
      v-if="channel === 'arts'"
      class="badge badge-indigo ms-0"
      :class="isTag ? 'badge-tag' : ''"
    >
      <template v-if="!isCategory">{{ channel }}</template>
      <template v-else>{{ category }}</template>
    </span>
    <span
      v-if="channel === 'Redlight'"
      class="badge bg-pink text-light border border-dark ms-0"
      :class="isTag ? 'badge-tag' : ''"
    >
      <template v-if="!isCategory">{{ channel }}</template>
      <template v-else>{{ category }}</template>
    </span>
    <span
      v-if="channel === 'Blklight Gaming'"
      class="badge bg-dark text-orange border border-orange ms-0"
      :class="isTag ? 'badge-tag' : ''"
    >
      <template v-if="!isCategory">{{ channel }}</template>
      <template v-else>{{ category }}</template>
    </span>
    <span
      v-if="channel === 'Team Blklight'"
      class="badge bg-info text-dark border border-dark ms-0"
      :class="isTag ? 'badge-tag' : ''"
    >
      <template v-if="!isCategory">{{ channel }}</template>
      <template v-else>{{ category }}</template>
    </span>
    <!-- <span v-else class="badge badge-dark"> {{ channel }}</span> -->
  </div>
</template>

<script>
export default {
  name: "Badge",

  props: {
    channel: {
      type: String,
      default: null,
    },

    category: {
      type: String,
      default: null,
    },

    isCategory: {
      type: Boolean,
      default: false,
    },

    isTag: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
