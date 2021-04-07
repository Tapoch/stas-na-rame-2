<template>
  <div class="w-full">
    <h2 class="text-center">Абилки</h2>
    <div class="flex flex-col mt-10 px-16">
      <div @click="upgradeSkill(skill)" :class="{'bg-green-500': availableSkills.includes(skill.id)}"
           class="flex flex-row mb-2 bg-gray-700 rounded-xl p-3 shadow-md" v-for="skill in skills"
           :key="skill.id">
        <div class="mr-4">
          <img class="rounded-xl" :src="skill.img" :alt="skill.name">
          <div class="text-center">{{ skill.level }}/{{skill.maxLevel}}</div>
        </div>
        <div class="flex-grow mr-4">
          <span>{{ skill.name }}</span>
          <p class="text-sm">{{ skill.description }}</p>
        </div>
        <div class="flex flex-col items-center justify-center">
          <span>Цена:</span>
          <p class="text-sm">{{ cost(skill.startValue, skill.level, skill.baseRate) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {calculateIncome, checkBigger, sub} from "@/lib/logic"
import {mapActions, mapGetters} from 'vuex'

export default {
  name: "SkillsGrid",
  data: () => ({
    availableSkills: []
  }),
  computed: {
    ...mapGetters(['skills', 'lpGames', 'gradation'])
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
    ...mapActions(['setLp', 'setSkills']),
    cost(startValue, level, baseRate) {
      const cost = calculateIncome(startValue.value, level + 1, baseRate, startValue.gradation)
      return cost.value + this.gradation[cost.gradation]
    },
    upgradeSkill({id, startValue, level, baseRate}) {
      if (this.availableSkills.includes(id)) {
        const newValueLpGames = sub(this.lpGames, calculateIncome(startValue.value, level + 1, baseRate, startValue.gradation))
        this.setLp(newValueLpGames)
        const newSkills = this.skills.map(skill => {
          if (skill.id === id) {
            return {...skill, level: skill.level+1}
          }
          return skill
        })
        this.setSkills(newSkills)
        this.availableSkills = newSkills
            .filter(skill => {
              return checkBigger(newValueLpGames, calculateIncome(skill.startValue.value, skill.level + 1, skill.baseRate, skill.startValue.gradation))
            })
            .map(skill => skill.id)
      }
    }
  }
}
</script>
