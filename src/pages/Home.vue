<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { fetchFromAPI } from '../api/fetchFromAPI';
import VideoCard from '../components/VideoCard.vue';
import NavLayout from '../layouts/NavLayout.vue';

const router = useRouter();

const navigateToVideo = (id: number) => {
    router.push({ name: 'watch', params: { id } });
};
const selectedCategory = ref<string>('Music');
const videos = ref<any[]>([]);
watchEffect(async () => {
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
        .then((data) => {
            videos.value = data?.items;
        });
});
</script>

<template>
    <NavLayout>
        <div class="grid 4xl:grid-cols-5 3xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-2 bg-black">
            <div v-for="(video) in videos" :key="video.id" @click="navigateToVideo(video.id.videoId)">
                <VideoCard :video="video" />
            </div>
        </div>
    </NavLayout>
</template>

<style scoped></style>
