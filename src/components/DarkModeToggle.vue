<template>
    <button @click="toggleDarkMode" class="p-2 rounded-full bg-yellow-100 dark:bg-slate-900 cursor-pointer">
        <span v-if="isDarkMode">🌞</span>
        <span v-else>🌜</span>
    </button>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const isDarkMode = ref(false);
// emit the isDarkMode value to the parent component
const emit = defineEmits(["isDarkMode"]);
const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
    emit("isDarkMode", isDarkMode.value);
    if (isDarkMode.value) {
        document.body.classList.toggle("dark");
    } else {
        document.body.classList.remove("dark");
    }
};
</script>
