<template>
  <div class="container with-nav">
    <app-message />
    <router-view />
  </div>
</template>

<script>
import AppMessage from "@/components/ui/AppMessage.vue";
import { ref } from "vue";
export default {
  setup(props, ctx) {
    return {};
  },
  components: {"app-message" : AppMessage}
};
</script>

<style scoped></style>
