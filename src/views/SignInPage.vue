<template>
  <div>
    <MainLogo />
    <SignInForm />
  </div>
</template>

<script>
import SignInForm from "@/components/SignInForm";
import MainLogo from "@/components/MainLogo";
export default {
  name: "SignInPage",
  components: {MainLogo, SignInForm}
}
</script>
