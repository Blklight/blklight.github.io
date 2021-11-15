<template>
  <section id="topAnchor">
    <div v-for="(data, i) in channel" :key="i">
      <div class="card card-plain mt-0">
        <img v-lazy="data.cover" class="card-img card-img-fit" alt="" />
        <div class="card-body">
          <h4 class="card-title">{{ data.name }}</h4>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <pre>{{ channel }}</pre>
    </div>
  </section>
</template>
<script>
export default {
  async asyncData({ $content, params }) {
    const channel = await $content("channels")
      .where({ name: "Dev Corporation" })
      .fetch();

    return {
      channel,
    };
  },
};
</script>
