<template>
  <header class="welcome-box">
    <div class="container-fluid">
      <h1 class="font-monospace">
        <em>
          {{ showTime }}
        </em>
      </h1>
    </div>
  </header>
</template>
<script>
import { mapGetters } from "vuex";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
export default {
  computed: {
    ...mapGetters(["isDarkTheme"]),

    showTime() {
      const time = new Date();
      const formattedDate = format(new Date(time), "dd 'de' MMMM 'de' yyyy'", {
        locale: ptBR,
      });

      return formattedDate;
    },
  },
};
</script>
