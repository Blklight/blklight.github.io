<template>
  <LayoutContent>
    <div class="m-5 p-5">
      <div class="test-svg-div">
        <p class="text-light">Hover</p>
      </div>
    </div>
    <div class="m-5">
      <div class="inverted-border-radius"></div>
    </div>
    <div class="p-5 m-5 bg-dark">
      <div class="my-inverted"></div>
    </div>
    <div
      class="bg-orange my-5 mx-auto background-texture"
      style="width: 300px; height: 300px; border-radius: 50%"
    ></div>
    <div
      class="container my-3 bg-polen background-texture"
      style="height: 800px"
    ></div>

    <div class="card card-body">
      <div class="d-flex flex">
        <div class="d-flex flex-column" style="flex: 1 1 auto">
          <label for="">Gi scope</label>
          <input type="text" class="form-control" />
        </div>
        <div class="d-flex flex-column" style="flex: 1 1 auto">
          <label for="">Gi scope</label>
          <input type="text" class="form-control" />
        </div>
      </div>
    </div>

    <div class="rounded-corners-gradient-borders">test</div>
  </LayoutContent>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "Playground",
  computed: {
    ...mapGetters(["isDarkTheme"]),
  },
};
</script>
<style scoped>
.test-svg-div {
  position: relative;
  height: 96px;
  width: 192px;
  background-color: transparent;
  border-radius: 0px 0px 0px 0px;
}

.test-svg-div::before {
  content: url("~/assets/images/mask.svg");
  position: absolute;
}

.test-svg-div:hover::after {
  filter: opacity(0.25);
}

.test-svg-div::before svg {
  fill: #480bff;
}

.inverted-border-radius {
  position: relative;
  height: 192px;
  width: 192px;
  background-color: #480bff;
  border-radius: 0px 0px 0px 0px;
}

.inverted-border-radius::before {
  content: "";
  position: absolute;

  background-color: transparent;
  top: -50px;
  height: 50px;
  width: 25px;
  border-bottom-left-radius: 25px;
  box-shadow: 0 25px 0 0 #480bff;
}

.my-inverted {
  position: relative;
  width: 192px;
  height: 192px;
  background-color: transparent;
  border-radius: 0px 0px 0px 0px;
  cursor: pointer;
}

.my-inverted::before {
  content: "";
  position: absolute;
  background-color: transparent;

  top: -50px;
  height: 50px;
  width: 192px;
  border-bottom-left-radius: 25%;
  border-bottom-right-radius: 25%;
  box-shadow: 0 25px 0 0 transparent;
}

.my-inverted:hover {
  background-color: #fff1;
}

.my-inverted:hover::before {
  box-shadow: 0 25px 0 0 #fff1 !important;
}
</style>
<style lang="scss">
.header-subb {
  background-image: url("https://i.imgur.com/KMN1KQ5.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 500px;

  &-block {
    max-width: 1200px;
    padding-left: 16px;
    padding-right: 16px;
    margin: 0 auto;
    font-size: 20px;
    position: relative;
    border-radius: 8px;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
  }

  &-content {
    width: 100%;
    min-height: 600px;
    margin-top: -150px;
    background-color: #eaeaea;
    display: grid;
    grid-template-areas:
      "Title Title Title"
      "Text Text Info";
    grid-template-columns: 740px 1fr;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;

    &-title {
      padding: 1.25rem;
      position: relative;
      grid-area: Title;
      border-top-left-radius: 0.5rem;
      border-top-right-radius: 0.5rem;
    }
    &-text {
      padding: 1.25rem;
      box-sizing: border-box;
      max-width: 740px;
      grid-area: Text;
    }

    &-info {
      max-width: 300px;
      padding: 1.25rem;
      grid-area: Info;
    }
  }
}

.rounded-corners-gradient-borders {
  width: 64px;
  height: 64px;
  border: solid 2px transparent;
  border-radius: 50%;
  background-image: linear-gradient(#000000, #000000),
    linear-gradient(#000000, #000000);
  background-origin: border-box;
  background-clip: content-box, border-box;

  &.active-border {
    background-image: linear-gradient(#000000, #000000),
      linear-gradient(to bottom, #f4cd3b, #f16622, #e84856) !important;
  }
}
</style>
