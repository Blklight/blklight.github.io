export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: "static",

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "Blklight",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "preconnect", href: "https://fonts.gstatic.com" },
      // {
      //   rel: "stylesheet",
      //   href:
      //     "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap",
      // },
      // {
      //   rel: "stylesheet",
      //   href:
      //     "https://fonts.googleapis.com/css2?family=Overpass:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap",
      // },
      // {
      //   rel: "stylesheet",
      //   href:
      //     "https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,700;1,400;1,700&display=swap",
      // },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Fira+Mono:wght@400;500;700&display=swap",
      },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    // CSS file in the project
    "~/assets/style/css/ultimate.css",
    // SCSS file in the project
    "~/assets/style/scss/extra.scss",
  ],
  loading: {
    color: "#ffff00",
    height: "8px",
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ["~/plugins/vue-lazyload"],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    "@nuxtjs/eslint-module",
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "bootstrap-vue/nuxt",
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    // https://go.nuxtjs.dev/content
    "@nuxt/content",
    [
      "nuxt-fontawesome",
      {
        imports: [
          {
            set: "@fortawesome/free-solid-svg-icons",
            icons: ["fas"],
          },
          {
            set: "@fortawesome/free-brands-svg-icons",
            icons: ["fab"],
          },
        ],
      },
    ],
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {
    markdown: {
      prism: {
        // theme: "prism-themes/themes/prism-xonokai.css",
        // theme: "prism-themes/themes/prism-synthwave84.css",
        theme: "prism-themes/themes/prism-dracula.css",
        // theme: "prism-themes/themes/prism-shades-of-purple.css",
      },
    },
  },

  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false,
    componentsPlugin: ["NavbarPlugin"],
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: ["masonry-layout", "vue-lazyload"],
  },

  generate: {
    async ready() {
      const { $content } = require("@nuxt/content");
      const files = await $content().only(["slug"]).fetch();
      console.log(files);
    },
  },
};
