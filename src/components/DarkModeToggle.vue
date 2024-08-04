<template>
    <button @click="toggleDarkMode" class="p-2 rounded-full bg-gray-800 cursor-pointer">
        <span v-if="isDarkMode">🌞</span>
        <span v-else>🌜</span>
    </button>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const isDarkMode = ref(false);

const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
    if (isDarkMode.value) {
        document.body.classList.toggle("dark");

    } else {
        document.body.classList.remove("dark");
    }
};
</script>
