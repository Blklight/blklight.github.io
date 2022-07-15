<!-- eslint-disable vue/no-v-html -->
<template>
  <section class="d-block relative p-2 bg-dark">
    <header>
      <div class="update__block">
        <span class="d-block text__update">Step 1</span>
        <span class="d-block text__update">Step 2</span>
        <span class="d-block text__update">Step 3</span>
        <!-- <span class="d-block text__update">Step 4</span>
        <span class="d-block text__update">Step 5</span>
        <span class="d-block text__update">Step 6</span> -->
      </div>
    </header>
  </section>
</template>
<script>
export default {
  data() {
    return {
      percent: 0,
      text: "",
      classEffect: "",
      isShowEffect: undefined,
      steps: ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5"],
    };
  },

  mounted() {
    // setTimeout(() => {
    //   this.updateLoading(this.steps);
    // }, 2000);
  },

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
.update__block {
  display: block;
  position: relative;
}

.text__update {
  margin: 8px 0;
  color: hsl(47, 89%, 59%);
  font-size: 36px;
  font-weight: 700;
  display: block;
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

.sliding-one {
  animation: slide-first 5s forwards ease-out;
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
</style>
<style scoped>
.update__block span:nth-child(1) {
  position: absolute;
  animation-name: slide-sample;
  animation-fill-mode: forwards;
  animation-duration: 6s;
  animation-timing-function: ease;
}

.update__block span:nth-child(2) {
  position: absolute;
  opacity: 0;
  animation-name: slide-sample;
  animation-fill-mode: forwards;
  animation-duration: 6s;
  animation-delay: 3s;
  animation-timing-function: ease;
}

.update__block span:nth-child(3) {
  opacity: 0;
  position: absolute;
  animation-name: slide-sample;
  animation-fill-mode: forwards;
  animation-duration: 6s;
  animation-delay: 6s;
  animation-timing-function: ease;
}

@keyframes slide-sample {
  0% {
    top: 64px;
    -webkit-transform: translateY(48px) scale(0);
    transform: translateY(48px) scale(0);
    -webkit-transform-origin: initial, left left;
    transform-origin: initial, left left;
    opacity: 0;
  }

  33.4% {
    top: 40px;
    -webkit-transform: translateY(24px) scale(0.5);
    transform: translateY(24px) scale(0.5);
    -webkit-transform-origin: initial, left left;
    transform-origin: initial, left left;
    opacity: 0.5;
  }

  66.6% {
    top: 16px;
    -webkit-transform: translateY(0) scale(1);
    transform: translateY(0) scale(1);
    -webkit-transform-origin: initial, left left;
    transform-origin: initial, left left;
    opacity: 1;
  }

  100% {
    -webkit-transform: translateY(-300px);
    transform: translateY(-300px);
    opacity: 0;
  }
}
</style>
