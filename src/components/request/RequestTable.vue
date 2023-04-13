<template>
  <h3 v-if="requests.length === 0" class="text-center">
    Заявок пока нет
  </h3>
  <table v-else class="table">
    <thead>
      <tr>
        <th>#</th>
        <th>ФИО</th>
        <th>Телефон</th>
        <th>Сумма</th>
        <th>Статус</th>
        <th>Действие</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(req, idx) in requests" :key="req.id">
        <td>{{ idx + 1 }}</td>
        <td>{{ req.fio }}</td>
        <td>{{ req.phone }}</td>
        <td>{{ currency(req.amount) }}</td>
        <td><app-status :type="req.status" /></td>
        <td>
          <router-link custom v-slot="{navigate}" :to="{name: 'Request', params:{id: req.id}}">
            <button class="btn" @click="navigate">Открыть</button>
          </router-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { currency } from '@/utils/currency';
import AppStatus from '../ui/AppStatus.vue';

export default {
  props: {
    requests: {
      type: Array,
      reqired: true,
    },
  },
  setup(){
    return{currency}
  },
  components: {
    'app-status' : AppStatus,
  }
};
</script>

<style scoped></style>
