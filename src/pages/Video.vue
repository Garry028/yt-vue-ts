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
import LoadingSpinner from '../components/LoadingSpinner.vue';

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

const comments = ref<Comment[]>([]);

const recommendedVideos = ref<Video[]>([]);
const loading = ref<boolean>(true);

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
            id: item.id?.videoId,
            video: `https://www.youtube.com/embed/${item.id.videoId}?autoplay=1`,
            title: item.snippet?.title,
            thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
            user: item.snippet?.channelTitle,
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

const fetchData = async (id: string) => {
    loading.value = true;
    await Promise.all([fetchVideoData(id), fetchRecommendedVideos(id), fetchCommentsData(id)]);
    loading.value = false;
};

watch(() => route.params.id, async (newId: any) => {
    videoId.value = newId;
    await fetchData(newId);
});

onMounted(async () => {
    window.scrollTo(0, 0);
    await fetchData(videoId.value);
});

const navigateToVideo = (id: string) => {
    router.push({ name: 'watch', params: { id } });
};
function timeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();

    // Ensure that the subtraction operation is between two numbers
    const differenceInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    // Define the time intervals in seconds
    const intervals: { [key: string]: number } = {
        year: 365 * 24 * 60 * 60,
        month: 30 * 24 * 60 * 60,
        week: 7 * 24 * 60 * 60,
        day: 24 * 60 * 60,
        hour: 60 * 60,
        minute: 60,
        second: 1,
    };

    // Iterate over intervals to find the correct unit
    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
        const value = Math.floor(differenceInSeconds / secondsInUnit);
        if (value >= 1) {
            return `${value} ${unit}${value > 1 ? 's' : ''} ago`;
        }
    }

    return 'just now';
}
</script>

<template>
    <NavLayout>
        <div class="xl:flex dark:bg-black px-4 md:px-2">
            <LoadingSpinner v-if="loading" class="w-full h-screen" />
            <div v-else class="p-3 md:w-[65%]">
                <iframe :src="video.video" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                    class="w-full h-[300px] md:h-[400px] lg:h-[560px] xl:h-[500px] 2xl:h-[600px]"></iframe>
                <div class="text-black dark:text-white text-2xl font-extrabold mt-4">{{ video.title }}</div>
                <div class="flex items-center mb-4">
                    <img class="rounded-full mt-2 flex items-baseline w-12 h-12"
                        :src="`https://picsum.photos/id/${(Math.random() * 100).toFixed(0)}/100` || ''" />
                    <div class="pl-2 mt-1">
                        <div class="text-black dark:text-white text-lg font-extrabold flex items-center">
                            {{ video.user }}
                            <CheckCircle class="pl-2" fillColor="#888888" :size="17" />
                        </div>
                        <div class="text-black dark:text-gray-400 text-sm font-extrabold">{{ video.views }} Subscribers
                        </div>
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
                    <div class="text-black dark:text-white text-lg font-extrabold">{{ video.commentCount }} Comments
                    </div>
                    <div v-for="comment in comments" :key="comment.id">
                        <div class="flex items-flex mb-4 mt-2">
                            <img class="rounded-full mt-2 w-12 h-12"
                                :src="`https://picsum.photos/id/${(Math.random() * 100).toFixed(0)}/100` || ''" />
                            <div class="pl-6 mt-1">
                                <div class="text-black dark:text-white font-extrabold flex items-baseline">
                                    <div>{{ comment.user }}</div>
                                    <div class="text-gray-900 dark:text-gray-400 pl-3">{{ timeAgo(comment.time) }}</div>
                                </div>
                                <div class="text-gray-900 dark:text-gray-200 text-sm font-extrabold"
                                    v-html="comment.text"></div>
                                <div class="mt-2 flex items-center">
                                    <ThumbUpOutline :fillColor="'gray'" :size="20" class="pr-2" />
                                    <div class="text-gray-400 text-sm font-extrabold pr-10">{{ comment.likes }}
                                    </div>
                                    <ThumbDownOutline :fillColor="'gray'" :size="20" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="!loading" class="w-[35%] p-3 sm:block hidden">
                <div v-for="vid in recommendedVideos" :key="vid.id" @click="navigateToVideo(vid.id)">
                    <RecommendedVideos :vid="vid" />
                </div>
            </div>
        </div>
    </NavLayout>
</template>
