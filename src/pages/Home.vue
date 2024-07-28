<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { fetchFromAPI } from '../api/fetchFromAPI';
import LoadingSpinner from '../components/LoadingSpinner.vue';
import VideoCard from '../components/VideoCard.vue';
import NavLayout from '../layouts/NavLayout.vue';

const router = useRouter();

const navigateToVideo = (id: string) => {
    router.push({ name: 'watch', params: { id } });
};

const searchTerm = ref<string>('');
const videos = ref<any[]>([]);
const loading = ref<boolean>(true);

const setSearchTerm = (term: string) => {
    searchTerm.value = term;
    console.log(searchTerm.value);
};

let debounceTimer: number;
const debounceFetch = (callback: Function, delay: number) => {
    clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(callback, delay);
};

const fetchVideos = async (query: string) => {
    loading.value = true;
    const data = await fetchFromAPI(`search?part=snippet&q=${query}`);
    videos.value = data?.items || [];
    loading.value = false;
};

// Initial fetch with an empty query
fetchVideos('');

watch(searchTerm, (newTerm) => {
    if (newTerm.trim() === '') {
        fetchVideos('');
    } else {
        debounceFetch(() => {
            fetchVideos(newTerm);
        }, 300);
    }
});
</script>

<template>
    <NavLayout v-slot:default="{ slotSearchTerm }">
        {{
            setSearchTerm(slotSearchTerm)
        }}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 bg-black">
            <div v-if="loading"
                class="flex justify-center items-center w-full h-screen col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4">
                <LoadingSpinner />
            </div>
            <div v-else v-for=" (video) in videos" :key="video.id.videoId" @click="navigateToVideo(video.id.videoId)">
                <VideoCard :video="video" />
            </div>
        </div>
    </NavLayout>
</template>

<style scoped></style>
