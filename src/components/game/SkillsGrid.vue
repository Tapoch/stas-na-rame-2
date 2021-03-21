<template>
  <div class="w-full">
    <h2 class="text-center">Абилки</h2>
    <div class="flex flex-col mt-10 px-16">
      <div class="flex flex-row mb-2 bg-gray-700 rounded-xl p-3 shadow-md" v-for="skill in skills" :key="skill.id">
        <div class="mr-4">
          <img class="rounded-xl" :src="skill.img" :alt="skill.name">
          <div class="text-center">{{ skill.level }}</div>
        </div>
        <div>
          <span>{{ skill.name }}</span>
          <p class="text-sm">{{ skill.description }}</p>
        </div>
        <div class="flex items-center">
          20000
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SkillsGrid",
  data: () => ({
    skills: [
      {
        id: 1,
        name: 'Повысить уровень',
        img: 'https://via.placeholder.com/64',
        description: 'Улучшает базового героя на 1',
        level: 0
      },
      {
        id: 2,
        name: 'Респавн',
        img: 'https://via.placeholder.com/64',
        description: 'Уменьшает респавн героя на 0.1с',
        level: 0
      }
    ]
  })
}
</script>
