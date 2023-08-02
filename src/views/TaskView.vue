<template>
    <div class="card" v-if='task'>
        <h2>{{ task.title }}</h2>
        <p><strong>Статус</strong>: <AppStatus :status="task.status"/></p>
        <p><strong>Дата завершения</strong>: {{ task.date }}</p>
        <p><strong>Описание</strong>: {{ task.description }}</p>
        <div>
            <button class="btn success" @click="changeStatus('Активен')">Взять в работу</button>
            <button class="btn default" @click="changeStatus('Завершён')">Завершить</button>
            <button class="btn danger" @click="changeStatus('Отменён')">Отменить</button>
        </div>
    </div>
    <h3 class="text-white center" v-else>
        Задача с id <strong>{{ taskId }}</strong> не найдена.
    </h3>
</template>

<script>
import AppStatus from '../components/AppStatus';
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

export default {
    components: {AppStatus},
    setup() {
        const route = useRoute();
        const store = useStore();
        const taskId = ref(route.params.id);

        const task = computed(() => {
            return store.getters.taskByID(taskId.value);
        });       

        const changeStatus = (status) => {
            store.dispatch('changeStatus', { id: taskId.value, status});
            store.dispatch('updateLocalStorage');
        };
      
        return {
            taskId,
            task,
            changeStatus
        }
    }
}
</script>