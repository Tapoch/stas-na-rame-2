<template>
  <div class="flex flex-row w-full bg-gray-700 py-2 px-16 text-lg justify-between shadow-md">
    <div>
      <router-link to="/">Главная</router-link>
    </div>
    <div>
      <button type="button" @click="onSignOutClick" class="focus:outline-none">Выйти</button>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "NavBar",
  methods: {
    ...mapActions(['logout']),
    onSignOutClick() {
      this.logout()
    }
  }
}
</script>
