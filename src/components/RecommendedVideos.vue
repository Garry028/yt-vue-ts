<template>
    <div @mouseover="show = true" @mouseleave="show = false">
        <img class="aspect-video cursor-pointer rounded-lg" :src="vid.thumbnail || ''" />
    </div>

    <div class="w-[500px]">
        <div class="px-1.5 pl-3 text-white mt-1">
            <div class="text-[15px] pb-1.5 font-extrabold w-full cursor-pointer">{{ vid.title }}</div>
            <p class="text-[12px] text-gray-300 font-extrabold flex gap-1 items-center cursor-pointer">
                {{ vid.user }}
                <CheckCircle fillColor="#888888" :size="15" />
            </p>
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
