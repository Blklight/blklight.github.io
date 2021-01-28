<template>
  <div>
    <header class="email-header">
      <img src="../static/chaos.png" class="email-header-logo" alt="" />
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
    <footer style="background-color: #000; padding: 20px">
      <p style="color: #ffffff; text-align: center; font-size: 12px">
        <a class="email-cancel-subscription" href="">Cancelar inscrição</a> de
        qualquer comunicação relativa a este convite.
      </p>
      <p
        style="
          color: #ffffff;
          text-align: center;
          font-size: 12px;
          margin-bottom: 0;
        "
      >
        Feito movido a <img src="../static/song.png" alt="" />, e com o coração
        <img src="../static/heart.png" alt="" /> por BOHR
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
  font-size: 32px;
}
.email-body-subtitle {
  color: #fff;
  text-transform: uppercase;
  font-family: "Interstate-BlackCondItalic", "Source Sans Pro", fantasy;
  font-style: italic;
  font-weight: 900;
  margin: 0;
  font-size: 32px;
}
.email-body-description {
  color: #fff;
  margin: 24px 0;
  line-height: 1.5;
  font-size: 16px;
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

.email-cancel-subscription:hover {
  color: #fff;
  text-decoration: underline;
  cursor: pointer;
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
