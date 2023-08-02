import { createStore } from 'vuex';
import {v4 as uuidv4} from 'uuid';
import mutations from './mutations';

const {ADD_TASK, UPDATE_TASK_STATUS} = mutations;

const store = createStore({
    state: {
        tasks: JSON.parse(localStorage.getItem('tasks')),
    },
    getters: {
        tasks: ({tasks}) => tasks,
        taskByID: ({tasks}) => (id) => tasks[id],
    },
    mutations: {
        [ADD_TASK]({tasks}, task) {
            tasks[task.id] = task;
        }, 
        [UPDATE_TASK_STATUS]({tasks}, {id, status: newStatus}) {
            tasks[id] = {
                ...tasks[id],
                status: newStatus
            };
        },      
    },
    actions: {
        addTask({commit}, task) {
            const uuid = uuidv4();
            const curDate = new Date().toISOString().substring(0, 10);
            const status = task.date < curDate ? 'Завершён' : 'Активен';
           
            task = {
                ...task,
                id: uuid, 
                status: status, 
            };            
            commit(ADD_TASK, task);
        },
        changeStatus({commit}, {id, status}) {
            commit(UPDATE_TASK_STATUS, {id, status});
        },
        updateLocalStorage({getters}) {
            const {tasks} = getters;
            localStorage.clear();
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    },
    modules: {
    }
});

export default store;
