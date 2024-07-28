<template>
    <div class="relative">
        <div class="rounded-lg bg-black m-2" :class="[
            show && width > 639
                ? 'absolute transition ease-in-out delay-150 duration-300'
                : ''
        ]">
            <div @mouseover="show = true" @mouseleave="show = false; showVideo = false">
                <img class="aspect-video cursor-pointer" :src="thumbnail || ''"
                :class="[
                    // show
                    //     ? 'transition ease-in-out delay-150 rounded-t-lg'
                    //     : 'rounded-lg',
                    // showVideo ? 'delay-350 hidden' : ''
                ]"
                 />
                <!-- <div class="w-full h-full aspect-video cursor-pointer bg-black"
                    :class="showVideo ? '' : 'delay-350 hidden'">
                    <iframe
                        v-if="showVideo"
                        :src="iframeUrl"
                        class=""
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen>
                    </iframe>
                </div> -->
            </div>
            <div>
                <div class="flex mt-1.5">
                    <div>
                        <img class="rounded-full m-1.5 mt-2 flex items-baseline w-8 h-8" :src="channelImage || ''">
                    </div>
                    <div class="px-1.5 text-white mt-1">
                        <div class="text-[17px] font-bold w-full cursor-pointer">{{ title.substring(0, 100) }}
                        </div>
                        <p class="text-[14px] text-gray-300 font-extrabold flex gap-1 items-center cursor-pointer">{{
                            channelTitle.substring(0, 30) }}
                            <CheckCircle fillColor="#888888" :size="17" />
                        </p>
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
    video: {
        kind: string;
        id: {
            kind: string;
            videoId: string;
        };
        snippet: {
            publishedAt: string;
            channelId: string;
            title: string;
            description: string;
            thumbnails: {
                default: {
                    url: string;
                    width: number;
                    height: number;
                };
                medium: {
                    url: string;
                    width: number;
                    height: number;
                };
                high: {
                    url: string;
                    width: number;
                    height: number;
                };
            };
            channelTitle: string;
            liveBroadcastContent: string;
            publishTime: string;
        };
    };
}

const props = defineProps<Props>();

const show = ref(false);
const showVideo = ref(false);
const width = ref(window.innerWidth);

const thumbnail = ref('');
const iframeUrl = ref('');
const title = ref('');
const channelTitle = ref('');
const channelImage = ref('');

onMounted(async () => {
    window.addEventListener('resize', () => {
        width.value = window.innerWidth;
    });

    thumbnail.value = props.video.snippet.thumbnails.high.url;
    iframeUrl.value = `https://www.youtube.com/embed/${props.video.id.videoId}?autoplay=1`;
    title.value = props.video.snippet.title;
    channelTitle.value = props.video.snippet.channelTitle;
});

watch(show, (newShow) => {
    if (newShow) {
        showVideo.value = true;
    } else {
        showVideo.value = false;
    }
});
</script>

<style scoped>
</style>
