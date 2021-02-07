<template>
  <div class="bg-light">
    <div class="main-layout">
      <div class="main-layout-header">
        <header class="header-grid">
          <div class="logo">
            <img
              src="~/static/blklight-base.svg"
              width="180"
              class="logo-image"
              alt=""
            />
          </div>
          <div class="menu">
            <div class="menu-void"></div>
            <div class="menu-items">
              <!-- <h6>O TREND</h6>
              <h6>PLANTAS</h6>
              <h6>DIFERENCIAIS</h6>
              <h6>GALERIA</h6>
              <h6>IMPLANTAÇÃO</h6>
              <h6>CONTATO</h6>
              <h6>LOCALIZAÇÃO</h6> -->
              <ul class="menu-list">
                <li class="list-item"><h6>O TREND</h6></li>
                <li class="list-item"><h6>PLANTAS</h6></li>
                <li class="list-item"><h6>DIFERENCIAIS</h6></li>
                <li class="list-item"><h6>GALERIA</h6></li>
                <li class="list-item"><h6>IMPLANTAÇÃO</h6></li>
                <li class="list-item"><h6>CONTATO</h6></li>
                <li class="list-item"><h6>LOCALIZAÇÃO</h6></li>
              </ul>
            </div>
            <!-- <ul>
            <li><a href="">Teste</a></li>
            <li><a href="">Teste</a></li>
            <li><a href="">Teste</a></li>
            <li><a href="">Teste</a></li>
            <li><a href="">Teste</a></li>
          </ul> -->
            <!-- <h6>O TREND</h6>
            <h6>PLANTAS</h6>
            <h6>DIFERENCIAIS</h6>
            <h6>GALERIA</h6>
            <h6>IMPLANTAÇÃO</h6>
            <h6>CONTATO</h6>
            <h6>LOCALIZAÇÃO</h6> -->
          </div>
        </header>
      </div>

      <div class="main-layout-content">
        <div class="grid-content">
          <h1 style="padding: 8px 16px">DIFERENCIAIS TORRE CORPORATE</h1>
          <div class="grid-content-picture">
            <img
              src="https://i.imgur.com/ehfbNpw.jpg"
              class="content-image"
              alt=""
            />
          </div>
        </div>

        <div class="grid-content-info">
          <div class="content-info">
            <div class="column-1">
              <ul style="list-style-type: square; font-style: italic">
                <li><h6>18 andares</h6></li>
                <li><h6>16 pavimentos tipo</h6></li>
              </ul>
            </div>
            <div class="column-2">
              <ul style="list-style-type: square; font-style: italic">
                <li><h6>6 elevadores de última geração</h6></li>
                <li><h6>2 salas de reuniões</h6></li>
              </ul>
            </div>
            <div class="column-3">
              <ul style="list-style-type: square; font-style: italic">
                <li><h6>Auditório para 90 pessoas</h6></li>
                <li><h6>Hall com pé direito duplo</h6></li>
              </ul>
            </div>
            <div class="column-4">
              <ul style="list-style-type: square; font-style: italic">
                <li><h6>Areas comuns entregues decoradas e equipadas</h6></li>
                <li><h6>Doca para carga e descarga</h6></li>
                <li><h6>Central de facilities</h6></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="main-layout-footer">
        <div style="text-align: right; padding: 32px 8px">
          <h5 style="font-style: italic">
            Visite o estande de vendas na Avenida Senador Tarso Dutra, nº 577
          </h5>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.main-layout {
  display: grid;
  grid-gap: 8px;
  width: 100%;
  max-width: 1140px;
  margin: 0 auto;
  grid-template-areas:
    "header"
    "content"
    "footer";
  &-header {
    grid-area: header;
    max-width: 100%;
  }

  &-content {
    grid-area: content;
    max-width: 100%;
  }

  &-footer {
    grid-area: footer;
    max-width: 100%;
  }
}

.header-grid {
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-template-areas: "logo menu";
  min-height: 200px;
}

.grid-content {
  width: 100%;
  max-width: 100%;
  grid-template-columns: 100%;
  gap: 0px 0px;
  grid-template-areas: "picture" "info";

  &-picture {
    margin: 8px 0;
    grid-area: picture;
    max-width: 100%;
  }

  &-info {
    grid-area: info;
    max-width: 100%;
  }
}

.content-image {
  width: 100%;
  height: 350px;
  object-fit: cover;
}

.content-info {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  grid-gap: 8px;
  grid-template-areas: "column-1 column-2 column-3 column-4";
  padding: 16px;
  min-height: 200px;
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;

  &-image {
    margin: 0 auto;
    display: block;
  }
}

.menu {
  //   display: flex;
  //   justify-content: space-between;
  //   margin-top: auto;
  padding: 0 8px;
  &-void {
    height: 50%;
    display: block;
  }
  &-items {
    height: 50%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  ul {
    list-style: none;
    padding-inline-start: 0 !important;
    display: content;
  }

  .list-item {
    display: inline-block;
    padding: 16px 8px;

    a {
      color: #000000;
      text-decoration: none;
      font-size: 20px;
    }
  }
}

@media screen and (max-width: 992px) {
  .header-grid {
    width: 100%;
    max-width: 100%;
    grid-template-columns: 100%;
    gap: 0px 0px;
    grid-template-areas: "logo" "menu";
  }

  .menu {
    //   display: flex;
    //   justify-content: space-between;
    //   margin-top: auto;
    &-void {
      display: none;
    }
    &-items {
      height: auto;
      display: block;
      padding: 8px;
    }
    .list-item {
      display: block;
      text-align: center;
      padding: 4px 8px;
    }
  }
  .content-info {
    display: grid;
    width: 100%;
    max-width: 100%;
    grid-template-columns: 100%;
    gap: 0px 0px;
    grid-template-areas: "column-1" "column-2" "column-3" "column-4";
  }
}
</style>
