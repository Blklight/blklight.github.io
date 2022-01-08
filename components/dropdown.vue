<template>
  <div class="organization__selector">
    <div class="organization__selector--view">
      <span style="font-size: 32px">{{ activeData }}</span>
      <button
        class="organization__selector--btn"
        :class="open ? 'active' : ''"
        @click="toggle"
      >
        <font-awesome-icon :icon="['fas', 'chevron-down']" />
      </button>
    </div>
    <!-- <div v-if="open" class="organization__dropdown">
      <a href="#" class="organization__dropdown--item">
        <img
          src="https://i.imgur.com/ewZOa95.jpg"
          class="organization__dropdown--logo"
          alt=""
        />
        blueshift-cc
      </a>
    </div> -->
    <div v-if="open" class="organization__dropdown">
      <template v-for="org in orgs">
        <a
          :key="org.name"
          :href="org.url"
          class="organization__dropdown--item"
          @click="itemClicked(org.name)"
        >
          <img :src="org.logo" class="organization__dropdown--logo" alt="" />
          {{ org.name }}
        </a>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      open: false,

      data: ['blueshift-cc', 'Org 1', 'Org 2', 'Org 3'],
      orgs: [
        {
          name: 'blueshift-cc',
          url: '#',
          logo: 'https://i.imgur.com/ewZOa95.jpg',
        },
        {
          name: 'blueshift-cc2',
          url: '#',
          logo: 'https://i.imgur.com/ewZOa95.jpg',
        },
        {
          name: 'blueshift-cc3',
          url: '#',
          logo: 'https://i.imgur.com/ewZOa95.jpg',
        },
        {
          name: 'blueshift-cc4',
          url: '#',
          logo: 'https://i.imgur.com/ewZOa95.jpg',
        },
      ],
      activeData: 'blueshift-cc',
    }
  },
  mounted() {
    document.addEventListener('click', this.close)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.close)
  },
  methods: {
    toggle() {
      this.open = !this.open
    },
    close(e) {
      if (!this.$el.contains(e.target)) {
        this.open = false
      }
    },
    orgClicked(org) {
      this.toggle()
      this.changeOrg(org)
    },
    changeOrg(org) {
      this.activeData = org
    },
  },
}
</script>

<style>
.organization__selector {
  display: inline-block;
  position: relative;
}

.organization__selector--view {
  display: flex;
  align-items: center;
}

.organization__dropdown {
  width: 200px;
  background-color: #fff;
  background-clip: padding-box;
  border: none;
  border-radius: 4px;
  color: #121212;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  list-style: none;
  margin: 0.125rem 0 0;
  padding: 0.5rem 0;
  position: absolute;
  text-align: left;
  right: 0;
}

.organization__dropdown--item {
  text-decoration: none;
  color: #212529;
  padding: 0.25rem 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.organization__dropdown--logo {
  width: 25px;
  height: 25px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 8px;
}

.organization__dropdown--item:hover {
  color: #f16622;
  cursor: pointer;
}

.organization__selector--btn {
  display: inline-flex;
  vertical-align: middle;
  line-height: 1.5;
  padding: 4px 8px;
  background-color: rgba(51, 51, 51, 0.25);
  color: #121212;
  border-radius: 4px;
  border: none;
  outline: 0;
  margin-left: 8px;
}

.organization__selector--btn.active,
.organization__selector--btn:hover {
  background: rgba(232, 72, 85, 1);
  color: #ffffff;
}
</style>
