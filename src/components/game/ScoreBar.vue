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
    ...mapGetters(['lpGames', 'rubles', 'gradation']),
    formattedLpGames() {
      if(!Object.keys(this.lpGames).length) {
        return 0
      }
        let highGradation = 0
      Object.keys(this.lpGames).forEach(key => {
        if (this.lpGames[key] > 0)
          highGradation = key
      })
      if (highGradation > 0) {
        return this.toFixedIfNecessary(this.lpGames[highGradation] + (this.lpGames[highGradation - 1] ? this.lpGames[highGradation - 1] : 0) / 1000, 3) + this.gradation[highGradation]
      }
      return this.lpGames[highGradation]
    }
  },
  methods: {
    toFixedIfNecessary( value, dp ){
      return +parseFloat(value).toFixed( dp );
    }
  }
}
</script>
