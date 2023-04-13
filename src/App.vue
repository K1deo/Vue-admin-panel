<template>
  <component :is="layout+'-layout'" v-if="layout"/>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import MainLayout from './layout/MainLayout.vue';
import AuthLayout from './layout/AuthLayout.vue';
export default {
  setup(){
    const route = useRoute();
    const layout = computed(()=> route.meta.layout)
    return{
      layout
    }
  },
  components: {
    MainLayout, AuthLayout
  }
}
</script>
<style>
 
</style>
