<template>
  <article
    class="card card-plain ultra-radius py-3 mb-4"
    :class="[isDarkTheme ? 'hover-card-neon-yellow' : 'hover-card-uv']"
    @mouseover="isHover = true"
    @mouseout="isHover = false"
  >
    <div class="card-body">
      <div class="d-sm-flex px-3">
        <div class="flex-shrink-0">
          <img
            v-lazy="article.cover ? article.cover : article.imageHeader"
            :alt="article.title"
            class="card-image-h ultra-radius hover-filter-blue-red-golden rounded-0"
          />
        </div>
        <div class="flex-grow-1 ms-sm-4 mt-sm-0 mt-2 py-1">
          <div class="d-flex align-items-center mb-2">
            <span style="font-size: 18px; font-weight: 500">
              {{ article.channel }}
            </span>
            <!-- <Badge :channel="article.channel" :isTag="true" isFlat /> -->
          </div>
          <h4 class="card-title">
            {{ article.title }}
          </h4>
          <p
            v-if="article.description"
            class="mb-1"
            style="font-size: 18px; font-family: 'Barlow'"
          >
            {{ article.description }}
          </p>

          <!-- <div class="d-flex align-items-center">
            <span style="font-weight: 500">
              Por {{ article.author.name }} em {{ article.channel }}
            </span>
          </div> -->
          <div class="d-flex justify-content-between mt-3">
            <div class="d-flex align-items-center mt-1 mb-1">
              <div class="flex-shrink-0">
                <span
                  class="visually-hidden-focusable"
                  style="font-weight: 500"
                  >{{ article.author.name }}</span
                >
                <img
                  class="rounded-circle border border-dark"
                  src="https://i.imgur.com/h4BIIOc.jpg"
                  alt=""
                  style="height: 48px; width: 48px; object-fit: cover"
                />
              </div>
              <div class="ms-2">
                <p class="text-sm font-medium mb-0">
                  <span
                    class="marker-line custom-padding"
                    style="font-weight: 500"
                  >
                    {{ article.author.name }}
                  </span>
                </p>
                <div class="flex space-x-1 text-sm" style="font-weight: 500">
                  <time
                    class="marker-line text-capitalize custom-padding"
                    dateTime="article.createdDate"
                  >
                    <DateFormat :date="article.createdDate" />
                  </time>
                </div>
              </div>
            </div>
            <div class="d-flex align-items-end">
              <div class="">
                <nuxt-link
                  :to="article.path"
                  class="btn btn-read-more-sm"
                  :class="isDarkTheme ? 'btn-neon-yellow' : 'btn-uv'"
                >
                  Ler mais...
                </nuxt-link>
              </div>
            </div>
          </div>
          <!-- <div class="d-flex mt-3">
            <nuxt-link
              v-if="article.isPublished"
              :to="article.path"
              class="btn btn-read-more-sm"
              :class="isDarkTheme ? 'btn-neon-yellow' : 'btn-uv'"
            >
              Ler mais...
            </nuxt-link>
            <p v-else>
              <u>
                <font-awesome-icon :icon="['fas', 'pen']" />
                <em> Em atualização...</em>
              </u>
            </p>
          </div> -->
        </div>
      </div>

      <!-- <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla eos et
        explicabo cupiditate suscipit iusto, error repellendus culpa doloremque
        sit quidem, perspiciatis qui soluta. Blanditiis aspernatur veritatis
        ipsa officia alias.
      </p> -->
    </div>
  </article>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  props: {
    article: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      isHover: false,
    };
  },

  computed: {
    ...mapGetters(["isDarkTheme"]),
  },
};
</script>
<style lang="scss" scoped></style>
