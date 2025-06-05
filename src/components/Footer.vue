<template>
  <footer class="bg-white border-t text-sm text-gray-700">
    <div class="max-w-7xl mx-auto py-8 px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Quick Links -->
      <!-- Quick Links -->
      <div>
        <h3 class="text-red-600 font-semibold mb-2">Quick Links</h3>
        <ul class="space-y-1">
          <li><router-link to="/" class="hover:underline">Customer Service</router-link></li>
          <li><router-link to="/" class="hover:underline">Customer Portal Logins</router-link></li>
          <li>
            <router-link to="/" class="hover:underline"
              >Digital Partners and Integrations</router-link
            >
          </li>
          <li>
            <router-link to="/" class="hover:underline"
              >Developer Portal <span aria-hidden="true">↗</span></router-link
            >
          </li>
          <li><router-link to="/quote" class="hover:underline">Get a Quote</router-link></li>
          <li><router-link to="/" class="hover:underline">uppership for Business</router-link></li>
        </ul>
      </div>

      <!-- Our Divisions -->
      <!-- Our Divisions -->
      <div>
        <h3 class="text-black font-semibold mb-2">Our Divisions</h3>
        <ul class="space-y-1">
          <li><router-link to="/" class="hover:underline">uppership Express</router-link></li>
          <li>
            <router-link to="/" class="hover:underline">uppership Global Forwarding</router-link>
          </li>
          <li><router-link to="/" class="hover:underline">Other Global Divisions</router-link></li>
        </ul>
      </div>

      <!-- Company Info -->
      <div>
        <h3 class="text-black font-semibold mb-2">Company Information</h3>
        <ul class="space-y-1">
          <li><router-link to="/" class="hover:underline">About uppership</router-link></li>
          <li>
            <router-link to="/" class="hover:underline"
              >Delivered <span aria-hidden="true">↗</span></router-link
            >
          </li>
          <li><router-link to="/" class="hover:underline">Careers</router-link></li>
          <li><router-link to="/" class="hover:underline">Press Center</router-link></li>
          <li>
            <router-link to="/" class="hover:underline"
              >Investors <span aria-hidden="true">↗</span></router-link
            >
          </li>
          <li><router-link to="/" class="hover:underline">Sustainability</router-link></li>
          <li><router-link to="/" class="hover:underline">Brand Partnerships</router-link></li>
        </ul>
      </div>
    </div>

    <!-- Bottom Section -->
    <div class="bg-gray-100 py-6 px-4 border-t">
      <div
        class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <!-- Logo & Legal Links -->
        <div>
          <img src="/src/assets/uppership.png" alt="uppership Group" class="h-6 mb-2" />
          <div class="flex flex-wrap gap-4 text-xs text-gray-600">
            <router-link to="/fraud-awareness" class="hover:underline">Fraud Awareness</router-link>
            <router-link to="/legal-notice" class="hover:underline">Legal Notice</router-link>
            <router-link to="/terms" class="hover:underline">Terms of Use</router-link>
            <router-link to="/privacy" class="hover:underline">Privacy Notice</router-link>
          </div>
        </div>

        <!-- Social Icons -->
        <!-- <div>
          <p class="font-semibold mb-2">Follow Us</p>
          <div class="flex space-x-4 text-gray-600 text-xl">
            <a href="#"><i class="fab fa-youtube"></i></a>
            <a href="#"><i class="fab fa-facebook-f"></i></a>
            <a href="#"><i class="fab fa-linkedin-in"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
          </div>
        </div> -->
      </div>
    </div>
  </footer>
</template>
