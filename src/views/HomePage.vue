<template>
  <section
    class="relative bg-cover bg-center bg-no-repeat h-screen text-white"
    style="
      background-image: url('https://images.unsplash.com/photo-1642084399774-7bae8ede2477?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHNoaXBwaW5nJTIwY29tcGFueXxlbnwwfHwwfHx8MA%3D%3D');
    "
  >
    <div class="absolute inset-0 bg-gray-900 bg-opacity-50"></div>

    <header class="relative z-10 flex justify-between items-center px-6 md:px-16 py-4">
      <div class="flex items-center space-x-2">
        <img src="../assets/uppership.png" alt="" class="h-10" />
      </div>
      <nav class="space-x-6 text-white font-medium hidden md:flex">
        <a href="#" class="hover:text-blue-300">Home</a>
        <a href="#" class="hover:text-blue-300">About</a>
        <a href="#" class="hover:text-blue-300">Team</a>
        <a href="#" class="hover:text-blue-300">Service</a>
        <a href="#" class="hover:text-blue-300">FAQ</a>
        <a href="#" class="hover:text-blue-300">Blog</a>
        <a href="#" class="hover:text-blue-300">Contact</a>
      </nav>
    </header>

    <div class="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
      <p class="text-lg md:text-xl text-white-500 font-semibold mb-4 tracking-wider">
        Welcome to Upperships
      </p>
      <h1 class="text-3xl md:text-6xl font-bold leading-tight md:leading-snug mb-6">
        We Provide Best Dispatch <br />
        and Parcel Services
      </h1>
      <div class="flex space-x-4">
        <button
          class="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-full shadow-md transition"
        >
          Get Quotes
        </button>
        <button
          class="border border-white hover:bg-white hover:text-black text-white font-semibold py-3 px-6 rounded-full transition"
        >
          Contact Us
        </button>
      </div>
    </div>
  </section>

  <section class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid gap-8 md:grid-cols-3">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="bg-white shadow-lg rounded-xl p-8 text-center transition hover:shadow-xl"
        >
          <div class="flex justify-center mb-4">
            <div
              class="w-16 h-16 flex items-center justify-center rounded-full border border-red-200 bg-red-50"
            >
              <i :class="feature.icon" class="text-red-500 text-xl"></i>
            </div>
          </div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">
            {{ feature.title }}
          </h3>
          <p class="text-gray-600 text-sm leading-relaxed">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </div>
  </section>

  <section class="bg-white py-16 p-6">
    <div class="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-12 items-center">
      <!-- Left Content -->
      <div>
        <div class="inline-block bg-red-600 text-white text-sm font-semibold px-4 py-1 rounded-tr-lg rounded-bl-lg mb-4">
          Why We Are The Best
        </div>
        <h2 class="text-4xl font-bold text-gray-800 mb-4 leading-tight">
          30+ Years Experiences in Courier Service
        </h2>
        <p class="text-gray-600 mb-8">
          With over three decades of experience in the courier service industry
        </p>

        <!-- Feature List -->
        <div class="space-y-6">
          <div v-for="(service, index) in services" :key="index" class="flex items-start gap-4">
            <div class="w-12 h-12 flex items-center justify-center rounded-full border border-red-200 bg-red-50">
              <i :class="service.icon" class="text-red-600 text-lg"></i>
            </div>
            <div>
              <h4 class="text-lg font-semibold text-gray-800 mb-1">{{ service.title }}</h4>
              <p class="text-sm text-gray-600">{{ service.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Image -->
      <div class="flex justify-center">
        <img
          src="https://plus.unsplash.com/premium_photo-1661319057321-a51c7961e993?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGZhc3QlMjBkZWxpdmVyeXxlbnwwfHwwfHx8MA%3D%3D"
          alt="Fast Delivery"
          class="max-w-full h-auto object-contain"
        />
      </div>
    </div>
  </section>\<template>
  <section class="services-section relative py-16 bg-blue-900 text-white">
    <!-- Background image with overlay -->
    <div class="absolute inset-0 bg-blue-900/90 z-0"></div>
    
    <!-- Content container -->
    <div class="container mx-auto px-4 relative z-10">
      <!-- Services heading -->
      <div class="text-center mb-12">
        <div class="inline-block bg-red-500 text-white px-4 py-1 rounded-md mb-2">
          Services
        </div>
        <h2 class="text-4xl font-bold">What We Serve</h2>
        <p class="mt-4 max-w-3xl mx-auto">
          At SwiftDrop, we take pride in offering a diverse range of courier and logistics services to cater to
          your specific needs. Our commitment to excellence ensures that your deliveries are in safe hands.
        </p>
      </div>
      
      <!-- Services grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Warehousing card -->
        <div class="bg-blue-800/70 rounded-lg p-8 flex flex-col items-center text-center">
          <div class="w-24 h-24 mb-4">
            <img src="" alt="Warehousing" class="w-full h-full" />
          </div>
          <h3 class="text-2xl font-bold text-red-500 mb-4">Warehousing</h3>
          <p>
            Need storage solutions? Our warehousing service offers safe and secure storage options for
            your inventory. With us, you can streamline your logistics and inventory management.
          </p>
        </div>
        
        <!-- International Courier card -->
        <div class="bg-blue-800/70 rounded-lg p-8 flex flex-col items-center text-center">
          <div class="w-24 h-24 mb-4">
            <img src="" alt="International Courier" class="w-full h-full" />
          </div>
          <h3 class="text-2xl font-bold text-red-500 mb-4">International Courier</h3>
          <p>
            Going global? Our international courier service ensures that your packages reach destinations
            around the world. We handle customs, documentation, and delivery, so you don't have to worry.
          </p>
        </div>
        
        <!-- Over Night Courier card -->
        <div class="bg-blue-800/70 rounded-lg p-8 flex flex-col items-center text-center">
          <div class="w-24 h-24 mb-4">
            <img src="" class="w-full h-full" />
          </div>
          <h3 class="text-2xl font-bold text-red-500 mb-4">Over Night Courier</h3>
          <p>
            With our overnight courier service, you can schedule deliveries that need to arrive the next day.
            Swift, reliable, and convenient for time-sensitive packages.
          </p>
        </div>
      </div>
    </div>
    
    <!-- Scroll to top button -->
    <div class="absolute bottom-4 right-4">
      <button @click="scrollToTop" class="bg-red-500 text-white p-3 rounded-md hover:bg-red-600 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </div>
  </section>
</template>




</template>

<script setup>
const features = [
  {
    title: 'Real-Time Tracking',
    description:
      "With SwiftDrop's real-time tracking feature, you can monitor the progress of your deliveries from pickup to drop-off.",
    icon: 'fas fa-file-alt' // Font Awesome icon class
  },
  {
    title: 'Secure and Contactless Delivery',
    description:
      'Your safety and security are our top priorities. SwiftDrop offers secure and contactless delivery options, providing you with peace of mind.',
    icon: 'fas fa-shield-alt'
  },
  {
    title: 'Wide Service Network',
    description:
      "SwiftDrop's expansive service network means we can connect you with a wide range of delivery options. Whether you need standard, express, or international courier services, we have you covered.",
    icon: 'fas fa-network-wired'
  }
]

const services = [
  {
    title: 'Secured Services',
    description:
      'At SwiftDrop, we prioritize the security of your deliveries. We take the necessary measures to ensure that your packages and information are protected throughout the delivery process.',
    icon: 'fas fa-shield-alt',
  },
  {
    title: 'Lowest Cost',
    description:
      'We understand the importance of affordability. SwiftDrop is committed to offering competitive pricing to make our services accessible to everyone.',
    icon: 'fas fa-dollar-sign',
  },
  {
    title: 'Fast Delivery',
    description:
      'Time is valuable, and we respect that. Our efficient logistics ensure your packages are delivered swiftly and reliably.',
    icon: 'fas fa-shipping-fast',
  },
];



</script>

<style></style>
