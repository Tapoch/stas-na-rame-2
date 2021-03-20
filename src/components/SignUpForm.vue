<template>
  <div>
    <form v-if="currentStep === 1 && !loading" @submit.prevent="onNicknameFormSubmit"
          class="flex flex-col items-center mt-10 text-3xl">
      <div class="flex flex-row">
        <input v-model="$v.nickname.$model" :class="{error: $v.$invalid && $v.$dirty}" ref="nicknameInput"
               class="sign-input" type="text" placeholder="Никнейм">
        <button class="bg-crimson p-2">GO</button>
      </div>
      <p v-if="$v.$invalid && $v.$dirty" class="text-base mt-2">Длина ника должна быть не менее 3-ех
        символов</p>
      <router-link to="/signin" class="text-base mt-10">Уже есть аккаунт?</router-link>
    </form>
    <form v-if="currentStep === 2 && !loading" @submit.prevent="onSignUpFormSubmit"
          class="flex flex-col items-center mt-10 text-3xl w-96 mx-auto">
      <input v-model="email" class="sign-input" type="email" placeholder="E-mail" ref="emailInput" required>
      <input v-model="password" class="sign-input" type="password" placeholder="Пароль"
             ref="passwordInput" required>
      <button class="bg-crimson p-2 w-full">Зарегистрироваться</button>
      <p v-if="this.error && this.error.message" class="text-base mt-2">{{ this.error.message }}</p>
      <button @click.prevent="onBackButtonClick" class="mt-10" type="button">Назад</button>
    </form>
    <LoadingBlock v-if="loading"/>
  </div>
</template>

<script>
import {required, minLength} from 'vuelidate/lib/validators'
import LoadingBlock from "@/components/LoadingBlock";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "SignUpForm",
  components: {LoadingBlock},
  data: () => ({
    currentStep: 1,
    nickname: '',
    email: '',
    password: ''
  }),
  validations: {
    nickname: {
      required,
      minLength: minLength(3)
    }
  },
  computed: {
    ...mapGetters(['loading', 'error'])
  },
  mounted() {
    this.$refs.nicknameInput.focus()
  },
  methods: {
    ...mapActions(['signUserUp']),
    onNicknameFormSubmit() {
      this.$v.nickname.$touch()
      if (!this.$v.$invalid) {
        this.currentStep++
        setTimeout(() => this.$refs.emailInput.focus(), 0)
      }
    },
    onSignUpFormSubmit() {
      this.signUserUp({email: this.email, password: this.password, name: this.nickname})
    },
    onBackButtonClick() {
      this.currentStep--
    }
  }
}
</script>

<style scoped>
.error {
  @apply bg-red-200
}
</style>