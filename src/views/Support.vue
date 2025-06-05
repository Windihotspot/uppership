<template>
  <Header />
  <div class="bg-pink-20 min-h-screen py-12 px-6">
    <!-- Header Section -->
    <div class="text-center max-w-3xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">Hello, how can we assist you today?</h1>
      <div class="relative w-full max-w-xl mx-auto mb-6">
        <input
          v-model="search"
          placeholder="Ask a question..."
          class="w-full border border-gray-300 rounded-full px-5 py-3 shadow-md focus:outline-none"
        />
        <button
          class="absolute right-2 top-2 bg-pink-500 text-white px-4 py-2 rounded-full shadow hover:bg-pink-600"
        >
          Search
        </button>
      </div>
      <p class="text-gray-600 mb-4">Or choose a category to quickly find the help you need</p>
      <div class="flex flex-wrap justify-center gap-4">
        <div class="category-button border-2 border-pink-500 bg-white text-pink-600 font-semibold">
          Getting Started
        </div>
        <div class="category-button border-2 border-pink-500 bg-white text-pink-600 font-semibold">
          Shipping Plans
        </div>
        <div class="category-button border-2 border-pink-500 bg-white text-pink-600 font-semibold">
          Tracking Questions
        </div>
        <div class="category-button border-2 border-pink-500 bg-white text-pink-600 font-semibold">
          Service Guide
        </div>
      </div>
    </div>

    <!-- FAQ Section -->
    <div class="mt-16 max-w-4xl mx-auto">
      <h2 class="text-2xl font-bold text-center mb-6">Frequently Asked Questions</h2>
      <v-expansion-panels multiple>
        <v-expansion-panel>
          <v-expansion-panel-title> How to schedule a shipment? </v-expansion-panel-title>
          <v-expansion-panel-text>
            Scheduling a shipment is easy, just go to the shipping page and provide your shipping
            details.
          </v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-title> What shipping plans do you offer? </v-expansion-panel-title>
          <v-expansion-panel-text>
            We offer Standard, Express, and Same-Day Delivery options depending on your location.
            Each plan includes real-time tracking and customer support.
          </v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-title> Is my shipment insured? </v-expansion-panel-title>
          <v-expansion-panel-text>
            Yes, all shipments are covered by basic insurance. You can opt for premium coverage
            during checkout for high-value items.
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>

    <!-- Contact Box -->
    <div
      class="mt-16 max-w-4xl mx-auto bg-pink-100 rounded-2xl p-6 shadow-lg flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-6"
    >
      <div>
        <h3 class="text-xl font-semibold text-gray-800 mb-1">Still need help?</h3>
        <p class="text-gray-700">If your question wasn't answered, feel free to contact us.</p>
      </div>
      <div class="flex flex-col md:flex-row gap-4">
        <div class="bg-white p-4 rounded-lg shadow text-center">
          <p class="font-semibold text-pink-600">📞 +1 (855) 535-3292</p>
          <p class="text-sm text-gray-500">We’re here to help!</p>
        </div>
        <div class="bg-white p-4 rounded-lg shadow text-center">
          <p class="font-semibold text-pink-600">✉️ support@upperships.com</p>
          <p class="text-sm text-gray-500">Fastest way to get help.</p>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { ref } from 'vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
const search = ref('')
</script>

<style scoped>
.category-button {
  @apply bg-white px-5 py-3 rounded-lg shadow text-gray-700 hover:bg-pink-100 transition duration-150;
}
</style>
