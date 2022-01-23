<template>
  <main>
    <div class="container bg-light p-5">
      <div class="d-flex">
        <template v-for="parent in parents">
          <span
            :key="parent.id"
            class="badge badge-tag"
            :class="[
              activeParents.includes(parent.id) ? 'bg-orange' : 'bg-dark',
            ]"
            @click.prevent="toggleParent(parent)"
          >
            {{ parent.title }}
          </span>
        </template>
      </div>
      <div class="d-flex">
        <template v-for="tag in tags">
          <span
            :key="tag.id"
            class="badge"
            :class="[
              activeTags.includes(tag)
                ? 'bg-neon-yellow text-dark'
                : 'bg-secondary text-dark',
            ]"
            :title="tag.title"
            @click.prevent="toggleChildren(tag)"
          >
            {{ tag.title }}
          </span>
        </template>
      </div>
      <div class="text-dark mt-5">
        <h2 class="">Active Parents</h2>
        <pre>{{ activeParents }}</pre>
      </div>
      <div class="text-dark mt-5">
        <h2 class="">Tags</h2>
        <pre>{{ tags }}</pre>
      </div>
      <div class="text-dark mt-5">
        <h2 class="">ActiveTags</h2>
        <pre>{{ activeTags }}</pre>
      </div>
    </div>
    <div class="first">
      <div class="second">
        <div class="third">
          <FlexSidebar />
          <!-- <div class="element-left">
            <nav>
              <div class="element-left-content">
                <div class="element-left-brand">
                  <img
                    :src="logo"
                    title="Ultimate Mercer"
                    width="60"
                    class="mx-auto d-block"
                  />
                </div>
                <div class="element-left-block">
                  <div class="element-left-links">
                    <img
                      :src="logo"
                      title="Ultimate Mercer"
                      width="40"
                      class="filter-cyberpunk-v mx-auto d-block"
                    />
                  </div>
                  <div class="element-left-links">
                    <img
                      :src="logo"
                      title="Ultimate Mercer"
                      width="40"
                      class="filter-cyberpunk-v mx-auto d-block"
                    />
                  </div>
                  <div class="element-left-links">
                    <img
                      :src="logo"
                      title="Ultimate Mercer"
                      width="40"
                      class="filter-cyberpunk-v mx-auto d-block"
                    />
                  </div>
                </div>
                <div class="element-left-block">
                  <div class="element-left-links">
                    <img
                      :src="logo"
                      title="Ultimate Mercer"
                      width="40"
                      class="filter-cyberpunk-purple-red-orange mx-auto d-block"
                    />
                  </div>
                </div>
              </div>
            </nav>
          </div> -->

          <footer class="element-footer">
            <div class="element-footer-content">
              <div class="element-footer-container">
                <div class="element-footer-items">
                  <img
                    :src="logo"
                    title="Ultimate Mercer"
                    width="30"
                    class="mx-auto d-block"
                  />
                </div>
                <div class="element-footer-items">
                  <img
                    :src="logo"
                    title="Ultimate Mercer"
                    width="30"
                    class="mx-auto d-block"
                  />
                </div>
                <div class="element-footer-items">
                  <img
                    :src="logo"
                    title="Ultimate Mercer"
                    width="30"
                    class="mx-auto d-block"
                  />
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import Logo from '@/assets/images/ultimate-logo-red.svg'
export default {
  data() {
    return {
      logo: Logo,
      parents: [
        {
          id: 1,
          title: 'Ultimates',
        },
        {
          id: 2,
          title: 'Prototype',
        },
        {
          id: 3,
          title: 'Super Saiyans',
        },
      ],
      templateChildrens: [
        {
          id: 1,
          title: 'Mercer',
          parentId: 1,
        },
        {
          id: 2,
          title: 'Alex J. Mercer',
          parentId: 2,
        },
        {
          id: 3,
          title: 'Goku',
          parentId: 3,
        },
        {
          id: 4,
          title: 'Vegeta',
          parentId: 3,
        },
        {
          id: 5,
          title: 'Dana Mercer',
          parentId: 2,
        },
        {
          id: 6,
          title: 'Watson',
          parentId: 1,
        },
      ],
      childrens: [],
      tags: [],
      activeParents: [],
      activeTags: [],
    }
  },
  methods: {
    toggleParent(parent) {
      const isActive = this.activeParents.includes(parent.id) // true or false
      // const children = this.tags.filter(id => id === parent.id)
      if (isActive) {
        // this.activeParents.filter(id=> id !== parent.id)
        const index = this.activeParents.indexOf(parent.id)
        if (index > -1) {
          this.activeParents.splice(index, 1)
        }
        console.log(this.activeParents)
        return
      }
      this.activeParents.push(parent)
      this.checkChildrenByParents(parent)
      console.log(this.activeParents)
    },
    toggleChildren(children) {
      const isActive = this.activeTags.includes(children)
      // eslint-disable-next-line no-debugger
      debugger
      if (isActive) {
        this.activeTags.find((id) => id !== children.id)
        const index = this.activeTags.indexOf(children)
        if (index > -1) {
          this.activeTags.splice(index, 1)
        }
        return
      }
      this.activeTags.push(children)
      // eslint-disable-next-line no-debugger
      debugger
    },
    checkChildrenByParents(parent) {
      const isActive = this.activeTags.includes(parent.id)
      // eslint-disable-next-line no-debugger
      debugger
      if (isActive) {
        this.activeTags.find((obj) => obj.parentId !== parent.id)
        const index = this.activeTags.indexOf()
        if (index > -1) {
          this.activeTags.splice(index, 1)
        }
        return
      }
      console.log(parent)
      const mappedTags = this.templateChildrens
        .filter((obj) => obj.parentId === parent.id)
        .map((obj) => ({
          ...obj,
        }))
      debugger
      console.log(JSON.stringify(this.tags, undefined, 2))
      console.log(JSON.stringify(mappedTags, undefined, 2))
      const order = []
      order.unshift(mappedTags)
      console.log('Order', JSON.stringify(order, undefined, 2))
      debugger
      for (let i = mappedTags.length - 1; i >= 0; i--) {
        const element = mappedTags[i]
        this.toggleChildren(element)
        const filter = this.tags.find((obj) => obj.id === element.id)
        const isTrue = filter
        if (!isTrue) {
          this.tags.unshift(element)
        }
      }
      this.filterDuplicates()
    },
    filterDuplicates() {
      this.activeParents = Array.from(
        new Set(this.activeParents.map((obj) => obj.id))
      ).map((id) => {
        return this.activeParents.find((e) => e.id === id)
      })
      this.activeTags = Array.from(
        new Set(this.activeTags.map((obj) => obj.id))
      ).map((id) => {
        return this.activeTags.find((e) => e.id === id)
      })
    },
  },
}
</script>
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,700;1,400;1,700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,400;1,700&display=swap');
*,
::before,
::after {
  box-sizing: inherit;
}

body {
  text-rendering: optimizeLegibility;
  color: rgba(0, 0, 0, 0.8);
  font-weight: 400;
  font-family: 'Inter', sans-serif;
}

.first {
  display: block;
  background-color: #ebebeb;
}

.second {
  max-width: 1600px;
  margin: auto;
}

.third {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.element-left {
  background-color: transparent;
  width: 80px;
  min-height: 80vh;
  flex-shrink: 1;
  border: 2px solid #121212;
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;

  nav {
    height: 100%;
  }

  &-block {
    display: block;
  }
  &-content {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    top: 0;
    position: sticky;
    z-index: 10;
    height: 100%;
  }

  &-brand {
    padding: 2rem 0;
    text-align: center;
  }

  &-links {
    padding-bottom: 2rem;
  }
}

.element-footer {
  display: block;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 500;

  &-block {
    display: block;
  }

  &-content {
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    height: 60px;
    position: relative;
    background-color: #fff6dd;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 10px;
    z-index: 600;
  }
  &-container {
    height: 100%;
    display: flex;
    justify-content: space-between;
  }

  &-items {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1 1 0%;
  }
}
</style>
