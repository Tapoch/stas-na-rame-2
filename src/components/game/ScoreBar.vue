<template>
  <div class="flex flex-row justify-center mt-10">
    <span class="text-2xl mr-10">ЛП: {{ formattedLpGames }}</span>
    <span class="text-2xl">Рубасы: {{ rubles }}</span>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "ScoreBar",
  computed: {
    ...mapGetters(['rubles', 'formattedLpGames']),
  },
}
</script>
