<template>
    <NavLayout>
        <div class="xl:flex bg-black px-4 md:px-10">
            <div class="p-3">
                <iframe :src="videoUrl" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                    class="w-full h-[300px] md:h-[400px] lg:h-[560px] xl:h-[600px] 2xl:h-[700px]"
                    ></iframe>
                <div class="text-white text-2xl font-extrabold mt-4">{{ video.title }}</div>
                <div class="flex items-center mb-4">
                    <img class="rounded-full mt-2 flex items-baseline w-12 h-12"
                        :src="`https://picsum.photos/id/${(Math.random() * 100).toFixed(0)}/100` || ''" />
                    <div class="pl-2 mt-1">
                        <div class="text-white text-lg font-extrabold flex items-center">
                            {{ video.user }}
                            <CheckCircle class="pl-2" fillColor="#888888" :size="17" />
                        </div>
                        <div class="text-gray-400 text-sm font-extrabold">{{ video.views }}</div>
                    </div>
                </div>
                <!-- Videos suggested MOBILE VIEW -->
                <div class="md:w-[500px] p-1 md:p-3 block sm:hidden">
                    <div v-for="vid in recommendedVideos" :key="vid.id">
                        <RecommendedVideos :vid="vid" />
                    </div>
                </div>
                <!-- Videos suggested MOBILE VIEW End -->

                <div class="bg-[#3F3F3F] rounded-lg w-full p-3 text-white">
                    <div class="text-white text-lg font-extrabold">{{ video.views }}</div>
                    <div class="text-sm font-extrabold mb-6">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </div>
                    <div class="text-sm font-extrabold">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                        been
                        the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                        galley
                        of type and scrambled it to make a type specimen book.
                    </div>
                </div>

                <div class="mt-6">
                    <div class="text-white text-lg font-extrabold">{{ comments.length }} Comments</div>
                    <div v-for="comment in comments" :key="comment.id">
                        <div class="flex items-flex mb-4 mt-2">
                            <img class="rounded-full mt-2 w-12 h-12"
                                :src="`https://picsum.photos/id/${(Math.random() * 100).toFixed(0)}/100` || ''" />
                            <div class="pl-6 mt-1">
                                <div class="text-white font-extrabold flex items-baseline">
                                    <div>{{ comment.user }}</div>
                                    <div class="text-gray-400 pl-3">{{ comment.time }}</div>
                                </div>
                                <div class="text-gray-200 text-sm font-extrabold">
                                    {{ comment.text }}
                                </div>
                                <div class="mt-4 flex items-center">
                                    <ThumbUpOutline fillColor="#FFFFFF" :size="20" class="pr-2" />
                                    <div class="text-gray-400 text-sm font-extrabold pr-10">{{ comment.likes }}
                                    </div>
                                    <ThumbDownOutline fillColor="#FFFFFF" :size="20" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="md:w-[500px] p-3 sm:block hidden">
                <div v-for="vid in recommendedVideos" :key="vid.id">
                    <RecommendedVideos :vid="vid" />
                </div>
            </div>
        </div>
    </NavLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CheckCircle from 'vue-material-design-icons/CheckCircle.vue';
import ThumbDownOutline from 'vue-material-design-icons/ThumbDownOutline.vue';
import ThumbUpOutline from 'vue-material-design-icons/ThumbUpOutline.vue';
import RecommendedVideos from '../components/RecommendedVideos.vue';
import thumbnailimg from '/src/assets/thumb.jpg';

import { useRoute } from 'vue-router';
import NavLayout from '../layouts/NavLayout.vue';

const route = useRoute();
const videoId = route.params.id;
interface Video {
    id: string;
    video: string;
    title: string;
    user: string;
    thumbnail: any
    views: string;
}

interface Comment {
    id: number;
    user: string;
    time: string;
    text: string;
    likes: number;
}
const video = ref<Video>({
    id: "1",
    video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    title: "Big Buck Bunny",
    thumbnail: thumbnailimg,
    user: "Blender Foundation",
    views: "1.5M"
});
const comments = ref<Comment[]>([
    {
        id: 1,
        user: "Alice",
        time: "2024-07-21T10:00:00Z",
        text: "Amazing animation! Love the creativity!",
        likes: 120
    },
    {
        id: 2,
        user: "Bob",
        time: "2024-07-21T11:30:00Z",
        text: "Great video! The graphics are top-notch.",
        likes: 95
    },
    {
        id: 3,
        user: "Charlie",
        time: "2024-07-21T12:15:00Z",
        text: "Not bad, but I've seen better.",
        likes: 30
    },
    {
        id: 4,
        user: "Diana",
        time: "2024-07-21T13:45:00Z",
        text: "The story is fantastic! Well done!",
        likes: 150
    }
]);
const recommendedVideos = ref<Video[]>([
    {
        id: "2",
        video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        title: "Elephant Dream",
        thumbnail: thumbnailimg,

        user: "Blender Foundation",
        views: "800K"
    },
    {
        id: "3",
        video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        title: "For Bigger Blazes",
        thumbnail: thumbnailimg,

        user: "Google",
        views: "600K"



    },
    {
        id: "4",
        video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        title: "For Bigger Escape",
        thumbnail: thumbnailimg,

        user: "Google",
        views: "900K"
    },
    {
        id: "5",
        video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        title: "For Bigger Fun",
        thumbnail: thumbnailimg,

        user: "Google",
        views: "1.1M"
    }
]);
//     `https://www.youtube.com/embed/${props.video.id.videoId}?autoplay=1`;

const videoUrl = ref<string>(
    `https://www.youtube.com/embed/${videoId}?autoplay=1`
);
// const show = ref<boolean>(false);

</script>
