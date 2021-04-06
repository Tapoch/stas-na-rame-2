<template>
  <div class="w-full">
    <h2 class="text-center">Абилки</h2>
    <div class="flex flex-col mt-10 px-16">
      <div @click="upgradeSkill" :class="{'bg-green-500': availableSkills.includes(skill.id)}" class="flex flex-row mb-2 bg-gray-700 rounded-xl p-3 shadow-md" v-for="skill in skills"
           :key="skill.id">
        <div class="mr-4">
          <img class="rounded-xl" :src="skill.img" :alt="skill.name">
          <div class="text-center">{{ skill.level }}</div>
        </div>
        <div>
          <span>{{ skill.name }}</span>
          <p class="text-sm">{{ skill.description }}</p>
        </div>
        <div class="flex items-center">
          {{ cost(skill.startValue, skill.level, skill.baseRate) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {calculateIncome, checkBigger, recalculate} from "@/lib/logic"
import {mapGetters} from 'vuex'

export default {
  name: "SkillsGrid",
  data: () => ({
    availableSkills: []
  }),
  computed: {
    ...mapGetters(['skills', 'lpGames'])
  },
  watch: {
    lpGames(val) {
      this.availableSkills = this.skills
          .filter(skill => {
            return checkBigger(val, calculateIncome(skill.startValue.value, skill.level + 1, skill.baseRate, skill.startValue.gradation))
          })
          .map(skill => skill.id)
    }
  },
  methods: {
    cost(startValue, level, baseRate) {
      return calculateIncome(startValue.value, level + 1, baseRate, startValue.gradation)
    },
    available() {
      return checkBigger
    },
    upgradeSkill() {

    }
  }
}
</script>
