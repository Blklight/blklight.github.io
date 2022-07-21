<template>
  <section class="loading__block">
    <div class="loading__displays">
      <div class="update__block">
        <span class="text__update">Compiling your site</span>
        <span class="text__update">Loading resources</span>
        <span class="text__update">Gathering basics</span>
        <span class="text__update">Step 4</span>
        <span class="text__update">Step 5</span>
        <span class="text__update">Step 6</span>
      </div>
      <div class="detail__block">
        <span class="text__details"
          >Delivering your site to <br />
          187 servers in our edge network</span
        >
        <span class="text__details">
          This loads faster and reduces CO2 emission
        </span>
        <span class="text__details"> Step 3 </span>
        <span class="text__details"> Step 4 </span>
        <span class="text__details"> Step 5 </span>
        <span class="text__details"> Step 6 </span>
      </div>
    </div>
    <!-- <div class="logo__container">
      <BohrAnimatedLogo class="logo__size" />
    </div> -->
  </section>
</template>
<script>
// import BohrAnimatedLogo from "@/components/BohrAnimatedLogo.vue";
export default {
  components: {
    // BohrAnimatedLogo,
  },

  data() {
    return {};
  },
};
</script>
<style scoped>
.logo__container {
  margin-top: 40px;
  display: flex;
  justify-content: center;
}

.logo__size {
  width: 400px;
  height: 400px;
  margin: 0 auto;
  display: block;
}

.loading__block {
  display: block;
  position: relative;
  padding: 16px;
}

.loading__displays {
  display: flex;
}

.update__block {
  display: block;
  position: relative;
  flex: 1 1 auto;
}

.detail__block {
  display: block;
  position: relative;
  flex: 1 1 auto;
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
  animation: dots-yellow 1s steps(5, end) infinite;
}

.text__details {
  margin: 8px 0;
  text-align: right;
  font-size: 24px;
  font-weight: 700;
  color: hsl(181, 69%, 61%);
}

@keyframes dots-yellow {
  0%,
  20% {
    color: hsl(0, 0%, 0%);
    text-shadow: 0.25em 0 0 hsl(0, 0%, 0%), 0.5em 0 0 hsl(0, 0%, 0%);
  }
  40% {
    color: hsl(47, 89%, 59%);
    text-shadow: 0.25em 0 0 hsl(0, 0%, 0%), 0.5em 0 0 hsl(0, 0%, 0%);
  }
  60% {
    text-shadow: 0.25em 0 0 hsl(47, 89%, 59%), 0.5em 0 0 hsl(0, 0%, 0%);
  }
  80%,
  100% {
    text-shadow: 0.25em 0 0 hsl(47, 89%, 59%), 0.5em 0 0 hsl(47, 89%, 59%);
  }
}

@keyframes dots-blue {
  0%,
  20% {
    color: hsl(0, 0%, 0%);
    text-shadow: 0.25em 0 0 hsl(0, 0%, 0%), 0.5em 0 0 hsl(0, 0%, 0%);
  }
  40% {
    color: hsl(181, 69%, 61%);
    text-shadow: 0.25em 0 0 hsl(0, 0%, 0%), 0.5em 0 0 hsl(0, 0%, 0%);
  }
  60% {
    text-shadow: 0.25em 0 0 hsl(181, 69%, 61%), 0.5em 0 0 hsl(0, 0%, 0%);
  }
  80%,
  100% {
    text-shadow: 0.25em 0 0 hsl(181, 69%, 61%), 0.5em 0 0 hsl(181, 69%, 61%);
  }
}

.update__block span:nth-child(1) {
  position: absolute;
  animation-name: slide-update;
  animation-fill-mode: forwards;
  animation-duration: 8s;
  animation-timing-function: ease;
}

.update__block span:nth-child(2) {
  position: absolute;
  opacity: 0;
  animation-name: slide-update;
  animation-fill-mode: forwards;
  animation-duration: 8s;
  animation-delay: 2s;
  animation-timing-function: ease;
}

.update__block span:nth-child(3) {
  opacity: 0;
  position: absolute;
  animation-name: slide-update;
  animation-fill-mode: forwards;
  animation-duration: 8s;
  animation-delay: 4s;
  animation-timing-function: ease;
}

.update__block span:nth-child(4) {
  opacity: 0;
  position: absolute;
  animation-name: slide-update;
  animation-fill-mode: forwards;
  animation-duration: 8s;
  animation-delay: 6s;
  animation-timing-function: ease;
}

.update__block span:nth-child(5) {
  opacity: 0;
  position: absolute;
  animation-name: slide-update;
  animation-fill-mode: forwards;
  animation-duration: 8s;
  animation-delay: 8s;
  animation-timing-function: ease;
}

.update__block span:nth-child(6) {
  opacity: 0;
  position: absolute;
  animation-name: last-slide-update;
  animation-fill-mode: forwards;
  animation-duration: 8s;
  animation-delay: 10s;
  animation-timing-function: ease;
}

.detail__block span:nth-child(1) {
  position: absolute;
  right: 4px;
  animation-name: slide-detail;
  animation-fill-mode: forwards;
  animation-duration: 8s;
  animation-timing-function: ease;
}

.detail__block span:nth-child(2) {
  position: absolute;
  right: 4px;
  opacity: 0;
  animation-name: slide-detail;
  animation-fill-mode: forwards;
  animation-duration: 8s;
  animation-delay: 2s;
  animation-timing-function: ease;
}

.detail__block span:nth-child(3) {
  position: absolute;
  right: 4px;
  opacity: 0;
  animation-name: slide-detail;
  animation-fill-mode: forwards;
  animation-duration: 8s;
  animation-delay: 4s;
  animation-timing-function: ease;
}

.detail__block span:nth-child(4) {
  position: absolute;
  right: 4px;
  opacity: 0;
  animation-name: slide-detail;
  animation-fill-mode: forwards;
  animation-duration: 8s;
  animation-delay: 6s;
  animation-timing-function: ease;
}

.detail__block span:nth-child(5) {
  position: absolute;
  right: 4px;
  opacity: 0;
  animation-name: slide-detail;
  animation-fill-mode: forwards;
  animation-duration: 8s;
  animation-delay: 8s;
  animation-timing-function: ease;
}

.detail__block span:nth-child(6) {
  position: absolute;
  right: 4px;
  opacity: 0;
  animation-name: slide-detail;
  animation-fill-mode: forwards;
  animation-duration: 8s;
  animation-delay: 10s;
  animation-timing-function: ease;
}

@keyframes slide-update {
  0% {
    top: 64px;
    -webkit-transform: translateY(48px) scale(0);
    transform: translateY(48px) scale(0);
    -webkit-transform-origin: bottom left;
    transform-origin: bottom left;
    opacity: 0;
  }

  33.4% {
    top: 40px;
    -webkit-transform: translateY(24px) scale(0.5);
    transform: translateY(24px) scale(0.5);
    -webkit-transform-origin: bottom left;
    transform-origin: bottom left;
    opacity: 0.35;
  }

  66.6% {
    top: 16px;
    -webkit-transform: translateY(0) scale(1);
    transform: translateY(0) scale(1);
    -webkit-transform-origin: bottom left;
    transform-origin: bottom left;
    opacity: 1;
  }

  100% {
    -webkit-transform: translateY(-300px);
    transform: translateY(-300px);
    opacity: 0;
  }
}

@keyframes last-slide-update {
  0% {
    top: 64px;
    -webkit-transform: translateY(48px) scale(0);
    transform: translateY(48px) scale(0);
    -webkit-transform-origin: bottom left;
    transform-origin: bottom left;
    opacity: 0;
  }

  33.4% {
    top: 40px;
    -webkit-transform: translateY(24px) scale(0.5);
    transform: translateY(24px) scale(0.5);
    -webkit-transform-origin: bottom left;
    transform-origin: bottom left;
    opacity: 0.35;
  }

  66.6% {
    top: 16px;
    -webkit-transform: translateY(0) scale(1);
    transform: translateY(0) scale(1);
    -webkit-transform-origin: bottom left;
    transform-origin: bottom left;
    opacity: 1;
  }

  100% {
    top: 16px;
    -webkit-transform: translateY(0) scale(1);
    transform: translateY(0) scale(1);
    -webkit-transform-origin: bottom left;
    transform-origin: bottom left;
    opacity: 1;
  }
}

@keyframes slide-detail {
  0% {
    top: 64px;
    -webkit-transform: translateY(48px) scale(0);
    transform: translateY(48px) scale(0);
    -webkit-transform-origin: bottom right;
    transform-origin: bottom right;
    opacity: 0;
  }

  33.4% {
    top: 40px;
    -webkit-transform: translateY(24px) scale(0.5);
    transform: translateY(24px) scale(0.5);
    -webkit-transform-origin: bottom right;
    transform-origin: bottom right;
    opacity: 0.35;
  }

  66.6% {
    top: 16px;
    -webkit-transform: translateY(0) scale(1);
    transform: translateY(0) scale(1);
    -webkit-transform-origin: bottom right;
    transform-origin: bottom right;
    opacity: 1;
  }

  100% {
    -webkit-transform: translateY(-300px);
    transform: translateY(-300px);
    opacity: 0;
  }
}

@keyframes last-slide-detail {
  0% {
    top: 64px;
    -webkit-transform: translateY(48px) scale(0);
    transform: translateY(48px) scale(0);
    -webkit-transform-origin: bottom right;
    transform-origin: bottom right;
    opacity: 0;
  }

  33.4% {
    top: 40px;
    -webkit-transform: translateY(24px) scale(0.5);
    transform: translateY(24px) scale(0.5);
    -webkit-transform-origin: bottom right;
    transform-origin: bottom right;
    opacity: 0.35;
  }

  66.6% {
    top: 16px;
    -webkit-transform: translateY(0) scale(1);
    transform: translateY(0) scale(1);
    -webkit-transform-origin: bottom right;
    transform-origin: bottom right;
    opacity: 1;
  }

  100% {
    top: 16px;
    -webkit-transform: translateY(0) scale(1);
    transform: translateY(0) scale(1);
    -webkit-transform-origin: bottom right;
    transform-origin: bottom right;
    opacity: 1;
  }
}
</style>
