<template>
  <header class="bg-gray-100 text-black font-normal">
    <nav class="container mx-auto flex items-center justify-between py-4 px-6">
      <!-- Logo -->
      <a href="/" class="flex items-center space-x-2">
        <img class="h-[30px]" src="../assets/uppership.png" alt="" />
      </a>

      <!-- Desktop Links -->
      <div class="hidden lg:flex space-x-6">
        <a
          v-for="(link, index) in links"
          :key="index"
          :href="link.to"
          class="hover:text-secondary font-semibold transition-colors"
        >
          {{ link.label }}
        </a>
      </div>

      <!-- Login Button -->
      <v-btn color="#FFC400" class="mx-2 btn p-2" rounded="pill">
        Log in
        <i class="fa-solid fa-arrow-right ml-2"></i>
      </v-btn>

      <!-- Mobile Menu Button -->
      <button @click="toggleMenu" class="lg:hidden p-2 text-gray-700">
        <i class="fas fa-bars text-xl"></i>
      </button>
    </nav>

    <!-- Mobile Dropdown -->
    <v-expand-transition>
      <div
        v-show="menuOpen"
        class="lg:hidden bg-white text-black border-t border-gray-200 px-6 py-4"
      >
        <v-list dense>
          <v-list-item
            v-for="(link, index) in links"
            :key="index"
            :href="link.to"
            class="hover:text-secondary transition-colors"
          >
            <v-list-item-title>{{ link.label }}</v-list-item-title>
          </v-list-item>
        </v-list>
        <v-btn href="/register" color="secondary" class="mt-4 w-full" rounded="pill">
          Get Started
        </v-btn>
      </div>
    </v-expand-transition>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const links = ref([
  { label: 'Shipping', to: '/shipping' },
  { label: 'Tracking', to: '/tracking' },
  { label: 'About', to: '/about' }
])

const menuOpen = ref(false)
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}
</script>

<style scoped>
.btn {
  text-transform: none;
}
</style>
