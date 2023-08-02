<template>
    <nav class="navbar">
        <h3>
            Freelance
        </h3>
        <ul class="navbar-menu">
            <li>
                <router-link to="/">Все задачи</router-link>
            </li>
            <li>
                <router-link :to="{name:'new_task'}">Создать</router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {

}
</script>