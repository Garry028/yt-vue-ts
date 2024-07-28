<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import CheckCircle from 'vue-material-design-icons/CheckCircle.vue';
import ThumbDownOutline from 'vue-material-design-icons/ThumbDownOutline.vue';
import ThumbUpOutline from 'vue-material-design-icons/ThumbUpOutline.vue';
import { useRoute, useRouter } from 'vue-router';
import { fetchFromAPI } from '../api/fetchFromAPI';
import RecommendedVideos from '../components/RecommendedVideos.vue';
import NavLayout from '../layouts/NavLayout.vue';
import VueMarkdown from 'vue-markdown-render';
const router = useRouter();
const route = useRoute();
const videoId = ref<any>(Array.isArray(route.params.id) ? route.params.id[0] : route.params.id || '');

interface Video {
    id: string;
    video: string;
    title: string;
    user: string;
    thumbnail: any;
    views: string;
    commentCount?: number;
    description: ""
}

interface Comment {
    id: number;
    user: string;
    time: string;
    text: string;
    likes: number;
}

const video = ref<Video>({
    id: '',
    video: '',
    title: '',
    user: '',
    thumbnail: '',
    views: '',
    description: "",
    commentCount: 0
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

const recommendedVideos = ref<Video[]>([]);

const fetchVideoData = async (id: string) => {
    const res = await fetchFromAPI(`videos?part=snippet,statistics&id=${id}`);
    const item = res.items[0];
    console.log(item);

    video.value = {
        id: item.id,
        video: `https://www.youtube.com/embed/${item.id}?autoplay=1`,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.high.url,
        user: item.snippet.channelTitle,
        views: item.statistics.viewCount,
        commentCount: item.statistics.commentCount,
        description: item.snippet.description
    };
};

const fetchRecommendedVideos = async (id: string) => {
    const res = await fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}`);
    recommendedVideos.value = res.items.map((item: any) => {
        return {
            id: item.id.videoId,
            video: `https://www.youtube.com/embed/${item.id.videoId}?autoplay=1`,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.high.url,
            user: item.snippet.channelTitle,
        };
    });
};
const fetchCommentsData = async (id: string) => {
    const res = await fetchFromAPI(`commentThreads?part=snippet&videoId=${id}`);
    comments.value = res.items.map((item: any) => {
        return {
            id: item.id,
            user: item.snippet.topLevelComment.snippet.authorDisplayName,
            time: item.snippet.topLevelComment.snippet.publishedAt,
            text: item.snippet.topLevelComment.snippet.textDisplay,
            likes: item.snippet.topLevelComment.snippet.likeCount
        };
    });
};
watch(() => route.params.id, async (newId: any) => {
    videoId.value = newId;
    await fetchVideoData(newId);
    await fetchRecommendedVideos(newId);
    await fetchCommentsData(newId);
});

onMounted(async () => {
    await fetchVideoData(videoId.value);
    await fetchRecommendedVideos(videoId.value);
    await fetchCommentsData(videoId.value);
});

const navigateToVideo = (id: string) => {
    router.push({ name: 'watch', params: { id } });
};
</script>

<template>
    <NavLayout>
        <div class="xl:flex bg-black px-4 md:px-10">
            <div class="p-3">
                <iframe :src="video.video" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                    class="w-full h-[300px] md:h-[400px] lg:h-[560px] xl:h-[550px] 2xl:h-[700px]"></iframe>
                <div class="text-white text-2xl font-extrabold mt-4">{{ video.title }}</div>
                <div class="flex items-center mb-4">
                    <img class="rounded-full mt-2 flex items-baseline w-12 h-12"
                        :src="`https://picsum.photos/id/${(Math.random() * 100).toFixed(0)}/100` || ''" />
                    <div class="pl-2 mt-1">
                        <div class="text-white text-lg font-extrabold flex items-center">
                            {{ video.user }}
                            <CheckCircle class="pl-2" fillColor="#888888" :size="17" />
                        </div>
                        <div class="text-gray-400 text-sm font-extrabold">{{ video.views }} Subscribers</div>
                    </div>
                </div>
                <div class="md:w-[500px] p-1 md:p-3 block sm:hidden">
                    <div v-for="vid in recommendedVideos" :key="vid.id" @click="navigateToVideo(vid.id)">
                        <RecommendedVideos :vid="vid" />
                    </div>
                </div>
                <div class="bg-[#3F3F3F] rounded-lg w-full p-3 text-white">
                    <div class="text-white text-lg font-extrabold">{{ video.views }} Views</div>
                    <div class="text-sm font-extrabold">
                        <VueMarkdown :source="video.description"></VueMarkdown>
                    </div>
                </div>
                <div class="max-h-full overflow-y-auto mt-4 border-b border-gray-600 pb-4 ">
                    <div class="text-white text-lg font-extrabold">{{ video.commentCount }} Comments</div>
                    <div v-for="comment in comments" :key="comment.id">
                        <div class="flex items-flex mb-4 mt-2">
                            <img class="rounded-full mt-2 w-12 h-12"
                                :src="`https://picsum.photos/id/${(Math.random() * 100).toFixed(0)}/100` || ''" />
                            <div class="pl-6 mt-1">
                                <div class="text-white font-extrabold flex items-baseline">
                                    <div>{{ comment.user }}</div>
                                    <div class="text-gray-400 pl-3">{{ comment.time }}</div>
                                </div>
                                <div class="text-gray-200 text-sm font-extrabold" v-html="comment.text"></div>
                                <div class="mt-2 flex items-center">
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
                <div v-for="vid in recommendedVideos" :key="vid.id" @click="navigateToVideo(vid.id)">
                    <RecommendedVideos :vid="vid" />
                </div>
            </div>
        </div>
    </NavLayout>
</template>
