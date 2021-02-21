<template>
  <article
    class="card hover-card-uv mb-4"
    :class="isDarkMode ? 'card-plain' : 'card-raised'"
  >
    <div class="card-body p-4" :class="isDarkMode ? 'text-light' : ''">
      <div class="d-flex mb-3">
        <span class="badge badge-uv badge-tag mr-2">
          {{ formatDate(job.createdDate) }}
        </span>
        <ChannelBadge :channel="job.channel" :isTag="true" />
      </div>

      <h4 class="mb-2">
        <strong>
          <em>{{ job.title }}</em>
        </strong>
      </h4>
      <div class="text-right my-1">
        <NuxtLink
          tag="a"
          :to="{
            name: `${slugName}-slug`,
            params: { slug: `${job.slug}` },
          }"
          class="btn btn-custom btn-uv"
        >
          Ler mais...
        </NuxtLink>
      </div>
    </div>
  </article>
</template>
<script>
import { mapGetters } from "vuex";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import ChannelBadge from "~/components/ChannelBadge";
export default {
  name: "JobsCards",
  components: { ChannelBadge },
  props: {
    job: {
      type: Object,
      default: null,
    },
  },
  computed: {
    ...mapGetters(["isDarkMode"]),
    slugName() {
      const link = this.job.dir.replace("articles/", "").replace("/", "");
      return link;
    },
  },

  methods: {
    formatDate(date) {
      const time = new Date(date);
      const formattedDate = format(new Date(time), "dd MMM yyyy", {
        locale: ptBR,
      });

      return formattedDate;
    },
  },
};
</script>
