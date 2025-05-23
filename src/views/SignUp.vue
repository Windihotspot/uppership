<template>
  <Header />
  <div class="w-full space-y-8">
    <div class="text-center">
      <h2 class="mt-6 text-3xl font-bold tracking-tight text-gray-900">Create an account</h2>
      <p class="mt-2 text-sm text-gray-600">Provide your details to create an account</p>
    </div>

    <form class="mt-4 p-4 space-y-6">
      <div class="space-y-4">
        <div>
          <label for="first_name" class="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <div class="mt-1">
            <input
              v-model="registerForm.first_name"
              type="text"
              id="first_name"
              required
              class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              placeholder="John"
            />
          </div>
        </div>

        <div>
          <label for="last_name" class="block text-sm font-medium text-gray-700"> Last Name </label>
          <div class="mt-1">
            <input
              v-model="registerForm.last_name"
              type="text"
              id="last_name"
              required
              class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              placeholder="Doe"
            />
          </div>
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700"> Email Address </label>
          <div class="mt-1">
            <input
              v-model="registerForm.email"
              type="email"
              id="email"
              required
              class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              placeholder="johndoe@example.com"
            />
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700"> Password </label>
          <div class="relative mt-1">
            <input
              v-model="registerForm.password"
              :type="showPassword ? 'text' : 'password'"
              id="password"
              required
              class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              placeholder="Enter password"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              <i
                :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
                class="h-4 w-4 text-gray-800"
              ></i>
            </button>
          </div>

          <!-- Password strength indicators -->
          <div v-if="registerForm.password" class="mt-2 space-y-2">
            <div class="flex items-center gap-2">
              <div class="flex-shrink-0">
                <svg
                  v-if="hasUppercase"
                  class="w-4 h-4 text-green-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <path
                    d="M8 12L11 15L16 9"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <svg
                  v-else
                  class="w-4 h-4 text-red-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <path
                    d="M15 9L9 15M9 9L15 15"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </div>
              <span class="text-sm" :class="hasUppercase ? 'text-green-500' : 'text-red-500'">
                Uppercase letters
              </span>
            </div>
            <div class="flex items-center gap-2">
              <div class="flex-shrink-0">
                <svg
                  v-if="hasLowercase"
                  class="w-4 h-4 text-green-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <path
                    d="M8 12L11 15L16 9"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <svg
                  v-else
                  class="w-4 h-4 text-red-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <path
                    d="M15 9L9 15M9 9L15 15"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </div>
              <span class="text-sm" :class="hasLowercase ? 'text-green-500' : 'text-red-500'">
                Lowercase letters
              </span>
            </div>
            <div class="flex items-center gap-2">
              <div class="flex-shrink-0">
                <svg
                  v-if="hasNumber"
                  class="w-4 h-4 text-green-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <path
                    d="M8 12L11 15L16 9"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <svg
                  v-else
                  class="w-4 h-4 text-red-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <path
                    d="M15 9L9 15M9 9L15 15"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </div>
              <span class="text-sm" :class="hasNumber ? 'text-green-500' : 'text-red-500'">
                Numbers
              </span>
            </div>
            <div class="flex items-center gap-2">
              <div class="flex-shrink-0">
                <svg
                  v-if="hasSpecialChar"
                  class="w-4 h-4 text-green-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <path
                    d="M8 12L11 15L16 9"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <svg
                  v-else
                  class="w-4 h-4 text-red-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <path
                    d="M15 9L9 15M9 9L15 15"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </div>
              <span class="text-sm" :class="hasSpecialChar ? 'text-green-500' : 'text-red-500'">
                Special characters
              </span>
            </div>
          </div>
        </div>

        <div>
          <label for="password_confirmation" class="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <div class="mt-1">
            <input
              v-model="registerForm.password_confirmation"
              type="password"
              id="password_confirmation"
              required
              class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              placeholder="Enter password again"
            />
          </div>
        </div>

        <div class="flex gap-2">
          <input
            v-model="registerForm.terms"
            type="checkbox"
            id="terms"
            required
            class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label for="terms" class="ml-2 block text-sm text-gray-900">
            I agree to the Terms of Service and Privacy Policy
          </label>
        </div>
      </div>

      <div>
        <button
          type="submit"
          :disabled="registerForm.processing"
          class="flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          {{ registerForm.processing ? 'Creating account...' : 'Create account' }}
        </button>
      </div>
    </form>

    <p class="mt-6 text-center text-sm text-gray-500">
      Already have an account?
      <button type="button" class="font-semibold text-blue-600 hover:text-blue-500 ml-1">
        Sign in
      </button>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Header from '@/components/Header.vue'

const registerForm = ref({
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  errors: {
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  },
  processing: false
})
</script>

<style scoped>
.custom-btn {
  background-color: #0056d2;
}
</style>
