<template>
  <app-loader v-if="isLoading" />
  <app-page v-else title="Список заявок">
    <template #header>
      <button class="btn primary" @click="modal = true">Создать</button>
    </template>
    <request-filter v-model="filter" />
    <request-table :requests="requests"></request-table>
    <teleport to="body">
      <app-modal v-if="modal" title="Создать заявку" @close="modal = false">
        <request-modal @created="modal = false" />
      </app-modal>
    </teleport>
  </app-page>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import AppPage from "@/components/ui/AppPage.vue";
import AppModal from "@/components/ui/AppModal.vue";
import AppLoader from "@/components/ui/AppLoader.vue";
import RequestTable from "@/components/request/RequestTable.vue";
import RequestModal from "@/components/request/RequestModal.vue";
import RequestFilter from "@/components/request/RequestFilter.vue";

export default {
  setup() {
    const store = useStore();

    const modal = ref(false);
    // Filter by name and status
    const requests = computed(() =>
      store.getters["request/requests"]
        .filter((req) => {
          if (filter.value?.name) {
            return req.fio
              .toLowerCase()
              .trim()
              .includes(filter.value.name.toLowerCase().trim());
          }
          return req;
        })
        .filter((req) => {
          if (filter.value?.status) {
            return req.status === filter.value.status;
          }
          return req;
        })
    );
    const filter = ref();

    const isLoading = ref(false);
    onMounted(async () => {
      isLoading.value = true;
      await store.dispatch("request/loadRequests");
      isLoading.value = false;
    });

    return {
      modal,
      requests,
      isLoading,
      filter,
    };
  },
  components: {
    "app-page": AppPage,
    "app-modal": AppModal,
    "request-table": RequestTable,
    "request-modal": RequestModal,
    "request-filter": RequestFilter,
    "app-loader": AppLoader,
  },
};
</script>
