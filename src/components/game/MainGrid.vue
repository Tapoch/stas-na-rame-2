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
          }}{{ cell.income.gradation > 1 ? getGradationMark(cell.income.gradation) : '' }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";

export default {
  name: "MainGrid",
  data: () => ({
    dragged: null,
    updateLpInterval: null,
    updateHeroesInterval: null,
    cellNodes: [],
  }),
  computed: {
    ...mapGetters(['cells', 'baseRate', 'baseLevel', 'gradation', 'lpGames']),
    draggedCell() {
      if (this.dragged) {
        return this.cellByIndex(this.dragged)
      }
    }
  },
  watch: {
    lpGames(val) {
      Object.keys(val).forEach(gradation => {
        if(val[gradation] >= 1000) {
          //TODO
        }
      })
    }
  },
  mounted() {
    this.updateHeroesInterval = setInterval(this.updateHeroes, 5000)
    this.updateLpInterval = setInterval(this.updateLp, 1000)
    const nodes = Array.from(document.querySelectorAll(`[data-id]`))
    this.cellNodes = nodes.map(node => ({index: node.getAttribute('data-id'), node}))
  },
  methods: {
    ...mapActions(['setCellByIndex', 'setLp', 'decrementLp', 'getGradationMark']),
    sumObjectsByKey(...objs) {
      return objs.reduce((a, b) => {
        for (let k in b) {
          if (b.hasOwnProperty(k))
            a[k] = (a[k] || 0) + b[k];
        }
        return a;
      }, {});
    },
    updateLp() {
      let income = {}
      this.cells.forEach(cell => {
        if (cell.level > 0) {
          if(income[cell.income.gradation]) {
            income[cell.income.gradation] += cell.income.value
          } else {
            income[cell.income.gradation] = cell.income.value
          }
        }
      })
      let result = this.sumObjectsByKey(this.lpGames, income)
      this.setLp(result)
    },
    updateHeroes() {
      let endIteration = false
      this.cells.forEach(cell => {
        if (cell.level === 0 && !endIteration) {
          cell.level = this.baseLevel
          cell.income = {gradation: 1, value: this.getValue(this.baseRate, cell.level)}
          endIteration = true
        }
      })
    },
    getValue(baseRate, level) {
      if (level === 1) {
        return baseRate
      } else if (level < 1) {
        return 0
      } else {
        return 3 * this.getValue(baseRate, level - 1)
      }
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
            income: {gradation: 1, value: this.getValue(this.baseRate, this.draggedCell.level)}
          })
          this.setCellByIndex({index: this.dragged, level: 0, income: {gradation: 1, value: 0}})
        } else if (overCell.level === this.draggedCell.level) {
          this.setCellByIndex({
            index,
            level: overCell.level + 1,
            income: {gradation: 1, value: this.getValue(this.baseRate, overCell.level + 1)}
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