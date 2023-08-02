<template>
    <form class="card" @submit.prevent="addNewTask">
        <h1>Создать новую задачу</h1>
        <div class="form-control">
            <label for="title">Название</label>
            <input type="text" id="title" name="title" v-model="taskTitle">
            <small v-if="errors.title">{{ errors.title }}</small>
        </div>
        <div class="form-control">
            <label for="date">Дата завершения</label>
            <input type="date" id="date" name="date" v-model="taskDate">
            <small v-if="errors.date">{{ errors.date }}</small>
        </div>
        <div class="form-control">
            <label for="description">Описание</label>
            <textarea id="description" name="description" v-model="taskDescription"></textarea>
            <small v-if="errors.description">{{ errors.description }}</small>
        </div>
        <button class="btn primary" :disabled="isDisabled">Создать</button>
    </form>
</template>

<script>
import {ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const curDate = new Date().toISOString().substring(0, 10);

        const store = useStore();
        const router = useRouter();

        const errors = {
            title: null,
            date: null,
            description: null,
        }
        
        const taskTitle = ref(null);
        const taskDate = ref(curDate);
        const taskDescription = ref(null);

        const isDisabled = computed(() => {
            return !taskTitle.value || !taskDate.value || !taskDescription.value;
        });

        const isFormValid = () => {
            let valid = true;
            if (!taskTitle.value) {
                errors.title = 'Поле обязательно для заполнения';
                valid = false;
            }
            if (!taskDate.value) {
                errors.date = 'Поле обязательно для заполнения';
                valid = false;
            }  
            if (!taskDescription.value) {
                errors.description = 'Поле обязательно для заполнения';
                valid = false;
            } 
            return valid;         
        };

        const addNewTask = () => {
            const task = {
                title: taskTitle.value,
                date: taskDate.value,
                description: taskDescription.value,
            };
            if (isFormValid()) {
                taskTitle.value = null;
                taskDate.value = curDate;
                taskDescription.value = null;
                store.dispatch('addTask', task);
                store.dispatch('updateLocalStorage');
                goToHome();
            }
        };

        const goToHome = () => {
            router.push({name: 'home'});
        };
        
        return {
            taskTitle,
            taskDate, 
            taskDescription,
            isDisabled,
            addNewTask,
            errors
        }
    }
}
</script>