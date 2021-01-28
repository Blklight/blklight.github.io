<template>
  <div>
    <header class="email-header">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="email-header-logo"
        width="110"
        height="20"
      >
        <path
          d="M100.414 20a1 1 0 01-.706-1.707l6.543-6.542a1.768 1.768 0 00-2.5-2.5L93.586 19.414a2 2 0 01-1.414.586H91.5a1.5 1.5 0 01-1.5-1.5V2a2 2 0 012-2h7.586a1 1 0 01.707 1.707L93.75 8.25a1.767 1.767 0 002.5 2.5L106.414.586A2 2 0 01107.828 0h.672a1.5 1.5 0 011.5 1.5V18a2 2 0 01-2 2zM69.5 20a2 2 0 01-2-2V2a2 2 0 012-2h16a2 2 0 012 2v16a2 2 0 01-2 2zm2.25-15.75a1.77 1.77 0 000 2.5l9 9a1.768 1.768 0 102.5-2.5l-9-9a1.769 1.769 0 00-2.5 0zM47 20a2 2 0 01-2-2V2a2 2 0 012-2h16a2 2 0 012 2v13.086a1 1 0 01-1.707.707L58 10.5a1.768 1.768 0 10-2.5 2.5l5.294 5.293A1 1 0 0160.086 20zm4.25-16.25l-2.5 2.5a1.768 1.768 0 002.5 2.5l2.5-2.5a1.768 1.768 0 00-2.5-2.5zM24.5 20a2 2 0 01-2-2V4.914a1 1 0 011.707-.707L28 8a1.768 1.768 0 102.5-2.5l-3.792-3.793A1 1 0 0127.414 0H40.5a2 2 0 012 2v13.086a1 1 0 01-1.707.707L37 12a1.768 1.768 0 00-2.5 2.5l3.793 3.793A1 1 0 0137.586 20zM2 20a2 2 0 01-2-2V2a2 2 0 012-2h13.086a1 1 0 01.707 1.707L4.75 12.75a1.768 1.768 0 002.5 2.5L18.292 4.207A1 1 0 0120 4.914V18a2 2 0 01-2 2z"
          fill="#fff"
        />
      </svg>
    </header>
    <div class="email-container">
      <section class="email-body">
        <h4 class="email-body-receiver">Ultimate Mercer</h4>
        <h4 class="email-body-subtitle">Precisamos da sua confirmação</h4>
        <p class="email-body-description">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde vel
          maiores eos consectetur ex minima esse iste, neque numquam est
          dolores.
        </p>

        <div class="email-box">
          <p class="email-box-title">Código de acesso</p>
          <h1 class="email-box-code">123456</h1>
        </div>
        <!-- <div>
          <p class="email-body-description">Obrigada,</p>
          <p class="email-body-description" style="margin-bottom: 0">
            Time CHAOS
          </p>
        </div> -->
      </section>
    </div>

    <div class="linear-background" style="width: 100%; height: 500px">
      <div style="">
        <div class="email-container">
          <p
            class="email-body-description"
            style="margin-top: 0; padding-top: 8px"
          >
            Obrigada,
          </p>
          <p class="email-body-description" style="margin-bottom: 0">
            Time CHAOS
          </p>
        </div>
      </div>
    </div>
    <footer style="background-color: #000; padding: 12px">
      <p style="color: #ffffff; text-align: center">
        <a class="email-cancel-subscription" href="">Cancelar inscrição</a> de
        qualquer comunicação relativa a este convite.
      </p>
      <p style="color: #ffffff; text-align: center">
        Feito movido a Música, e com o coração por BOHR
      </p>
    </footer>
  </div>
</template>
<script>
import image from "static/rock-in-rio.png";
export default {
  data() {
    return {
      rockInRio: image,
    };
  },
};
</script>
<style>
.email-container {
  margin-left: auto;
  margin-right: auto;
  padding-left: 32px;
  padding-right: 32px;
  background-color: #000000;
}
.email-header {
  padding: 40px 0;
  background-color: #000000;
}
.email-header-logo {
  margin: 24px auto;
  display: block;
}
.email-body {
  padding: 16px 0 16px;
}
.email-body-receiver {
  color: #00b9fe;
  text-transform: uppercase;
  font-family: "Interstate-BlackCondItalic", "Source Sans Pro", fantasy;
  font-style: italic;
  font-weight: 900;
  margin: 0;
  font-size: 24px;
}
.email-body-subtitle {
  color: #fff;
  text-transform: uppercase;
  font-family: "Interstate-BlackCondItalic", "Source Sans Pro", fantasy;
  font-style: italic;
  font-weight: 900;
  margin: 0;
  font-size: 24px;
}
.email-body-description {
  color: #fff;
  margin: 24px 0;
  line-height: 1.5;
}
.email-box {
  background-color: #1a1a1a;
  border-radius: 4px;
}
.email-box-title {
  color: #fff;
  text-align: center;
  padding: 16px 0;
  margin: 0;
  text-transform: uppercase;
  font-weight: bold;
}
.email-box-code {
  color: #00b9fe;
  text-align: center;
  font-style: italic;
  font-weight: bold;
  padding: 0 0 20px;
  letter-spacing: 12px;
  font-size: 50px;
  margin: 0;
}
.email-cancel-subscription {
  color: #fff;
  text-decoration: underline;
}

.linear-background {
  background-image: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0) 20%,
      rgba(0, 0, 0, 1) 80%
    ),
    url("../static/rock-in-rio.png");
  background-position: top, center;
  background-size: cover, cover;
  background-repeat: no-repeat;
}
</style>
