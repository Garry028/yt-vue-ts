<template>
    <li :class="[!openSideNav ? 'p-2' : 'flex items-center p-2']"
        class="text-white text-sm font-semibold text-center hover:bg-gray-700 rounded-lg cursor-pointer">
        <div :class="[!openSideNav ? 'w-full flex justify-center' : '']">
            <component :is="icon" />
        </div>
        <div :class="[!openSideNav ? '' : 'mt-1 ml-4']">
            <span v-if="!openSideNav">{{ iconString.substring(0, 4) }}</span>
            <span v-else>{{ iconString }}</span>
        </div>
    </li>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import CoursesIcon from 'vue-material-design-icons/Book.vue';
import MoviesIcon from 'vue-material-design-icons/Filmstrip.vue';
import GamingIcon from 'vue-material-design-icons/Gamepad.vue';
import HomeIcon from 'vue-material-design-icons/Home.vue';
import MusicIcon from 'vue-material-design-icons/Music.vue';
import NewsIcon from 'vue-material-design-icons/Newspaper.vue';
import SportsIcon from 'vue-material-design-icons/Run.vue';

const props = defineProps<{
    openSideNav: boolean;
    iconString: string;
}>();

const icon = computed(() => {
    switch (props.iconString) {
        case 'Home':
            return HomeIcon;
        case 'Music':
            return MusicIcon;
        case 'Sports':
            return SportsIcon;
        case 'Gaming':
            return GamingIcon;
        case 'Movies':
            return MoviesIcon;
        case 'News':
            return NewsIcon;
        case 'Courses':
            return CoursesIcon;
        default:
            return null;
    }
});
</script>

<style scoped></style>
