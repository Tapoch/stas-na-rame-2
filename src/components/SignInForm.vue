<template>
  <div>
    <form v-if="!loading" @submit.prevent="onSignInSubmit" class="flex flex-col items-center mt-10 text-3xl w-96 mx-auto">
      <input v-model="email" class="sign-input" type="email" placeholder="E-mail" ref="emailInput" required>
      <input v-model="password" class="sign-input" type="password" placeholder="Пароль"
             ref="passwordInput" required>
      <button class="bg-crimson p-2 w-full">Войти</button>
      <p v-if="this.error && this.error.message" class="text-base mt-2">{{ this.error.message }}</p>
      <router-link to="/signup" class="text-base mt-10">Создать аккаунт</router-link>
    </form>
    <LoadingBlock v-if="loading"/>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import LoadingBlock from "@/components/LoadingBlock";

export default {
  name: "SignInForm",
  components: {LoadingBlock},
  data: () => ({
    email: '',
    password: ''
  }),
  mounted() {
    this.clearError()
  },
  computed: {
    ...mapGetters(['error', 'loading'])
  },
  methods: {
    ...mapActions(['signUserIn', 'clearError']),
    onSignInSubmit() {
      this.signUserIn({email: this.email, password: this.password})
    }
  }
}
</script>
