<template>
  <div
    id="nav"
    :data-state="isToggled ? 'active' : ''"
    class="group w-full border-b border-black/5 dark:border-white/5 lg:border-transparent"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="relative flex flex-wrap items-center justify-between gap-6 py-3 md:gap-0 md:py-4">
        <!-- Logo -->
        <div class="relative z-20 flex w-full justify-between md:px-0 lg:w-fit">
          <RouterLink to="/">
            <img
              src="/src/assets/uppership.png"
              alt="Uppership Logo"
              class="h-10 w-auto object-contain sm:h-12 lg:h-14"
            />
          </RouterLink>

          <!-- Hamburger -->
          <div class="relative flex max-h-10 items-center lg:hidden">
            <button
              aria-label="hamburger"
              class="relative -mr-6 p-6 active:scale-95 duration-300"
              @click="toggleNav"
            >
              <i
                :class="isToggled ? 'fa-times' : 'fa-bars'"
                class="text-gray-950 fas dark:text-white text-xl transition duration-300"
              ></i>
            </button>
          </div>
        </div>

        <!-- Mobile Overlay -->

        <!-- Nav Links -->
        <div
          id="navlinks"
          class="fixed top-16 left-0 z-30 w-full origin-top scale-95 flex flex-col items-start gap-6 rounded-b-2xl border border-t-0 border-gray-100 bg-white p-6 opacity-0 shadow-2xl shadow-gray-600/10 transition-all duration-300 dark:border-gray-700 dark:bg-gray-800 dark:shadow-none lg:static lg:top-auto lg:left-auto lg:z-auto lg:w-fit lg:scale-100 lg:flex-row lg:items-center lg:gap-0 lg:border-none lg:bg-transparent lg:p-0 lg:opacity-100 lg:shadow-none lg:dark:bg-transparent"
          :class="{ 'opacity-100 scale-100': isToggled, visible: isToggled }"
        >
          <div class="w-full text-gray-600 dark:text-gray-200 lg:w-auto lg:pt-0">
            <div
              id="links-group"
              class="flex flex-col gap-4 tracking-wide lg:flex-row lg:gap-0 lg:text-sm"
            >
              <RouterLink
                v-for="link in links"
                :key="link.label"
                :to="link.to"
                @click.native="toggleNav"
                class="hover:text-primary block transition dark:hover:text-white md:px-4"
              >
                {{ link.label }}
              </RouterLink>

              <!-- <a
                href="https://tailtips.dev"
                target="_blank"
                class="flex items-center gap-2 font-semibold text-gray-700 transition hover:text-primary dark:text-white dark:hover:text-white md:px-4"
              >
                <span>TailwindCSS Tips</span>
                <span
                  class="flex items-center gap-1 rounded-full border bg-primary/20 px-2 py-0.5 text-xs tracking-wider text-purple-700 dark:bg-white/10 dark:text-orange-300"
                >
                  <i class="fas fa-star text-[10px]"></i> New
                </span>
              </a> -->
            </div>
          </div>

          <div class="mt-6 w-full lg:mt-0 lg:w-auto">
            <RouterLink
              to="/login"
              class="relative flex h-9 w-full items-center justify-center px-4 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
            >
              <span class="relative text-sm font-semibold text-white">Login</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isToggled = ref(false)

const links = [
  { to: '/about', label: 'About' },
  { to: '/shipping', label: 'Shipping' },
  { to: '/support', label: 'Support' }
]

function toggleNav() {
  isToggled.value = !isToggled.value
}
</script>
