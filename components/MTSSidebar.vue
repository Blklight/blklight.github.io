<template>
  <div class="mts-sidebar">
    <div class="mts-sidebar-brand">Brand</div>
    <div class="mts-sidebar-menu">
      <div class="mts-sidebar-option mts-sidebar-option-active">
        <span class="mts-sidebar-option-icon">
          <font-awesome-icon :icon="['fab', 'twitch']" size="lg" />
        </span>
        Option 1
      </div>
      <div class="mts-sidebar-option">
        <span class="mts-sidebar-option-icon">
          <font-awesome-icon :icon="['fab', 'twitch']" size="lg" /> </span
        >Option 2
      </div>
      <div class="mts-sidebar-option">
        <span class="mts-sidebar-option-icon">
          <font-awesome-icon :icon="['fab', 'twitch']" size="lg" /> </span
        >Option 3
      </div>
      <div class="mts-sidebar-option">
        <span class="mts-sidebar-option-icon">
          <font-awesome-icon :icon="['fab', 'twitch']" size="lg" /> </span
        >Option 4
      </div>
      <div class="mts-sidebar-option">
        <span class="mts-sidebar-option-icon">
          <font-awesome-icon :icon="['fab', 'twitch']" size="lg" /> </span
        >Option 5
      </div>
      <div class="mts-sidebar-option">
        <span class="mts-sidebar-option-icon">
          <font-awesome-icon :icon="['fab', 'twitch']" size="lg" /> </span
        >Option 6
      </div>
    </div>

    <div class="mts-sidebar-footer">
      <div class="mts-orgs-block" style="margin-bottom: 2rem">
        <div class="mts-organization">
          <img
            src="https://i.imgur.com/AOOqa0N.jpg"
            class="mts-organization-logo"
            alt=""
          />

          <div class="mts-organization-info" @click="toggle">
            <p class="mts-organization-info-username">Banco Ultimate</p>
            <span class="mts-organization-info-message">Olá, Ultimate</span>
          </div>
        </div>
        <div v-if="open" class="mts-organization-selector">
          <div class="mts-organization-selector-option">
            <img
              src="https://i.imgur.com/ewZOa95.jpg"
              class="mts-organization-selector-avatar"
              alt=""
            />
            Banco Mercer
          </div>
          <div class="mts-organization-selector-option">
            <img
              src="https://i.imgur.com/ewZOa95.jpg"
              class="mts-organization-selector-avatar"
              alt=""
            />
            Banco Watson
          </div>
          <div class="mts-organization-selector-option">
            <img
              src="https://i.imgur.com/ewZOa95.jpg"
              class="mts-organization-selector-avatar"
              alt=""
            />
            Banco Sasha
          </div>
        </div>
      </div>

      <div class="mts-sidebar-menu">
        <div class="mts-sidebar-option">
          <span class="mts-sidebar-option-icon">
            <font-awesome-icon :icon="['fab', 'twitch']" size="lg" />
          </span>
          Option 1
        </div>
        <div class="mts-sidebar-option">
          <span class="mts-sidebar-option-icon">
            <font-awesome-icon :icon="['fab', 'twitch']" size="lg" />
          </span>
          Option 2
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      open: false,
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
    // orgClicked(org) {
    //   this.toggle()
    //   this.changeOrg(org)
    // },
    // changeOrg(org) {
    //   this.activeData = org
    // },
  },
}
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
.mts-sidebar {
  max-width: 275px;
  height: 90vh;
  padding: 0.5rem 1.25rem;
  display: flex;
  flex-direction: column;
  background-color: white;
  font-family: 'Inter', sans-serif;

  &-brand {
    cursor: pointer;
    padding: 1rem 1.25rem;
    background-color: azure;
    align-items: center;
    margin: 0 auto 24px;
  }

  &-menu {
    display: flex;
    flex-direction: column;
  }

  &-option {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0.5rem 1.25rem;
    margin: 0.25rem 0;
    border-radius: 8px;
    line-height: 1.5;
    position: relative;

    &-icon {
      margin-right: 1rem;
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }

    &-active {
      color: #480bff;
      background-color: lighten(#480bff, 45%);

      ::after {
        content: '>';
        position: absolute;
        margin-left: auto;
      }
    }
  }

  &-footer {
    margin-top: auto;
    margin-bottom: 8px;
  }
}

.mts-orgs-block {
  display: inline-flex;
  flex-direction: column-reverse;
  position: relative;

  .mts-organization-selector {
    width: 100%;
    /* background-color: #fff; */
    background-clip: padding-box;
    border: none;

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
    bottom: 64px;
    /* right: 0; */
    transition: all 0.3s ease-in;

    &-option {
      text-decoration: none;
      color: #212529;
      background-color: #f3f7fe;
      padding: 0.25rem 1.25rem;
      margin: 0.125em 0;
      cursor: pointer;
      display: flex;
      align-items: center;
      border-radius: 8px;

      &:hover {
        background-color: darken(#f3f7fe, 2.5%);
      }
    }

    &-avatar {
      width: 25px;
      height: 25px;
      object-fit: cover;
      border-radius: 8px;
      margin-right: 8px;
    }
  }
}

.mts-organization {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: #f3f7fe;
  border-radius: 8px;
  cursor: pointer;

  &-logo {
    width: 48px;
    height: 48px;
    object-fit: cover;
    border-radius: 20px;
    margin-right: 8px;
  }

  &-info {
    display: flex;
    flex-direction: column;

    &-username {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 2px;
    }

    &-message {
      font-size: 14px;
    }
  }

  &:hover {
    background-color: darken(#f3f7fe, 2.5%);
  }
}
</style>
