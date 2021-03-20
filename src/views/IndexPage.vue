<template>
  <div class="text-white">
    <NavBar />
    <MainGrid />
  </div>
</template>

<script>
import MainGrid from "@/components/game/MainGrid";
import NavBar from "@/components/NavBar";
export default {
  name: "IndexPage",
  components: {NavBar, MainGrid}
}
</script>
