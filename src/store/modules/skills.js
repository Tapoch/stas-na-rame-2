export default {
  state: {
    skills: [
      {
        id: 1,
        name: 'Повысить уровень',
        img: 'https://via.placeholder.com/64',
        description: 'Улучшает базового героя на 1',
        level: 0,
        startValue: {gradation: 1, value: 20},
        baseRate: 4
      },
      {
        id: 2,
        name: 'Респавн',
        img: 'https://via.placeholder.com/64',
        description: 'Уменьшает респавн героя на 0.1с',
        level: 0,
        startValue: {gradation: 1, value: 1},
        baseRate: 5
      }
    ]
  },
  mutations: {
    SET_SKILLS(state, payload) {
      state.skills = payload
    }
  },
  actions: {
    setSkills({commit}, payload) {
      commit('SET_SKILLS', payload)
    }
  },
  getters: {
    skills(state) {
      return state.skills
    }
  }
}