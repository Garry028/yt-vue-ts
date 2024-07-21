<template>
    <div @mouseover="show = true" @mouseleave="show = false">
        <img class="aspect-video cursor-pointer rounded-lg" :src="vid.thumbnail || ''"
            :class="{ 'delay-350 hidden': show }" />
        <div class="w-full h-full aspect-video cursor-pointer" :class="{ 'delay-350 hidden': !show }">
            <video ref="video" class="rounded-lg cursor-pointer" :src="vid.video || ''" />
        </div>
    </div>

    <div class="w-[500px]">
        <div class="px-1.5 pl-3 text-white mt-1">
            <div class="text-[15px] pb-1.5 font-extrabold w-full cursor-pointer">{{ vid.title }}</div>
            <p class="text-[12px] text-gray-300 font-extrabold flex gap-1 items-center cursor-pointer">
                {{ vid.user }}
                <CheckCircle fillColor="#888888" :size="15" />
            </p>
            <div class="text-xs mb-1 text-gray-300 cursor-pointer">{{ vid.views }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, ref, toRefs, watch } from 'vue';
import CheckCircle from 'vue-material-design-icons/CheckCircle.vue';

interface VideoProps {
    vid: {
        thumbnail: string;
        video: string;
        title: string;
        user: string;
        views: string;
    };
}

const props = defineProps<VideoProps>();
const { vid } = toRefs(props);

const show = ref<boolean>(false);
const video = ref<HTMLVideoElement | null>(null);

watch(() => show.value, (newShow) => {
    if (video.value) {
        if (newShow) {
            video.value.play();
        } else {
            video.value.pause();
            video.value.currentTime = 0;
        }
    }
});
</script>
