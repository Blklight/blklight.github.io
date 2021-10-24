import Vue from "vue";
import VueLazyload from "vue-lazyload";

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require("~/static/images/error.jpg"),
  loading: require("~/static/images/loading.jpg"),
  attempt: 1,
});
