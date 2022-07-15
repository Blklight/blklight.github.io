<!-- <template>
  <section>
    <header style="display: flex">
      <div
        :class="[isShowEffect ? 'fade-in-bottom' : 'fade-out-top']"
        style="flex: 1 1 auto"
      >
        <h4 class="text__update">{{ text }}</h4>
      </div>
      <div style="flex: 1 1 auto">
        <h4 class="text__details">Delivering your site</h4>
      </div>
    </header>
    <div style="margin-top: 40px; display: flex; justify-content: center">
      <BohrAnimatedLogo style="width: 450px; height: 450px" />
    </div>
  </section>
</template>
<script>
import BohrAnimatedLogo from "@/components/BohrAnimatedLogo.vue";
export default {
  components: {
    BohrAnimatedLogo,
  },

  data() {
    return {
      percent: 0,
      text: "...",
      classEffect: "",
      isShowEffect: false,
    };
  },

  created() {
    this.text = "Compiling your site...";
    this.percent = 0;

    this.classEffect = "fade-out-top";

    setTimeout(() => {
      this.classEffect = "fade-in-bottom";
      this.text = "Loading resources...";
      this.classEffect = "";
    }, 4000);

    this.classEffect = "fade-out-top";
    setTimeout(() => {
      this.classEffect = "fade-in-bottom";
      this.text = "Gathering basics";
      this.classEffect = "";
    }, 8000);
  },

  methods: {
    updateLoading(text) {
      setTimeout(() => {
        this.classEffect = "fade-in-bottom";
        this.text = text;
      });
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

.text__details {
  margin: 8px 0;
  text-align: right;
  font-size: 24px;
  color: hsl(181, 69%, 61%);
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
</style> -->
