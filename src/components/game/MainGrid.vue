<template>
  <div class="w-full">
    <h2 class="text-center">Герои</h2>
    <div class="grid grid-cols-4 mt-10 w-96 mx-auto gap-x-6 gap-y-12">
      <div v-for="cell in cells" :key="cell.index" v-bind="{draggable: cell.level !== 0}"
           :data-id="cell.index"
           @dragstart="onDragStart(cell.index)"
           @drop.prevent="onDrop(cell.index)"
           @dragover="onDragOver($event, cell.index)"
           :class="{'shadow-md': cell.level !== 0}"
           class="cell rounded-xl border border-gray-500 p-0 relative select-none">{{ cell.level }}
        <span v-if="cell.level !== 0" class="absolute bottom-20 left-0 animate-flicker">+{{
            cell.income.value
          }}{{ getGradation(cell.income.gradation) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";
import {calculateIncome, checkBigger, recalculate, sub, sum} from "@/lib/logic";
import skills from "@/store/modules/skills";

export default {
  name: "MainGrid",
  data: () => ({
    dragged: null,
    updateLpInterval: null,
    updateHeroesInterval: null,
    cellNodes: [],
    baseLevel: 1,
    updateHeroesIntervalRate: 6_000
  }),
  computed: {
    ...mapGetters(['cells', 'baseRate', 'gradation', 'lpGames', 'skills']),
    draggedCell() {
      if (this.dragged) {
        return this.cellByIndex(this.dragged)
      }
    },
  },
  watch: {
    skills(val) {
      val.forEach(skill => {
        if (skill.code === 'level') {
          this.baseLevel = skill.level + 1
          this.cells.forEach(cell => {
            if (cell.level !== 0 && cell.level < this.baseLevel) {
              cell.level = this.baseLevel
              cell.income = calculateIncome(this.baseRate, cell.level)
            }
          })
        } else if (skill.code === 'heroUpdateRate') {
          this.updateHeroesIntervalRate = 6_000 - (skill.level * 100)
          clearInterval(this.updateHeroesInterval)
          this.updateHeroesInterval = setInterval(this.updateHeroes, this.updateHeroesIntervalRate)
        }
      })
    }
  },
  mounted() {
    this.updateHeroesInterval = setInterval(this.updateHeroes, this.updateHeroesIntervalRate)
    this.updateLpInterval = setInterval(this.updateLp, 1_000)
    const nodes = Array.from(document.querySelectorAll(`[data-id]`))
    this.cellNodes = nodes.map(node => ({index: node.getAttribute('data-id'), node}))


    const testScore = {
      2: 1
    }
    const testCost = {
      gradation: 0,
      value: 500
    }
    const subRes = (sub(testScore, testCost))
    console.log(recalculate(subRes))
  },
  methods: {
    ...mapActions(['setCellByIndex', 'setLp', 'getGradationMark']),
    updateLp() {
      let games = {...this.lpGames}
      this.cells.forEach(cell => {
        if (cell.level > 0) {
          games = sum(games, cell.income)
        }
      })
      games = recalculate(games)
      this.setLp(games)
    },
    updateHeroes() {
      let endIteration = false
      this.cells.forEach(cell => {
        if (cell.level === 0 && !endIteration) {
          cell.level = this.baseLevel
          cell.income = calculateIncome(this.baseRate, cell.level)
          endIteration = true
        }
      })
    },
    onDragStart(index) {
      this.dragged = index
    },
    onDrop(index) {
      if (index !== this.dragged) {
        const overCell = this.cellByIndex(index)
        if (overCell.level === 0) {
          this.setCellByIndex({
            index,
            level: this.draggedCell.level,
            income: calculateIncome(this.baseRate, this.draggedCell.level)
          })
          this.setCellByIndex({index: this.dragged, level: 0, income: {gradation: 1, value: 0}})
        } else if (overCell.level === this.draggedCell.level) {
          this.setCellByIndex({
            index,
            level: overCell.level + 1,
            income: calculateIncome(this.baseRate, overCell.level + 1)
          })
          this.setCellByIndex({index: this.dragged, level: 0, income: {gradation: 1, value: 0}})
        }
      }
    },
    onDragOver(event, index) {
      const overCell = this.cellByIndex(index)
      if (!(overCell.level !== this.draggedCell.level && overCell.level !== 0)) {
        event.preventDefault()
      }
    },
    cellByIndex(index) {
      return this.cells.filter(cell => cell.index === index)[0]
    },
    getGradation(gradation) {
      return this.gradation[gradation]
    }
  }
}
</script>

<style scoped>
.cell {
  width: 80px;
  height: 80px;
}

@keyframes flickerAnimation {
  0% {
    opacity: 0;
    bottom: 5rem
  }
  50% {
    opacity: 0;
    bottom: 5rem
  }
  75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
    bottom: 6rem
  }
}

@-o-keyframes flickerAnimation {
  0% {
    opacity: 0;
    bottom: 5rem
  }
  50% {
    opacity: 0;
    bottom: 5rem
  }
  75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
    bottom: 6rem
  }
}

@-moz-keyframes flickerAnimation {
  0% {
    opacity: 0;
    bottom: 5rem
  }
  50% {
    opacity: 0;
    bottom: 5rem
  }
  75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
    bottom: 6rem
  }
}

@-webkit-keyframes flickerAnimation {
  0% {
    opacity: 0;
    bottom: 5rem
  }
  50% {
    opacity: 0;
    bottom: 5rem
  }
  75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
    bottom: 6rem
  }
}

.animate-flicker {
  -webkit-animation: flickerAnimation 1s infinite;
  -moz-animation: flickerAnimation 1s infinite;
  -o-animation: flickerAnimation 1s infinite;
  animation: flickerAnimation 1s infinite;
}
</style>