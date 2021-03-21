<template>
  <div class="text-white">
    <NavBar/>
    <ScoreBar/>
    <div class="flex flex-row justify-between mt-10">
      <SkillsGrid/>
      <MainGrid/>
      <UpgradesGrid/>
    </div>
  </div>
</template>

<script>
import MainGrid from "@/components/game/MainGrid";
import NavBar from "@/components/NavBar";
import ScoreBar from "@/components/game/ScoreBar";
import SkillsGrid from "@/components/game/SkillsGrid";
import UpgradesGrid from "@/components/game/UpgradesGrid";

export default {
  name: "IndexPage",
  components: {UpgradesGrid, SkillsGrid, ScoreBar, NavBar, MainGrid}
}
</script>
