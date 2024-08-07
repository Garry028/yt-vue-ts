<template>
    <div class="relative">
        <div id="TopNav"
            class="w-full h-[60px] fixed dark:bg-[#0f0f0f] bg-white dark:text-[#f1f1f1] text-black z-20 flex items-center justify-between">
            <div class="flex items-center">
                <button @click="isNavOverlay()" class="p-2 ml-3 rounded-full bg-gray-100 dark:bg-slate-900 inline-block cursor-pointer">
                    <MenuIcon :fillColor="setColor" :size="26" />
                </button>
                <div class="mx-2"></div>
                <router-link to="/" class="flex items-center justify-center mr-10 cursor-pointer">
                    <img width="32" src="/src/assets/YT-logo.png" alt="YouTube Logo">
                    <img width="62" src="/src/assets/YT-logo-text.png" alt="YouTube Logo Text">
                </router-link>
            </div>

            <div class="w-[600px] md:block hidden">
                <div class="rounded-full flex items-center dark:bg-[#222222] bg-gray-100">
                    <input v-model="slotSearchTerm" type="text"
                        class="form-control block w-full px-5 py-1.5 text-base font-normal dark:text-gray-200 text-gray-800 dark:bg-black bg-white placeholder-gray-400 bg-clip-padding border border-solid dark:border-l-gray-700 dark:border-y-gray-700 border-gray-300 rounded-l-full transition ease-in-out m-0 border-transparent focus:ring-0"
                        placeholder="Search" />
                    <MagnifyIcon class="mx-6" :fillColor="setColor" :size="23" />
                </div>
            </div>

            <DarkModeToggle @isDarkMode="setDarkMode" />
            <div>
                <img class="rounded-full mx-8" width="35"
                    src="https://yt3.ggpht.com/e9o-24_frmNSSVvjS47rT8qCHgsHNiedqgXbzmrmpsj6H1ketcufR1B9vLXTZRa30krRksPj=s88-c-k-c0x00ffffff-no-rj-mo">
            </div>
        </div>

        <!-- OVERLAY NAV SECTION -->
        <div @click="openSideNavOverlay = false" class="bg-black bg-opacity-70 fixed z-50 w-full h-screen"
            :class="openSideNavOverlay ? 'animate__animated animate__fadeIn animate__faster' : 'hidden'">
            <div id="SideNavOverlay" ref="sideNavOverlay" class="h-full fixed z-50 dark:bg-black bg-white  w-[240px]"
                :class="openSideNavOverlay ? 'animate__animated animate__slideInLeft animate__faster' : 'animate__animated animate__slideOutLeft animate__faster'">
                <div class="flex items-center pt-2">
                    <button @click="isNavOverlay"
                        class="p-2 ml-3 rounded-full  dark:hover:bg-gray-800 hover:bg-gray-200 cursor-pointer">
                        <MenuIcon :fillColor="setColor" :size="26" />
                    </button>
                    <div class="mx-2"></div>
                    <router-link to="/" class="flex items-center justify-center cursor-pointer">
                        <img width="32" src="/src/assets/YT-logo.png" alt="YouTube Logo">
                        <img width="62" src="/src/assets/YT-logo-text.png" alt="YouTube Logo Text">
                    </router-link>
                </div>
                <ul class="w-full px-5 py-2 p-2 mt-2">
                    <router-link to="/">
                        <SideNavItem :openSideNav="true" iconString="Home"  :darkMode="darkMode"/>
                    </router-link>
                    <div class="border-b dark:border-b-gray-700 border-b-gray-300 my-2.5"></div>
                    <SideNavItem :openSideNav="true" iconString="Music" @click="handleSelectedCategory('Music')" />
                    <SideNavItem :openSideNav="true" iconString="Sports" @click="handleSelectedCategory('Sports')" />
                    <SideNavItem :openSideNav="true" iconString="Gaming" @click="handleSelectedCategory('Gaming')" />
                    <SideNavItem :openSideNav="true" iconString="Movies" @click="handleSelectedCategory('Movies')" />
                    <SideNavItem :openSideNav="true" iconString="News" @click="handleSelectedCategory('News')" />
                    <SideNavItem :openSideNav="true" iconString="Courses" @click="handleSelectedCategory('Courses')" />
                    <div v-if="true">
                        <div class="border-b dark:border-b-gray-700 border-b-gray-300 my-2.5"></div>
                        <div class="dark:text-gray-400 text-gray-600 text-[14px] font-extrabold">
                            About Press Copyright
                            <div>Contact us</div>
                            Creator Advertise Developers
                        </div>
                        <div class="border-b dark:border-b-gray-700 border-b-gray-300 my-2.5"></div>
                        <div class="dark:text-gray-400 text-gray-600 text-[14px] font-extrabold">
                            Terms Privacy Policy & Safety
                            <div>How YouTube works</div>
                            <span>Test new features</span>
                        </div>
                    </div>
                </ul>
            </div>
        </div>
        <!-- OVERLAY NAV SECTION END -->
        <div class="w-full h-[calc(100vh-100px)] absolute right-0 top-[60px]" :class="{
            'w-[calc(100%-71px)]': !openSideNav,
            'w-[calc(100%-241px)]': openSideNav,
            'w-[100vw] ': route.path !== '/',
            'w-[100vw]': width < 639
        }">
            <slot :slotSearchTerm="slotSearchTerm" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref,computed } from 'vue';
import MagnifyIcon from 'vue-material-design-icons/Magnify.vue';
import MenuIcon from 'vue-material-design-icons/Menu.vue';
import { useRoute } from 'vue-router';
import SideNavItem from '../components/SideNavItem.vue';
import DarkModeToggle from '../components/DarkModeToggle.vue';

const darkMode = ref(false);
const openSideNav = ref(false);
const openSideNavOverlay = ref(false);
const sideNavOverlay = ref<HTMLElement | null>(null);
const width = ref(window.innerWidth);
const slotSearchTerm = ref('');
const route = useRoute();

const handleSelectedCategory = (category: string) => {
    slotSearchTerm.value = category;
};
const setColor = computed(() => {
    return darkMode.value ? '#FFFFFF' : '#000000';
});
const setDarkMode = (isDark: boolean) => {
    console.log(isDark);

    darkMode.value = isDark;
};

onMounted(() => {
    resize();
    if (sideNavOverlay.value) {
        sideNavOverlay.value.classList.add('hidden');
    }
    window.addEventListener('resize', () => {
        width.value = window.innerWidth;
        resize();
    });
});

const resize = () => {
    if (width.value < 1280 && openSideNav.value) {
        openSideNav.value = false;
    }
    if (width.value >= 1280 && !openSideNav.value && route.path === '/') {
        openSideNav.value = true;
    }
};

const isNavOverlay = () => {
    openSideNavOverlay.value = !openSideNavOverlay.value;
};
</script>


<style scoped></style>
