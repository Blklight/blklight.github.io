<template>
  <header>
    <template v-if="headerLayout === 'portrait-left'">
      <HeaderPortrait :article="article" />
    </template>
    <template v-if="headerLayout === 'portrait-right'">
      <HeaderPortrait :article="article" isRight />
    </template>
    <template v-if="headerLayout === 'portrait-left-full'">
      <HeaderPortrait :article="article" isFull />
    </template>
    <template v-if="headerLayout === 'portrait-right-full'">
      <HeaderPortrait :article="article" isFull isRight />
    </template>
    <template v-if="headerLayout === 'landscape'">
      <HeaderLandscape :article="article" />
    </template>
    <template v-if="headerLayout === 'parallax'">
      <HeaderParallax :article="article" />
    </template>
    <template v-if="headerLayout === 'parallax-alt'">
      <HeaderParallaxAlt :article="article" />
    </template>
    <template v-if="headerLayout === 'double-parallax'">
      <HeaderDoubleParallax :article="article" />
    </template>
    <template v-if="headerLayout === 'profile'">
      <HeaderProfile :article="article" />
    </template>
    <template v-if="headerLayout === 'circle-profile'">
      <HeaderProfile :article="article" isCircle />
    </template>
    <template v-if="headerLayout === 'basic'">
      <HeaderBasic :article="article" />
    </template>
    <!-- <template v-if="true"></template> -->
  </header>
</template>
<script>
export default {
  props: {
    article: {
      type: Object,
      default: null,
    },
  },
  computed: {
    headerLayout() {
      const layoutTemplate = ["portrait-left", "portrait-right"];
      const num = Math.floor(Math.random() * layoutTemplate.length);

      const layout = this.article.headerLayout
        ? this.article.headerLayout
        : layoutTemplate[num];

      return layout;
    },
  },
};
</script>
