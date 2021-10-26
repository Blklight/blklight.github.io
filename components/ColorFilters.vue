<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    style="display: block; width: auto !important; height: 0 !important"
  >
    <FilterBlack-Green />
    <FilterBlack-White />
    <FilterBlue-Red />
    <FilterCyberpunk-v />
    <FilterCyberpunk-vi />
    <FilterCyberpunk-vii />
    <FilterPink-Blue />
    <FilterPink-Cyan />
    <FilterPurple-Red-Green />
    <FilterPurple-Red-Orange />
    <FilterRed-Sunset />
    <FilterSoft-Blue-Pink />
    <!-- <FilterPurple-Red-Green /> -->
  </svg>
</template>
<script>
export default {};
</script>
<style lang="scss">
.test-filter {
  filter: url("#cyberpunk-vii");
}
</style>
