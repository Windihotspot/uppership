<template>
   <v-btn class="text-sm px-4 py-2 flex items-center gap-2 custom-btn mt-4" variant="plain" color="blue">
  <i class="fas fa-arrow-left text-base mr-2"></i>
  Back
</v-btn>

  <v-form
    ref="shipmentForm"
    v-model="valid"
    class="p-6 space-y-6 max-w-4xl mx-auto bg-white rounded-xl shadow"
  >
    <!-- From Section -->
    <div>
      <h2 class="text-xl font-semibold mb-4">From</h2>

      <p class="text-sm text-gray-500 mt-1 mb-4">This is your billing country/region</p>
      <v-autocomplete
        v-model="fromCountry"
        :items="countryList"
        label="Country or Region"
        :rules="[(v) => !!v || 'Please select a country or region']"
        return-object
        item-title="name"
        item-value="code"
        density="compact"
        class="mb-4"
        variant="outlined"
        color="blue"
      />
      <v-text-field
        v-model="fromCity"
        :rules="[(v) => !!v || 'City is required']"
        label="City"
        required
        density="compact"
        class="mt-4"
        variant="outlined"
        color="blue"
      />
    </div>

    <!-- To Section -->
    <div>
      <h2 class="text-xl font-semibold mb-4">To</h2>
      <v-autocomplete
        v-model="toCountry"
        :items="countryList"
        label="Country or Region"
        :rules="[(v) => !!v || 'Please select a country or region']"
        return-object
        item-title="name"
        item-value="code"
        density="compact"
        class="mb-4"
        variant="outlined"
        color="blue"
      />
      <div class="grid grid-cols-2 gap-4">
        <v-text-field
          v-model="toCity"
          label="City"
          density="compact"
          variant="outlined"
          color="blue"
        />
        <v-text-field
          v-model="toPostalCode"
          label="Postal Code"
          density="compact"
          variant="outlined"
          color="blue"
        />
      </div>
    </div>

    <!-- Shipment Details -->
    <div>
      <h2 class="text-xl font-semibold mb-4">Shipment Details</h2>
      <v-text-field
        v-model="weight"
        label="Weight (kg)"
        type="number"
        :rules="[(v) => !!v || 'Weight is required']"
        required
        density="compact"
        class="mb-4"
        variant="outlined"
        color="blue"
      />
      <div class="grid grid-cols-3 gap-4">
        <v-text-field
          v-model="dimensions.length"
          label="Length (cm)"
          type="number"
          :rules="[(v) => !!v || 'Length is required']"
          required
          density="compact"
          variant="outlined"
          color="blue"
        />
        <v-text-field
          v-model="dimensions.width"
          label="Width (cm)"
          type="number"
          :rules="[(v) => !!v || 'Width is required']"
          required
          density="compact"
          variant="outlined"
          color="blue"
        />
        <v-text-field
          v-model="dimensions.height"
          label="Height (cm)"
          type="number"
          :rules="[(v) => !!v || 'Height is required']"
          required
          density="compact"
          variant="outlined"
          color="blue"
        />
      </div>
      <v-text-field
        v-model="quantity"
        label="Quantity"
        type="number"
        :rules="[(v) => !!v || 'Quantity is required']"
        required
        density="compact"
        class="mt-4"
        variant="outlined"
        color="blue"
      />
    </div>

    <!-- Submit -->
    <v-btn :disabled="!valid" size="large" color="red" class="mt-4 custom-btn mx-auto items-center flex justify-center" @click="submitForm">
      Get Quote
    </v-btn>
  </v-form>
 
</template>

<script setup>
import { ref } from 'vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

const valid = ref(false)
const fromCountry = ref('')
const fromCity = ref('')
const toCountry = ref(null)
const toCity = ref('')
const toPostalCode = ref('')
const importShipment = ref(false)
const weight = ref('')
const dimensions = ref({
  length: '',
  width: '',
  height: ''
})
const quantity = ref('')

const countryList = [
  { name: 'United States', code: 'US' },
  { name: 'United Kingdom', code: 'UK' },
  { name: 'Germany', code: 'DE' },
  { name: 'France', code: 'FR' },
  { name: 'Canada', code: 'CA' }
  // Extend as needed
]

function changeLocation() {}

function submitForm() {
  if (valid.value) {
    const payload = {
      fromCountry: fromCountry.value,
      fromCity: fromCity.value,
      toCountry: toCountry.value,
      toCity: toCity.value,
      toPostalCode: toPostalCode.value,
      importShipment: importShipment.value,
      weight: weight.value,
      dimensions: dimensions.value,
      quantity: quantity.value
    }
    console.log('Form submitted:', payload)
    // Integrate with API or logic as needed
  }
}
</script>

<style scoped>
.v-form {
  background-color: #fff;
}
.custom-btn {
  text-transform: none;
}
</style>
