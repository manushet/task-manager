<template>
    <h1 class="text-white center" v-if='!tasksCount'>Задач пока нет</h1>
    <template v-else>
        <h3 class="text-white">Всего активных задач: {{ activeTasksCount }}</h3>
        <div class="card" v-for="task in tasks" :key="task.id">
            <h2 class="card-title">
                {{ task.title }}
                <AppStatus :status="task.status"/>
            </h2>
            <p>
                <strong>
                    <small>
                        {{ task.date }}
                    </small>
                </strong>
            </p>
            <button class="btn success" @click='goToTaskView(task.id)'>Посмотреть</button>
        </div>
    </template>
</template>

<script>
import AppStatus from '../components/AppStatus';
import { reactive, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
    components: {AppStatus}, 
    setup() {
        const store = useStore();
        const router = useRouter();

        const tasks = reactive(store.getters.tasks);

        const tasksCount = computed(() => {
            return Object.keys(tasks).length;
        });    
        
        const activeTasksCount = computed(() => {
            return Object.values(tasks).filter(el => el.status === 'Активен').length;
        });         
            
        const goToTaskView = (id) => {
            router.push({ 
                name: 'task',
                params: { id }
                /*query: { id }*/
            });
        };
        
        return {
            tasks,
            tasksCount,
            activeTasksCount,
            goToTaskView
        }
    }
}
</script>
