<template>
    <div class="flex items-center justify-center space-x-2">
        <div class="w-4 h-4 border-4 border-t-4 border-t-transparent border-black dark:border-white rounded-full animate-spin"></div>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped>
@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
