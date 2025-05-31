<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>
<template>
  <Header />
  <section class="relative w-full bg-white overflow-hidden">
    <!-- Background image with responsive height -->
    <img
      src="https://plus.unsplash.com/premium_photo-1661900470988-6d807f044329?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bG9naXN0aWNzJTIwdGVhbXxlbnwwfHwwfHx8MA%3D%3D"
      alt="UPS Worker"
      class="w-full h-[500px] md:h-[600px] object-cover"
    />

    <!-- Overlay content -->
    <div class="w-full h-full flex items-center justify-center px-4 sm:px-8">
      <div
        class="bg-white bg-opacity-95 mt-4 backdrop-blur-sm p-6 sm:p-8 rounded-lg shadow-lg max-w-xl w-full"
      >
        <p class="text-md font-semibold text-[#FFC400] tracking-wider uppercase mb-2">About Us</p>
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          Delivering More Than Just Packages
        </h2>
        <p class="text-gray-700 text-base sm:text-lg leading-relaxed">
          At <span class="font-semibold text-gray-900">Upperships</span>, we’re redefining shipping
          and logistics by combining precision, speed, and trust. With a customer-first mindset, we
          offer tailored solutions for freight forwarding, last-mile delivery, and global logistics
          management. Our team of logistics experts is dedicated to ensuring your goods arrive
          safely and on time—every time. From small businesses to large enterprises, we move with
          purpose so your business can move forward.
        </p>
      </div>
    </div>
  </section>

  <div
    class="bg-white m-4 shadow-lg rounded-xl p-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-6"
  >
    <div class="flex-1 text-center md:text-left p-4">
      <i class="fas fa-user-tie text-2xl text-gray-600 mb-3 block"></i>

      <h3 class="text-2xl font-bold text-gray-900">~490K</h3>
      <p class="text-gray-600 mt-1">Employees</p>
    </div>

    <div class="flex-1 text-center p-4">
      <i class="fas fa-globe-americas text-2xl text-gray-600 mb-3 block"></i>
      <h3 class="text-2xl font-bold text-gray-900">200+</h3>
      <p class="text-gray-600 mt-1">Countries & territories served</p>
    </div>

    <div class="flex-1 text-center p-4">
      <i class="fas fa-shuttle-van text-2xl text-gray-600 mb-3 block"></i>
      <h3 class="text-2xl font-bold text-gray-900">2.4M</h3>
      <p class="text-gray-600 mt-1">Packages delivered daily</p>
    </div>

    <div class="flex-1 text-center p-4">
      <i class="fas fa-money-bill-wave text-2xl text-gray-600 mb-3 block"></i>
      <h3 class="text-2xl font-bold text-gray-900">$1.1B</h3>
      <p class="text-gray-600 mt-1">Total revenue for 2024</p>
    </div>
  </div>

  <Footer />
</template>

<style scoped></style>
