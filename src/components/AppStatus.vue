<template>
    <span class="badge" :class="statusType">{{ statusName }}</span>
</template>

<script>
import { computed } from 'vue';

export default {
    props: ['status'],
    setup(props) {      
        const statusName = computed(() => {
            return props.status;
        });

        const statusType = computed(() => {
            switch (statusName.value) {
                case 'Активен': 
                    return 'success';
                case 'Завершён':
                    return 'default';
                case 'Отменён':
                    return 'danger';   
                default:
                    return 'success';              
            }
        });

        return {
            statusName,
            statusType
        }
    }
}
</script>