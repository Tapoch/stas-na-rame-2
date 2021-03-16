<template>
  <div class="text-white">
    <div class="flex justify-center">
      <img src="../assets/logo.png" alt="Стас на раме 2">
    </div>
    <SignInForm />
  </div>
</template>

<script>
import SignInForm from "@/components/SignInForm";
export default {
  name: "SignInPage",
  components: {SignInForm}
}
</script>
