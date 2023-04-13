<template>
  <app-loader v-if="isLoading" />
  <app-page back title="Зявка" v-else-if="req.data">
    <!-- <template #header>
      <h3> ID: {{ id }}</h3>
    </template> -->
    <p><strong>Имя клиента: {{ req.data.fio }}</strong></p>
    <p><strong>Телефон: {{ req.data.phone }}</strong></p>
    <p><strong>Сумма: {{ currency(req.data.amount) }}</strong></p>
    <p><strong>Статус: <app-status :type="req.data.status"/> </strong></p>

    <div class="form-control">
      <label for="status">Обновить статус заявки</label>
      <select id="status" v-model="status">
        <option value="done">Завершен</option>
        <option value="cancelled">Отменен</option>
        <option value="active">Активен</option>
        <option value="pending">Выполняется</option>
      </select>
    </div>

    <button class="btn danger" @click="remove">Удалить</button>
    <button class="btn " v-if="hasChanges" @click="update">Обновить</button>
  </app-page>
  <h3 v-else class="text-center text-white">Заявка с ID:{{ id }} не найдено</h3>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import AppPage from "@/components/ui/AppPage.vue";
import AppLoader from "@/components/ui/AppLoader.vue";
import AppStatus from "@/components/ui/AppStatus.vue";
import { currency } from "@/utils/currency";


export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const isLoading = ref(false);
    const req = ref({});
    const id = route.params.id;
    const status = ref(undefined)
    const hasChanges = computed(()=> req.value.data.status !== status.value)

    const remove = async () => {
      await store.dispatch('request/removeById', route.params.id)
      router.push('/')
    }

    const update = async () => {
      const data = {...req.value.data,status: status.value, id: route.params.id}
      await store.dispatch('request/updateById', data)
      router.go()
    }

    onMounted(async () => {
      isLoading.value = true;
      req.value = await store.dispatch("request/loadById", id);
      status.value = req.value.data?.status;
      isLoading.value = false;
    });
    return { isLoading, req, id, currency, remove, update, status, hasChanges };
  },
  components: {
    "app-page": AppPage,
    "app-loader": AppLoader,
    "app-status": AppStatus,
  },
};
</script>

<style scoped></style>
