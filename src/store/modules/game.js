export default {
  state: {
    cells: [
      {index: 1, level: 1, income: {gradation: 0, value: 1000}},
      {index: 2, level: 0, income: {gradation: 0, value: 0}},
      {index: 3, level: 0, income: {gradation: 0, value: 0}},
      {index: 4, level: 0, income: {gradation: 0, value: 0}},
      {index: 5, level: 0, income: {gradation: 0, value: 0}},
      {index: 6, level: 0, income: {gradation: 0, value: 0}},
      {index: 7, level: 0, income: {gradation: 0, value: 0}},
      {index: 8, level: 0, income: {gradation: 0, value: 0}},
      {index: 9, level: 0, income: {gradation: 0, value: 0}},
      {index: 10, level: 0, income: {gradation: 0, value: 0}},
      {index: 11, level: 0, income: {gradation: 0, value: 0}},
      {index: 12, level: 0, income: {gradation: 0, value: 0}},
      {index: 13, level: 0, income: {gradation: 0, value: 0}},
      {index: 14, level: 0, income: {gradation: 0, value: 0}},
      {index: 15, level: 0, income: {gradation: 0, value: 0}},
      {index: 16, level: 0, income: {gradation: 0, value: 0}},
      {index: 17, level: 0, income: {gradation: 0, value: 0}},
      {index: 18, level: 0, income: {gradation: 0, value: 0}},
      {index: 19, level: 0, income: {gradation: 0, value: 0}},
      {index: 20, level: 0, income: {gradation: 0, value: 0}},
    ],
    gradation: ['', 'K', 'M', 'B', 'T', 'Q', 'q', 'S', 's', 'O', 'N', 'D', 'U', 'd', 't', 'qa', 'qi', 'sx', 'sp', 'oc', 'n', 'V', 'u', 'du', 'tr', 'qua', 'qui'],
    lpGames: {},
    rubles: 0,
    baseRate: 1,
  },
  mutations: {
    SET_CELL(state, payload) {
      state.cells.forEach(cell => {
        if (cell.index === payload.index) {
          cell.level = payload.level
          cell.income = payload.income
        }
      })
    },
    SET_LP(state, payload) {
      state.lpGames = payload
    },
    SET_BASE_RATE(state, payload) {
      state.baseRate = payload
    },
    INCREMENT_RUBLES(state, payload) {
      state.rubles += payload
    },
    DECREMENT_RUBLES(state, payload) {
      state.rubles -= payload
    },
    SET_RUBLES(state, payload) {
      state.rubles = payload
    }
  },
  actions: {
    setCellByIndex({commit}, payload) {
      commit('SET_CELL', payload)
    },
    setLp({commit}, payload) {
      commit('SET_LP', payload)
    },
    getGradationMark({getters}, payload) {
      return getters.gradation[payload]
    }
  },
  getters: {
    cells(state) {
      return state.cells
    },
    lpGames(state) {
      return state.lpGames
    },
    baseRate(state) {
      return state.baseRate
    },
    rubles(state) {
      return state.rubles
    },
    gradation(state) {
      return state.gradation
    },
    formattedLpGames(state) {
      if (!Object.keys(state.lpGames).length) {
        return 0
      }
      let highGradation = 0
      Object.keys(state.lpGames).forEach(key => {
        if (state.lpGames[key] > 0)
          highGradation = key
      })
      if (highGradation > 0) {
        return +parseFloat(state.lpGames[highGradation] + (state.lpGames[highGradation - 1] ? state.lpGames[highGradation - 1] : 0) / 1000).toFixed(3) + state.gradation[highGradation]
      }
      return state.lpGames[highGradation]
    }
  }
}