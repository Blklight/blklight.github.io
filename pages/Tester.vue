<template>
  <section class="d-block relative p-2">
    <!-- <span class="sliding-text">Sliding text</span>
    <span class="sliding-text-two">Sliding text</span>
    <span class="sliding-text-three">Sliding text</span> -->
    <header style="display: flex">
      <div :class="[setAnimationClass]" style="flex: 1 1 auto">
        <h4 class="text__update">{{ text }}</h4>
      </div>
      <div style="flex: 1 1 auto">
        <h4 class="text__details">Delivering your site</h4>
      </div>
    </header>
    <!-- <div style="margin-top: 40px; display: flex; justify-content: center">
      <BohrAnimatedLogo style="width: 450px; height: 450px" />
    </div> -->
  </section>
</template>
<script>
// import BohrAnimatedLogo from "@/components/BohrAnimatedLogo.vue";
export default {
  // components: {
  //   BohrAnimatedLogo,
  // },

  data() {
    return {
      percent: 0,
      text: "",
      classEffect: "",
      isShowEffect: undefined,
      steps: ["Step 1", "Step 2", "Step 3"],
    };
  },
  computed: {
    setAnimationClass() {
      let effect;
      if (this.isShowEffect === true) {
        effect = "fade-in-bottom";
      }

      if (this.isShowEffect === false) {
        effect = "fade-out-top";
      }
      console.log(effect);
      return effect;
    },
  },
  created() {},

  mounted() {
    setTimeout(() => {
      this.updateLoading(this.steps);
    }, 2000);
  },

  updated() {},

  methods: {
    updateLoading(array) {
      for (let i = 0; i < array.length; i++) {
        setTimeout(() => {
          // setTimeout(() => {
          //   this.isShowEffect = false;
          // }, 1000);
          this.isShowEffect = false;
          console.log("start", this.isShowEffect);
          const element = array[i];
          this.isShowEffect = true;
          this.text = element;
          console.log(element, this.isShowEffect);
          setTimeout(() => {
            this.isShowEffect = undefined;
            console.log("end", this.isShowEffect);
          }, 2000);
        }, i * 5000);
      }
    },
  },
};
</script>
<style scoped>
.text__update {
  margin: 8px 0;
  color: hsl(47, 89%, 59%);
  font-size: 36px;
}

.text__update:after {
  content: " . ";
  animation: dots 1s steps(5, end) infinite;
}

.text__details {
  margin: 8px 0;
  text-align: right;
  font-size: 24px;
  color: hsl(181, 69%, 61%);
}

@keyframes dots {
  0%,
  20% {
    color: rgba(0, 0, 0, 0);
    text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0);
  }
  40% {
    color: hsl(47, 89%, 59%);
    text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0);
  }
  60% {
    text-shadow: 0.25em 0 0 hsl(47, 89%, 59%), 0.5em 0 0 rgba(0, 0, 0, 0);
  }
  80%,
  100% {
    text-shadow: 0.25em 0 0 hsl(47, 89%, 59%), 0.5em 0 0 hsl(47, 89%, 59%);
  }
}

@-webkit-keyframes fade-in-bottom {
  0% {
    -webkit-transform: translateY(50px);
    transform: translateY(50px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes fade-in-bottom {
  0% {
    -webkit-transform: translateY(50px);
    transform: translateY(50px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
}

@-webkit-keyframes fade-out-top {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateY(-50px);
    transform: translateY(-50px);
    opacity: 0;
  }
}
@keyframes fade-out-top {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateY(-50px);
    transform: translateY(-50px);
    opacity: 0;
  }
}

.fade-in-bottom {
  -webkit-animation: fade-in-bottom 0.6s cubic-bezier(0.39, 0.575, 0.565, 1)
    both;
  animation: fade-in-bottom 0.6s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}

.fade-out-top {
  -webkit-animation: fade-out-top 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: fade-out-top 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}
@keyframes loadText {
  0% {
    content: "Hi";
  }
  100% {
    content: "How do you like it?";
  }
}
</style>

<style lang="scss">
@keyframes loadText {
  0% {
    content: "Hi";
  }
  100% {
    content: "How do you like it?";
  }
}

@keyframes slideText {
  0% {
    top: 0;
  }
  25% {
    top: -1.2em;
  }
  50% {
    top: -2.4em;
  }
  75% {
    top: -3.6em;
  }
  100% {
  }
}

@-webkit-keyframes fade-in-bottom-custom {
  0% {
    -webkit-transform: translateY(50px);
    transform: translateY(50px);
    opacity: 0;
    font-size: 25% !important;
  }
  25% {
    -webkit-transform: translateY(25px);
    transform: translateY(25px);
    opacity: 0.5;
    font-size: 50% !important;
  }
  50%,
  75% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
    font-size: 100% !important;
  }
  100% {
    -webkit-transform: translateY(-50px);
    transform: translateY(-50px);
    opacity: 0;
    font-size: 100% !important;
  }
}
@keyframes fade-in-bottom-custom {
  0% {
    -webkit-transform: translateY(50px);
    transform: translateY(50px);
    opacity: 0;
  }
  25% {
    -webkit-transform: translateY(25px);
    transform: translateY(25px);
    opacity: 0.5;
  }
  50%,
  75% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateY(-50px);
    transform: translateY(-50px);
    opacity: 0;
    /* display: none; */
  }
}

@keyframes scale-text {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
    -webkit-transform-origin: bottom left;
    transform-origin: bottom left;
    /* opacity: 1; */
  }

  25% {
    -webkit-transform: scale(0.25);
    transform: scale(0.25);
    -webkit-transform-origin: bottom left;
    transform-origin: bottom left;
    /* opacity: 1; */
  }

  50%,
  75% {
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
    -webkit-transform-origin: bottom left;
    transform-origin: bottom left;
    /* opacity: 1; */
  }

  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-transform-origin: bottom left;
    transform-origin: bottom left;
    /* opacity: 1; */
  }
}

@keyframes sliding {
  0% {
    display: block;
    -webkit-transform: scale(0);
    transform: scale(0);
    -webkit-transform-origin: bottom left;
    transform-origin: bottom left;
    top: 50px;
  }
  20% {
    display: block;

    -webkit-transform: scale(0.25);
    transform: scale(0.25);
    -webkit-transform-origin: bottom left;
    transform-origin: bottom left;
    top: 25px;
  }
  40% {
    display: block;

    -webkit-transform: scale(0.5);
    transform: scale(0.5);
    -webkit-transform-origin: bottom left;
    transform-origin: bottom left;
    top: 12px;
  }
  60% {
    display: block;

    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-transform-origin: bottom left;
    transform-origin: bottom left;
    top: 6px;
  }
  80% {
    display: block;

    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-transform-origin: bottom left;
    transform-origin: bottom left;
    top: 0px;
  }
  100% {
    display: block;

    -webkit-transform: translateY(-500px);
    transform: translateY(-500px);
    visibility: hidden;
    /* transform-origin: left; */
  }
}

.sliding-text {
  /* display: block; */
  position: absolute;
  font-size: 2rem;
  font-weight: 700;
  animation: sliding 3s forwards;
}

.sliding-text-two {
  /* display: block; */
  position: absolute;
  font-size: 2rem;
  font-weight: 700;
  animation: sliding 5s forwards;
  animation-delay: 2s;
}

.sliding-text-three {
  /* display: block; */
  position: absolute;
  font-size: 2rem;
  font-weight: 700;
  animation: sliding 7s forwards;
  /* animation-delay: 2s; */
}
</style>
