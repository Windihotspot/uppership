<template>
    <header class="bg-gray-100 text-black font-normal">
        <nav
            class="container mx-auto flex items-center justify-between py-4 px-6"
        >
            <!-- Logo -->
            <a href="/" class="flex items-center space-x-2">
               
                <img class="h-[30px]" src="../assets/uppership.png" alt="">
            </a>

            <!-- Desktop Links -->
            <div class="hidden lg:flex space-x-6">
                <a
                    v-for="(link, index) in links"
                    :key="index"
                    :href="link.to"
                    class="hover:text-secondary font-semi-bold transition-colors"
                >
                    {{ link.label }}
                </a>
            </div>

            <!-- Call-to-Action -->
            <v-btn  color="#FFC400" class="mx-2 btn p-2" rounded="pill">
                Log in
                <i class="fa-solid fa-arrow-right ml-2"></i>
            </v-btn>

            <!-- Hamburger Menu -->
            <button
                @click="toggleMenu"
                class="lg:hidden p-2 text-white focus:outline-none"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 6h16M4 12h16m-7 6h7"
                    />
                </svg>
            </button>
        </nav>

        <!-- Mobile Menu -->
        <div
            v-if="menuOpen"
            class="lg:hidden bg-white text-black border-t border-gray-200"
        >
            <div class="flex flex-col space-y-4 px-6 py-4">
                <a
                    v-for="(link, index) in links"
                    :key="index"
                    :href="link.to"
                    class="hover:text-secondary transition-colors"
                >
                    {{ link.label }}
                </a>
                <a
                    href="/register"
                    class="block px-6 py-2 text-sm font-semibold text-center bg-secondary text-white rounded-full hover:bg-secondary/80 transition"
                >
                    Get Started
                </a>
            </div>
        </div>
    </header>
</template>

<script setup>
import { ref } from "vue";
const links = ref([
    { label: "Shipping" },
    { label: "Tracking" },
    { label: "Business Solutions" },
    { label: "Support" },
]);
const menuOpen = ref(false);
const toggleMenu = () => {
    menuOpen.value = true;
};
</script>

<style scoped>
.btn{
    text-transform: none;
}
</style>
