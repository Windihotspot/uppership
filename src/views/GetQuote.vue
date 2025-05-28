<template>
  <v-form ref="shipmentForm" v-model="valid" class="p-6 space-y-6 max-w-4xl mx-auto bg-white rounded-xl shadow">
    <!-- From Section -->
    <div>
      <h2 class="text-xl font-semibold mb-4">From</h2>
      <div class="flex items-center space-x-4">
        <img src="https://flagcdn.com/w320/ng.png" alt="Nigeria Flag" class="w-10 h-6 rounded" />
        <span class="text-lg font-medium">Nigeria</span>
        <v-btn variant="text" color="red" @click="changeLocation">Change location</v-btn>
      </div>
      <p class="text-sm text-gray-500 mt-1">This is your billing country/region</p>
      <v-text-field
        v-model="fromCity"
        :rules="[v => !!v || 'City is required']"
        label="City"
        required
        density="compact"
        class="mt-4"
      />
    </div>

    <!-- To Section -->
    <div>
      <h2 class="text-xl font-semibold mb-4">To</h2>
      <v-autocomplete
        v-model="toCountry"
        :items="countryList"
        label="Country or Region"
        :rules="[v => !!v || 'Please select a country or region']"
        return-object
        item-title="name"
        item-value="code"
        density="compact"
        class="mb-4"
      />
      <div class="grid grid-cols-2 gap-4">
        <v-text-field v-model="toCity" label="City" density="compact" />
        <v-text-field v-model="toPostalCode" label="Postal Code" density="compact" />
      </div>
    </div>

    <!-- Shipment Details -->
    <div>
      <h2 class="text-xl font-semibold mb-4">Shipment Details</h2>
      <v-text-field
        v-model="weight"
        label="Weight (kg)"
        type="number"
        :rules="[v => !!v || 'Weight is required']"
        required
        density="compact"
        class="mb-4"
      />
      <div class="grid grid-cols-3 gap-4">
        <v-text-field
          v-model="dimensions.length"
          label="Length (cm)"
          type="number"
          :rules="[v => !!v || 'Length is required']"
          required
          density="compact"
        />
        <v-text-field
          v-model="dimensions.width"
          label="Width (cm)"
          type="number"
          :rules="[v => !!v || 'Width is required']"
          required
          density="compact"
        />
        <v-text-field
          v-model="dimensions.height"
          label="Height (cm)"
          type="number"
          :rules="[v => !!v || 'Height is required']"
          required
          density="compact"
        />
      </div>
      <v-text-field
        v-model="quantity"
        label="Quantity"
        type="number"
        :rules="[v => !!v || 'Quantity is required']"
        required
        density="compact"
        class="mt-4"
      />
    </div>

    <!-- Import Shipment Option -->
    <div class="flex items-center space-x-3">
      <v-checkbox v-model="importShipment" hide-details />
      <span>Create an import shipment</span>
      <v-tooltip text="Check this if the shipment is being imported into the country.">
        <template #activator="{ on, attrs }">
          <v-icon v-bind="attrs" v-on="on" color="gray">mdi-information</v-icon>
        </template>
      </v-tooltip>
    </div>

    <!-- Submit -->
    <v-btn :disabled="!valid" color="red" class="mt-4" @click="submitForm">
      Get Quote
    </v-btn>
  </v-form>
</template>

<script setup>
import { ref } from 'vue';

const valid = ref(false);
const fromCity = ref('');
const toCountry = ref(null);
const toCity = ref('');
const toPostalCode = ref('');
const importShipment = ref(false);
const weight = ref('');
const dimensions = ref({
  length: '',
  width: '',
  height: ''
});
const quantity = ref('');

const countryList = [
  { name: 'United States', code: 'US' },
  { name: 'United Kingdom', code: 'UK' },
  { name: 'Germany', code: 'DE' },
  { name: 'France', code: 'FR' },
  { name: 'Canada', code: 'CA' },
  // Extend as needed
];

function changeLocation() {
  alert('Change location feature triggered');
}

function submitForm() {
  if (valid.value) {
    const payload = {
      fromCity: fromCity.value,
      toCountry: toCountry.value,
      toCity: toCity.value,
      toPostalCode: toPostalCode.value,
      importShipment: importShipment.value,
      weight: weight.value,
      dimensions: dimensions.value,
      quantity: quantity.value,
    };
    console.log('Form submitted:', payload);
    // Integrate with API or logic as needed
  }
}
</script>

<style scoped>
.v-form {
  background-color: #fff;
}
</style>
