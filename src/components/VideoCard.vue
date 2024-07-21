<template>
    <div class="relative ">
        <div class="rounded-lg bg-black m-2" :class="[
            show && width > 639
                ? 'absolute  transition ease-in-out delay-150   duration-300'
                : ''
        ]">
            <div @mouseover="show = true" @mouseleave="show = false; showVideo = false">
                <img class="aspect-video " :src="thumbnail || ''" :class="[
                    show
                        ? 'transition ease-in-out delay-150 rounded-t-lg'
                        : 'rounded-lg',
                    showVideo ? 'delay-350 hidden' : ''
                ]" />
                <div class="w-full h-full aspect-video cursor-pointer bg-black"
                    :class="showVideo ? '' : 'delay-350 hidden'">
                    <video ref="video" :src="videoUrl || ''" type="video/mp4" />
                </div>
            </div>
            <div>
                <div class="flex mt-1.5">
                    <div>
                        <img class="rounded-full m-1.5 mt-2 flex items-baseline w-8 h-8" :src="image || ''">
                    </div>
                    <div class="px-1.5 text-white mt-1">
                        <div class="text-[17px] font-bold w-full cursor-pointer">{{ title.substring(0, 100) }}
                        </div>
                        <p class="text-[14px] text-gray-300 font-extrabold flex gap-1 items-center cursor-pointer">{{
                            user.substring(0, 30) }}
                            <CheckCircle fillColor="#888888" :size="17" />
                        </p>
                        <div class="text-sm mb-1 text-gray-300 cursor-pointer">{{ views }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, onMounted, ref, watch } from 'vue';
import CheckCircle from 'vue-material-design-icons/CheckCircle.vue';

interface Props {
    title: string;
    user: string;
    views: string;
    image: string;
    videoUrl: string;
    thumbnail: string;
}

defineProps<Props>();

const show = ref(false);
const showVideo = ref(false);
const video = ref<HTMLVideoElement | null>(null);
const width = ref(window.innerWidth);

onMounted(() => {
    window.addEventListener('resize', () => {
        width.value = window.innerWidth;
    });
});

watch(show, (newShow) => {
    if (newShow) {
        showVideo.value = true;
        video.value?.play();
    } else {
        showVideo.value = false;
        video.value?.pause();
        if (video.value) video.value.currentTime = 0;
    }
});
</script>

<style scoped>
/* Add your scoped styles here */
</style>
