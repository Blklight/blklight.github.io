<template>
  <div class="user__settings">
    <button class="user__settings--btn" @click.prevent="toggle">
      <img
        src="https://i.imgur.com/ewZOa95.jpg"
        class="user__settings--avatar rounded-circle"
        alt=""
      />
    </button>

    <div v-if="open" class="settings__dropdown">
      <span class="settings__dropdown--arrow"></span>
      <div class="settings__dropdown--item">Dashboard</div>
      <div class="settings__dropdown--item">Settings</div>
      <div class="settings__dropdown--item">Docs</div>
      <div class="settings__dropdown--item">
        Themes
        <select class="settings__dropdown--select">
          <option selected>Default</option>
          <option value="1">Light</option>
          <option value="2">Dark</option>
        </select>
      </div>
      <div class="settings__dropdown--divider"></div>

      <div class="settings__dropdown--item">Logout</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      open: false,
    };
  },
  mounted() {
    document.addEventListener("click", this.close);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.close);
  },
  methods: {
    toggle() {
      this.open = !this.open;
    },
    close(e) {
      if (!this.$el.contains(e.target)) {
        this.open = false;
      }
    },
  },
};
</script>

<style>
.user__settings {
  display: inline-block;
  position: relative;
}

.user__settings--btn {
  width: 35px;
  height: 35px;
  border: none;
  display: block;
  padding: 0;
  margin-bottom: 4px;
  position: relative;
}

.user__settings--avatar {
  width: 35px;
  height: 35px;
  object-fit: cover;
}

.settings__dropdown {
  width: 300px;
  background-color: #fff;
  background-clip: padding-box;
  border: none;
  border-radius: 4px;
  color: #121212;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  list-style: none;
  margin: 0.125rem 0 0;
  padding: 0.5rem 0;
  text-align: left;
  position: absolute;
  right: 0px;
}

.settings__dropdown--arrow {
  position: absolute;
  content: "";
  border-right: 8px solid transparent;
  border-left: 8px solid transparent;
  border-bottom: 8px solid #fff;
  top: -4px;
  right: 10px;
}

.settings__dropdown--item {
  display: flex;
  align-items: center;
  color: #212529;
  padding: 0.25rem 1.25rem;
  cursor: pointer;
}

.settings__dropdown--divider {
  max-width: 100%;
  height: 1px;
  background-color: #000000;
  margin: 8px 20px 12px;
}

.settings__dropdown--item:hover {
  color: #f16622;
  cursor: pointer;
}

.settings__dropdown--select {
  display: block;
  width: 100%;
  line-height: 1.5;
  margin-left: 12px;
  padding-top: 2px;
  padding-bottom: 2px;
  padding-left: 4px;
  border: 1px solid #121212;
  border-radius: 4px;
}

.settings__dropdown--select:focus-visible {
  outline: 0;
}
</style>
