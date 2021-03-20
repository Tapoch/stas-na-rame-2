<template>
  <div>
    <MainLogo/>
    <SignUpForm/>
  </div>
</template>

<script>
import MainLogo from "@/components/MainLogo";
import SignUpForm from "@/components/SignUpForm";
import SignInForm from "@/components/SignInForm";

export default {
  name: "SignUpPage",
  components: {SignUpForm, MainLogo},
}
</script>
