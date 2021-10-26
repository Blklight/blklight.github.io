<template>
  <span>
    <template v-if="full">
      {{ formatDateFull(date) }}
    </template>
    <template v-else>
      {{ formatDate(date) }}
    </template>
  </span>
</template>
<script>
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
export default {
  props: {
    date: {
      type: String,
      default: null,
    },
    full: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    formatDate(date) {
      const time = new Date(date);
      const formattedDate = format(new Date(time), "dd MMM yyyy", {
        locale: ptBR,
      });

      return formattedDate;
    },

    formatDateFull(date) {
      const formattedDate = format(
        new Date(date),
        "dd 'de' MMMM 'de' yyyy', às' H:mm",
        {
          locale: ptBR,
        }
      );

      return formattedDate;
    },
  },
};
</script>
