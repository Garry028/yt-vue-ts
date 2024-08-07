<template>
    <div class="flex items-start space-x-4 p-2">
        <!-- Thumbnail on the left -->
        <div @mouseover="show = true" @mouseleave="show = false" class="flex-shrink-0">
            <img class="aspect-video cursor-pointer rounded-lg w-40" :src="vid.thumbnail || ''" />
        </div>

        <!-- Video Info on the right -->
        <div class="flex-grow">
            <div class="text-black dark:text-white">
                <div class="text-[15px] pb-1.5 font-extrabold w-full cursor-pointer">
                    {{ vid.title }}
                </div>
                <p
                    class="text-[12px] text-gray-600 dark:text-gray-300 font-extrabold flex gap-1 items-center cursor-pointer">
                    {{ vid.user }}
                    <CheckCircle fillColor="#888888" :size="15" />
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue';
import CheckCircle from 'vue-material-design-icons/CheckCircle.vue';

interface VideoProps {
    vid: {
        thumbnail: string;
        video: string;
        title: string;
        user: string;
    };
}

const props = defineProps<VideoProps>();
const { vid } = toRefs(props);

const show = ref<boolean>(false);
</script>

<style scoped>
.flex-shrink-0 {
    width: 160px;
    /* Adjust this value based on your layout needs */
}

.flex-grow {
    width: calc(100% - 160px);
    /* This ensures that the text section takes the remaining space */
}
</style>
