<template>
  <form class="flex flex-col w-80 mx-auto mt-4">
    <div class="flex flex-col">
      <label for="email">E-mail</label>
      <input class="bg-blue-700" type="email" name="email" id="email">
    </div>
    <div class="flex flex-col">
      <label for="password">Пароль</label>
      <input class="bg-blue-700" type="password" name="password" id="password">
    </div>
    <button>Войти</button>
  </form>
</template>

<script>
export default {
  name: "SignInForm",
}
</script>
