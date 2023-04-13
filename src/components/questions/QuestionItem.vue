<template>
<div class="question" @click="isOpen = !isOpen">
    <div class="question-title">{{ question.title }}</div>
    <div class="question-body" v-if="isOpen">{{ question.text }}</div>
</div>
</template>

<script>
import { ref } from 'vue';
export default {
   setup() {
    const isOpen = ref(false)
     return {isOpen};
   },
   props: ['question']
 };
</script>

<style scoped>
</style>