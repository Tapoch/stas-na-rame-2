<template>
  <div id="app" class="bg-gradient-to-b from-indigo-900 to-blue-700 h-screen text-gray-100">
    <LoadingBlock v-if="loading" />
    <router-view v-else/>
  </div>
</template>
<script>
import LoadingBlock from "@/components/LoadingBlock";
import {mapGetters} from "vuex";
export default {
  components: {LoadingBlock},
  computed: {
    ...mapGetters(['loading'])
  }
}
</script>