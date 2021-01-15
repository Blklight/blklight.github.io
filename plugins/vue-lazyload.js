import Vue from "vue";
import VueLazyload from "vue-lazyload";

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require("~/static/ultimate-logo.jpg"),
  loading: require("~/static/ultimate-logo.jpg"),
  attempt: 1,
});
