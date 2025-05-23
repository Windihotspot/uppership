<template>
  <Header />
  <div class="bg-gray-100">
    <section class="relative h-96 mb-4 text-white overflow-hidden">
      <!-- Background image layer -->
      <div
        v-for="(img, i) in images"
        :key="i"
        class="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
        :style="{ backgroundImage: `url(${img})` }"
        :class="{
          'opacity-100 z-0': i === currentIndex,
          'opacity-0 z-0': i !== currentIndex
        }"
      ></div>

      <!-- Dark overlay to enhance text visibility -->
      <div class="absolute inset-0 bg-blue-300 bg-opacity-60 z-10"></div>

      <!-- Content layer -->
      <div class="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
        <p class="text-lg md:text-xl font-semibold mb-4 tracking-wider">Welcome to Upperships</p>
        <h1 class="text-3xl md:text-6xl font-bold leading-tight md:leading-snug mb-6">
          We Provide Best Dispatch <br />
          and Parcel Services
        </h1>
      </div>
    </section>

    <div class="grid grid-cols-1 md:grid-cols-5 gap-8 p-2">
      <div class="bg-white p-6 rounded-2xl shadow-lg h-[250px] md:col-span-3">
        <p class="mb-6 text-lg font-semibold">Track Your Parcel</p>
        <v-text-field
          @click="goToTrackingPage"
          label="Tracking Number"
          variant="outlined"
          dense
          required
          color="blue"
          class="w-full"
          v-model="trackingNumber"
        ></v-text-field>
        <div class="mt-4">
          <v-btn @click="goToTrackingPage" variant="outlined" rounded="pill" color="primary"
            >Track</v-btn
          >
        </div>
      </div>

      <!-- Sign up form -->
      <div class="bg-white p-6 rounded-2xl shadow-lg h-[250px] mb-4 md:col-span-2">
        <p class="mb-2 text-sm font-semibold">Set delivery alerts for your parcel</p>
        <p class="mb-4 text-sm">
          Enrol in Uppership and take the worry of having your parcel sit outside for delivery
        </p>
        <RouterLink to="/signup">
          <v-btn to="/signup" color="#FFC400" class="btn p-1 mb-2" rounded="pill">
            Sign up
            <i class="fa-solid fa-arrow-right ml-2"></i>
          </v-btn>
        </RouterLink>

        <div class="flex mt-6">
          <p class="mt-2 text-sm">Already enrolled?</p>
          <RouterLink to="/login">
            <v-btn to="/login" color="primary" class="mx-2 btn p-2" variant="text"> Login </v-btn>
          </RouterLink>
        </div>
      </div>
    </div>

    <section class="py-16 bg-white rounded m-2">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid gap-8 md:grid-cols-3">
          <div
            v-for="(feature, index) in features"
            :key="index"
            class="bg-white shadow-lg rounded-xl p-4 text-center transition hover:shadow-xl"
          >
            <div class="flex justify-center mb-2">
              <div class="w-8 h-8 flex items-center justify-center">
                <i :class="feature.icon" class="text-red-500 text-xl"></i>
              </div>
            </div>
            <h3 class="text-md font-semibold text-gray-800 mb-2">
              {{ feature.title }}
            </h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-white py-16 p-6 rounded">
      <div class="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-12 items-center">
        <!-- Left Content -->
        <div>
          <div
            class="inline-block bg-[#FFC400] text-white text-sm font-semibold px-4 py-1 rounded-tr-lg rounded-bl-lg mb-4"
          >
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
              <div class="w-12 h-12 flex items-center justify-center">
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
        <div class="flex-1">
          <video class="w-full max-w-lg mx-auto" autoplay muted loop playsinline>
            <source
              src="https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/EeN01lAOxijss6byx/videoblocks-e-logistics-international-delivery-concept-world-map-with-logistic-network-distribution-on-background-cargo-ships-delivery-containers-in-port-stock-background-for-concept-of-fast-or-instant_screrixxu__390caab288fbb417c930e9f54343cf18__P360.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
    <template>
      <section class="services-section relative py-16 bg-blue-900 text-white">
        <!-- Background image with overlay -->
        <div class="absolute inset-0 bg-blue-900/90 z-0"></div>

        <!-- Content container -->
        <div class="container mx-auto px-4 relative z-10">
          <!-- Services heading -->
          <div class="text-center mb-12">
            <div class="inline-block bg-red-500 text-white px-4 py-1 rounded-md mb-2">Services</div>
            <h2 class="text-4xl font-bold">What We Serve</h2>
            <p class="mt-4 max-w-3xl mx-auto">
              At Upperships, we take pride in offering a diverse range of courier and logistics
              services to cater to your specific needs. Our commitment to excellence ensures that
              your deliveries are in safe hands.
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
                Need storage solutions? Our warehousing service offers safe and secure storage
                options for your inventory. With us, you can streamline your logistics and inventory
                management.
              </p>
            </div>

            <!-- International Courier card -->
            <div class="bg-blue-800/70 rounded-lg p-8 flex flex-col items-center text-center">
              <div class="w-24 h-24 mb-4">
                <img src="" alt="International Courier" class="w-full h-full" />
              </div>
              <h3 class="text-2xl font-bold text-red-500 mb-4">International Courier</h3>
              <p>
                Going global? Our international courier service ensures that your packages reach
                destinations around the world. We handle customs, documentation, and delivery, so
                you don't have to worry.
              </p>
            </div>

            <!-- Over Night Courier card -->
            <div class="bg-blue-800/70 rounded-lg p-8 flex flex-col items-center text-center">
              <div class="w-24 h-24 mb-4">
                <img src="" class="w-full h-full" />
              </div>
              <h3 class="text-2xl font-bold text-red-500 mb-4">Over Night Courier</h3>
              <p>
                With our overnight courier service, you can schedule deliveries that need to arrive
                the next day. Swift, reliable, and convenient for time-sensitive packages.
              </p>
            </div>
          </div>
        </div>

        <!-- Scroll to top button -->
        <div class="absolute bottom-4 right-4">
          <button
            @click="scrollToTop"
            class="bg-red-500 text-white p-3 rounded-md hover:bg-red-600 transition-colors"
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
                d="M5 15l7-7 7 7"
              />
            </svg>
          </button>
        </div>
      </section>
    </template>

    <section class="flex flex-col lg:flex-row items-center gap-8 px-6 py-12 bg-white rounded m-2">
      <!-- Left Text Content -->
      <div class="flex-1 max-w-xl space-y-6">
        <div
          class="inline-block bg-[#FFC400] text-white px-4 py-1 rounded-t-md rounded-bl-md shadow"
        >
          What We Offer
        </div>
        <h2 class="text-4xl font-bold text-gray-900">Explore Our Services and Solutions</h2>
        <p class="text-gray-600">
          Discover a wide range of services and solutions designed to meet your delivery needs.
          Whether you're looking for standard or specialized delivery options, Upperships has you
          covered. Explore our offerings and find the perfect solution for your requirements.
        </p>

        <!-- Vuetify Expansion Panels -->
        <v-expansion-panels multiple elevation="0" class="">
          <v-expansion-panel v-for="(item, i) in faqItems" :key="i" class="mb-2">
            <v-expansion-panel-title
              class="text-lg font-semibold text-gray-800"
              expand-icon="mdi-chevron-down"
            >
              {{ item.question }}
            </v-expansion-panel-title>
            <v-expansion-panel-text class="text-gray-600">
              {{ item.answer }}
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>

      <!-- video Image -->
      <!-- Truck Video -->
      <div class="flex-1">
        <video class="w-full max-w-lg mx-auto" autoplay muted loop playsinline>
          <source
            src="https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/EeN01lAOxijss6byx/videoblocks-e-logistics-international-delivery-concept-world-map-with-logistic-network-distribution-on-background-cargo-ships-delivery-containers-in-port-stock-background-for-concept-of-fast-or-instant_screrixxu__390caab288fbb417c930e9f54343cf18__P360.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Header from '@/components/Header.vue'

import { RouterLink, useRouter } from 'vue-router'

const trackingNumber = ref('')
const router = useRouter()

const goToTrackingPage = () => {
  if (trackingNumber.value.trim()) {
    router.push({ name: 'Track', params: { trackingNumber: trackingNumber.value } })
  }
}

const images = [
  'https://images.unsplash.com/photo-1568347877321-f8935c7dc5a3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2hpcHBpbmd8ZW58MHx8MHx8fDA%3D',
  'https://plus.unsplash.com/premium_photo-1683120796013-f2f18451a907?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2hpcHBpbmclMjBsb2dpc3RpY3N8ZW58MHx8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1725449264087-28926bc1a610?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hpcHBpbmclMjBsb2dpc3RpY3N8ZW58MHx8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1644134913825-5ff0ff4e731c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNoaXBwaW5nJTIwbG9naXN0aWNzfGVufDB8fDB8fHww',
  'https://images.unsplash.com/photo-1634638022845-1ab614a94128?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHNoaXBwaW5nJTIwbG9naXN0aWNzfGVufDB8fDB8fHww',
  'https://images.pexels.com/photos/3856433/pexels-photo-3856433.jpeg?auto=compress&cs=tinysrgb&w=600'
]

const currentIndex = ref(0)
let intervalId = null
let carouselIntervalId = null

// Carousel slideshow
const carouselImages = [
  'https://images.pexels.com/photos/6169056/pexels-photo-6169056.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/4481530/pexels-photo-4481530.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/4487365/pexels-photo-4487365.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/6170098/pexels-photo-6170098.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/5025512/pexels-photo-5025512.jpeg?auto=compress&cs=tinysrgb&w=600'
]
const currentCarouselIndex = ref(0)

onMounted(() => {
  intervalId = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % images.length
  }, 4000) // change image every 5 seconds
  carouselIntervalId = setInterval(() => {
    currentCarouselIndex.value = (currentCarouselIndex.value + 1) % carouselImages.length
  }, 4000)
})

onBeforeUnmount(() => {
  clearInterval(intervalId)
  clearInterval(carouselIntervalId)
})

const features = [
  {
    title: 'Real-Time Tracking',
    description:
      "With Upperships's real-time tracking feature, you can monitor the progress of your deliveries from pickup to drop-off.",
    icon: 'fas fa-file-alt' // Font Awesome icon class
  },
  {
    title: 'Secure and Contactless Delivery',
    description:
      'Your safety and security are our top priorities. Upperships offers secure and contactless delivery options, providing you with peace of mind.',
    icon: 'fas fa-shield-alt'
  },
  {
    title: 'Wide Service Network',
    description:
      "Upperships's expansive service network means we can connect you with a wide range of delivery options. Whether you need standard, express, or international courier services, we have you covered.",
    icon: 'fas fa-network-wired'
  }
]

const services = [
  {
    title: 'Secured Services',
    description:
      'At Upperships, we prioritize the security of your deliveries. We take the necessary measures to ensure that your packages and information are protected throughout the delivery process.',
    icon: 'fas fa-shield-alt'
  },
  {
    title: 'Lowest Cost',
    description:
      'We understand the importance of affordability. Upperships is committed to offering competitive pricing to make our services accessible to everyone.',
    icon: 'fas fa-dollar-sign'
  },
  {
    title: 'Fast Delivery',
    description:
      'Time is valuable, and we respect that. Our efficient logistics ensure your packages are delivered swiftly and reliably.',
    icon: 'fas fa-shipping-fast'
  }
]

const faqItems = [
  {
    question: 'Is Upperships available in my area?',
    answer: 'You can check service availability by entering your ZIP code during the order process.'
  },
  {
    question: "What happens if there's an issue with my delivery?",
    answer: 'Our support team is available 24/7 to assist you with any delivery issues.'
  },
  {
    question: 'What is the estimated delivery time for my order?',
    answer:
      'Delivery times vary by location and service type. Estimates are provided during checkout.'
  },
  {
    question: 'How do I place an order with Upperships?',
    answer:
      'Simply sign up, select your service type, and follow the prompts to complete your order.'
  }
]
</script>

<style></style>
