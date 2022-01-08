<template>
  <LayoutContent>
    <div class="container my-4">
      <MTSSidebar />
    </div>
    <div class="container">
      <Dropdown />
    </div>
    <!-- <div class="container mb-4">
      <UserSettings />
    </div>
    <div class="container">

    </div> -->
    <!-- <div class="container py-4">
      <button class="btn btn-orange btn-sm">
        <font-awesome-icon :icon="['fas', 'chevron-down']" size="lg" />
      </button>
    </div> -->
    <!-- <div class="container">
      <div
        class="card card-raised card-background view-anchor mb-4"
        :class="[
          isDarkTheme
            ? 'hover-card-yellow-bordered border border-light'
            : 'hover-card-uv-bordered border border-dark',
        ]"
      >
        <img
          src="https://i.imgur.com/m5v3Jem.jpg"
          class="
            card-background-image card-img-border
            hover-filter-cyberpunk-v
            grad-filter
          "
          style="height: 80vh"
          alt="teste"
        />
        <div class="mask texture-mask-2"></div>
        <div
          class="card-img-overlay h-100 d-flex flex-column justify-content-end"
        >
          <div class="d-flex mb-1">
            <span class="badge bg-dark badge-tag border border-dark ms-0 me-1">
            </span>
          </div>
          <h3 class="card-title">
            <em>
              <span class="bg-dark text-light py-1">
                <i class="marker-line"> Ultimates - Mask Overlays </i>
              </span>
            </em>
          </h3>
        </div>
      </div>
    </div> -->
  </LayoutContent>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Playground',
  computed: {
    ...mapGetters(['isDarkTheme']),
  },
}
</script>
<style lang="scss"></style>
