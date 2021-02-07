<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-6 col-12">
        <div class="card" :class="isDarkMode ? 'text-light bg-darkest' : ''">
          <div class="card-header">Artigo/Article</div>
          <div class="card-body">
            <form action="">
              <div class="input-group my-3">
                <input
                  v-model="article.title"
                  placeholder="Título do artigo"
                  type="text"
                  class="form-control form-control-lg"
                  :class="
                    isDarkMode ? 'bg-transparent form-neon-yellow' : 'form-uv'
                  "
                />
              </div>
              <div class="input-group my-3">
                <textarea
                  v-model="article.abstract"
                  cols="30"
                  rows="3"
                  placeholder="Resumo/abstract"
                  class="form-control"
                  :class="
                    isDarkMode ? 'bg-transparent form-neon-yellow' : 'form-uv'
                  "
                ></textarea>
              </div>

              <div class="input-group my-3">
                <input
                  v-model="article.imageHeader"
                  placeholder="Image Header"
                  type="text"
                  name=""
                  class="form-control"
                  :class="
                    isDarkMode ? 'bg-transparent form-neon-yellow' : 'form-uv'
                  "
                />
              </div>
              <div class="input-group my-3">
                <input
                  v-model="article.cover"
                  placeholder="Image Cover"
                  type="text"
                  name=""
                  class="form-control"
                  :class="
                    isDarkMode ? 'bg-transparent form-neon-yellow' : 'form-uv'
                  "
                />
              </div>

              <div class="input-group my-3">
                <input
                  v-model="article.createdDate"
                  placeholder="Data de criação"
                  type="text"
                  name=""
                  class="form-control"
                  :class="
                    isDarkMode ? 'bg-transparent form-neon-yellow' : 'form-uv'
                  "
                />
              </div>
              <div class="input-group my-3">
                <input
                  v-model="article.updatedDate"
                  placeholder="Data de update"
                  type="text"
                  name=""
                  class="form-control"
                  :class="
                    isDarkMode ? 'bg-transparent form-neon-yellow' : 'form-uv'
                  "
                />
              </div>
              <div class="input-group my-3">
                <input
                  v-model="article.channel"
                  placeholder="Canal de conteúdo"
                  type="text"
                  name=""
                  class="form-control"
                  :class="
                    isDarkMode ? 'bg-transparent form-neon-yellow' : 'form-uv'
                  "
                />
              </div>

              <div class="input-group my-3">
                <input
                  v-model="article.category"
                  placeholder="Categoria"
                  type="text"
                  name=""
                  class="form-control"
                  :class="
                    isDarkMode ? 'bg-transparent form-neon-yellow' : 'form-uv'
                  "
                />
              </div>

              <div class="input-group my-3">
                <input
                  v-model="article.tags"
                  placeholder="Tags"
                  type="text"
                  name=""
                  class="form-control"
                  :class="
                    isDarkMode ? 'bg-transparent form-neon-yellow' : 'form-uv'
                  "
                />
              </div>
              <div class="input-group my-3">
                <input
                  v-model="article.featured"
                  placeholder="Destaque"
                  type="text"
                  name=""
                  class="form-control"
                  :class="
                    isDarkMode ? 'bg-transparent form-neon-yellow' : 'form-uv'
                  "
                />
              </div>
              <div class="input-group my-3">
                <input
                  v-model="article.type"
                  placeholder="Tipo"
                  type="text"
                  name=""
                  class="form-control"
                  :class="
                    isDarkMode ? 'bg-transparent form-neon-yellow' : 'form-uv'
                  "
                />
              </div>
              <div class="input-group my-3">
                <input
                  v-model="article.fontType"
                  placeholder="Tipografia"
                  type="text"
                  name=""
                  class="form-control"
                  :class="
                    isDarkMode ? 'bg-transparent form-neon-yellow' : 'form-uv'
                  "
                />
              </div>
              <div class="input-group my-3">
                <input
                  v-model="article.headerLayout"
                  placeholder="Layout do header do artigo"
                  type="text"
                  name=""
                  class="form-control"
                  :class="
                    isDarkMode ? 'bg-transparent form-neon-yellow' : 'form-uv'
                  "
                />
              </div>
              <div
                class="card"
                :class="isDarkMode ? 'text-light card-plain' : ''"
              >
                <div class="card-header">Autor</div>
                <div class="card-body">
                  <div class="input-group my-3">
                    <input
                      v-model="article.author.name"
                      placeholder="Nome"
                      type="text"
                      name=""
                      class="form-control"
                      :class="
                        isDarkMode
                          ? 'bg-transparent form-neon-yellow'
                          : 'form-uv'
                      "
                    />
                  </div>
                  <div class="input-group my-3">
                    <input
                      v-model="article.author.avatar"
                      placeholder="Avatar"
                      type="text"
                      name=""
                      class="form-control"
                      :class="
                        isDarkMode
                          ? 'bg-transparent form-neon-yellow'
                          : 'form-uv'
                      "
                    />
                  </div>
                  <div class="input-group my-3">
                    <textarea
                      v-model="article.author.bio"
                      cols="30"
                      rows="3"
                      placeholder="Descrição"
                      class="form-control"
                      :class="
                        isDarkMode
                          ? 'bg-transparent form-neon-yellow'
                          : 'form-uv'
                      "
                    ></textarea>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-12">
        <div class="text-monospace" :class="isDarkMode ? 'text-light' : ''">
          <h5>---</h5>
          <p class="mb-1">title: "{{ article.title }}"</p>
          <p class="mb-1">abstract: "{{ article.abstract }}"</p>
          <p class="mb-1">imageHeader: "{{ article.imageHeader }}"</p>
          <p class="mb-1">cover: "{{ article.cover }}"</p>
          <p class="mb-1">createdDate: "{{ article.createdDate }}"</p>
          <p class="mb-1">updatedDate: "{{ article.updatedDate }}"</p>
          <p class="mb-1">channel: "{{ article.channel }}"</p>
          <p class="mb-1">category: "{{ article.category }}"</p>
          <p class="mb-1">tags: "{{ article.tags }}"</p>
          <p class="mb-1">featured: {{ article.featured }}</p>
          <p class="mb-1">type: "{{ article.type }}"</p>
          <p class="mb-1">fontType: "{{ article.fontType }}"</p>
          <p class="mb-1">headerLayout: "{{ article.headerLayout }}"</p>
          <p></p>

          <!-- <p class="mb-1">: "{{ article. }}"</p> -->

          <h5>---</h5>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      article: {
        title: "",
        abstract: "",
        imageHeader: "",
        cover: "",
        channel: "",
        category: "",
        tags: [],
        featured: false,
        type: "",
        headerLayout: "",
        fontType: "",
        author: {
          name: "",
          bio: "",
          avatar: "",
        },
      },
    };
  },
  computed: {
    ...mapGetters(["isDarkMode"]),
  },
};
</script>
