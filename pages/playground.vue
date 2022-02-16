<template>
  <LayoutContent>
    <div class="header-subb" style=""></div>
    <div class="header-subb-block">
      <div class="header-subb-content background-texture">
        <div class="header-subb-content-title">
          <h2>Ultimates</h2>
        </div>
        <div class="header-subb-content-text">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi ab
            distinctio error repudiandae vitae maxime fugit! Recusandae est cum
            ex magni? Delectus amet animi mollitia nostrum aspernatur magnam
            deleniti sunt.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla,
            fuga ipsum sit illum culpa accusantium. Qui aut, totam ratione
            deserunt suscipit quia reprehenderit fuga doloremque exercitationem
            explicabo, officiis vero mollitia.
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum,
            consequuntur beatae ratione dolore, voluptatibus adipisci temporibus
            voluptatem vero soluta expedita, deserunt eligendi! Corporis
            possimus obcaecati in dolores minus modi ab.
          </p>
        </div>
        <div class="header-subb-content-info">
          <img
            src="https://i.imgur.com/KMN1KQ5.jpg"
            class="img-fluid rounded"
            alt=""
          />
        </div>
      </div>
    </div>
  </LayoutContent>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "Playground",
  computed: {
    ...mapGetters(["isDarkTheme"]),
  },
};
</script>
<style lang="scss">
.header-subb {
  background-image: url("https://i.imgur.com/KMN1KQ5.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 500px;

  &-block {
    max-width: 1200px;
    padding-left: 16px;
    padding-right: 16px;
    margin: 0 auto;
    font-size: 20px;
    position: relative;
    border-radius: 8px;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
  }

  &-content {
    width: 100%;
    min-height: 600px;
    margin-top: -150px;
    background-color: #eaeaea;
    display: grid;
    grid-template-areas:
      "Title Title Title"
      "Text Text Info";
    grid-template-columns: 740px 1fr;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;

    &-title {
      padding: 1.25rem;
      position: relative;
      grid-area: Title;
      border-top-left-radius: 0.5rem;
      border-top-right-radius: 0.5rem;
    }
    &-text {
      padding: 1.25rem;
      box-sizing: border-box;
      max-width: 740px;
      grid-area: Text;
    }

    &-info {
      max-width: 300px;
      padding: 1.25rem;
      grid-area: Info;
    }
  }
}
</style>
