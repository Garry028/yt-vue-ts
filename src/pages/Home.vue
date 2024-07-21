<script setup lang="ts">
import { useRouter } from 'vue-router';
import VideoCard from '../components/VideoCard.vue';
import NavLayout from '../layouts/NavLayout.vue';
import thumbnailimg from '/src/assets/thumb.jpg';

interface Video {
    id: number;
    title: string;
    user: string;
    views: string;
    video: string;
    thumbnail: string;
}

const videos: Video[] = [
    {
        id: 1,
        title: "Big Buck Bunny",
        user: "Blender Foundation",
        views: "1.5M",
        video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        thumbnail: thumbnailimg
    },
    {
        id: 2,
        title: "Elephant Dream",
        user: "Blender Foundation",
        views: "800K",
        video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        thumbnail: thumbnailimg
    },
    {
        id: 3,
        title: "For Bigger Blazes",
        user: "Google",
        views: "600K",
        video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        thumbnail: thumbnailimg
    },
    {
        id: 4,
        title: "For Bigger Escape",
        user: "Google",
        views: "900K",
        video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        thumbnail: thumbnailimg
    },
    {
        id: 5,
        title: "For Bigger Fun",
        user: "Google",
        views: "1.1M",
        video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        thumbnail: thumbnailimg
    },
    {
        id: 6,
        title: "For Bigger Joyrides",
        user: "Google",
        views: "750K",
        video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        thumbnail: thumbnailimg
    },
    {
        id: 7,
        title: "For Bigger Meltdowns",
        user: "Google",
        views: "550K",
        video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
        thumbnail: thumbnailimg
    },
    {
        id: 8,
        title: "Sintel",
        user: "Blender Foundation",
        views: "1M",
        video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
        thumbnail: thumbnailimg
    },
    {
        id: 9,
        title: "Subaru Outback On Street And Dirt",
        user: "Garage419",
        views: "400K",
        video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
        thumbnail: thumbnailimg
    },
    {
        id: 10,
        title: "Tears of Steel",
        user: "Blender Foundation",
        views: "650K",
        video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
        thumbnail: thumbnailimg
    },
    {
        id: 11,
        title: "Volkswagen GTI Review",
        user: "Garage419",
        views: "500K",
        video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
        thumbnail: thumbnailimg
    },
    {
        id: 12,
        title: "We Are Going On Bullrun",
        user: "Garage419",
        views: "300K",
        video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
        thumbnail: thumbnailimg
    },
    {
        id: 13,
        title: "What Car Can You Get For A Grand?",
        user: "Garage419",
        views: "200K",
        video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
        thumbnail: thumbnailimg
    }
];
const router = useRouter();

const navigateToVideo = (id: number) => {
    router.push({ name: 'watch', params: { id } });
};
</script>

<template>
    <NavLayout>
        <div class="grid 4xl:grid-cols-5 3xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-2 bg-black">
            <div v-for="(video, index) in videos" :key="video.id" @click="navigateToVideo(video.id)">
                <VideoCard :title="video.title" :user="video.user" :views="video.views"
                    :image="`https://picsum.photos/id/${index}/100`" :videoUrl="video.video"
                    :thumbnail="video.thumbnail" />
            </div>
        </div>
    </NavLayout>
</template>

<style scoped></style>
