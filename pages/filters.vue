<template>
  <div class="container-fluid">
    <div class="col-xl-10 col-12 offset-xl-1 offset-0 px-xl-0 px-1">
      <div class="row">
        <div
          class="col-lg-4 col-md-6 col-12"
          v-for="(image, i) in images"
          :key="i"
        >
          <img
            :src="image"
            style="width: 100%; height: 500px; object-fit: cover"
            alt=""
            class="my-3 cyberpunk-header"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      images: [
        "https://i.imgur.com/ehfbNpw.jpg",
        "https://i.imgur.com/1gVEZe8.jpg",
        "https://i.imgur.com/Te8hqVv.jpg",
        "https://i.imgur.com/2knteJY.jpg",
        "https://i.imgur.com/o4mBUq7.jpg",
        "https://i.imgur.com/sOmHqeY.jpg",
        "https://i.imgur.com/BEE0pup.jpg",
        "https://i.imgur.com/IrBQ86R.jpg",
        "https://i.imgur.com/aFm7mOf.jpg",
        "https://i.imgur.com/zB8t0rm.jpg",
        "https://i.imgur.com/VTAHBAZ.jpg",
        "https://i.imgur.com/0Dym5bt.png",
        "https://i.imgur.com/Uu6hUyL.jpg",
        "https://i.imgur.com/CuYYwqN.jpg",
        "https://i.imgur.com/3fnDbHr.jpg",
        "https://i.imgur.com/LNUdGZa.jpg",
        "https://i.imgur.com/Uyec0sm.png",
        "https://i.imgur.com/SXvgow8.jpg",
        "https://i.imgur.com/PAsyPjn.png",
        "https://i.imgur.com/Wlby4aP.png",
        "https://i.imgur.com/yYIETXl.png",
        "https://i.imgur.com/DiWIjes.png",
        "https://i.imgur.com/nM1cqGJ.png",
        "https://i.imgur.com/4HMvogD.jpg",
        "https://i.imgur.com/8KcOpDy.jpg",
        "https://i.imgur.com/X6INuFY.jpg",
        "https://i.imgur.com/Y1huHQr.jpg",
      ],
    };
  },

  created() {
    this.randomImages();
  },

  methods: {
    randomImages() {
      const imagesArray = this.images;
      this.images = imagesArray.sort(() => Math.random() - 0.5);
    },
  },
};
</script>
