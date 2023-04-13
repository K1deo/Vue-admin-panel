<template>
  <span :class="['badge', className]">{{ text }}</span>
</template>

<script>
import { ref , watch} from 'vue';

export default {
  props: {
    type: {
      type: String,
      reqired: true,
      validator(val) {
        return ["active", "cancelled", "pending", "done"].includes(val);
      },
    },
  },
  setup(props) {
    const classesMap = {
      active: "primary",
      cancelled: "danger",
      done: "primary",
      pending: "warning",
    };
    const textMap = {
      active: "Активен",
      cancelled: "Отменён",
      done: "Завершен",
      pending: "Выполняется",
    };

    watch(props, val =>{
      className.value = className[val.type]
      text.value = textMap[val.type]
    })

    const className = ref(classesMap[props.type])
    const text = ref(textMap[props.type])

    
    return {
      className,
      text,
    };
  },
};
</script>

<style scoped></style>
