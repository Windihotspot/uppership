<template>
  <Header />
  <v-btn
    to="/"
    class="text-sm px-4 py-2 flex items-center gap-2 custom-btn m-4"
    variant="plain"
    color="blue"
  >
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
      <v-select
        v-model="fromCountry"
        :items="countryList"
        label="Country or Region"
        :rules="[(v) => !!v || 'Please select a country or region']"
        item-title="name"
        item-value="code"
        variant="outlined"
        density="compact"
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
      <v-select
        v-model="toCountry"
        :items="countryList"
        label="Country or Region"
        :rules="[(v) => !!v || 'Please select a country or region']"
        item-title="name"
        item-value="code"
        variant="outlined"
        density="compact"
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
    <v-btn
      :disabled="!valid"
      size="large"
      color="red"
      class="mt-4 custom-btn mx-auto items-center flex justify-center"
      @click="submitForm"
    >
      Get Quote
    </v-btn>
  </v-form>
  <Footer />
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
  { name: 'Afghanistan', code: 'AF' },
  { name: 'Albania', code: 'AL' },
  { name: 'Algeria', code: 'DZ' },
  { name: 'Andorra', code: 'AD' },
  { name: 'Angola', code: 'AO' },
  { name: 'Argentina', code: 'AR' },
  { name: 'Armenia', code: 'AM' },
  { name: 'Australia', code: 'AU' },
  { name: 'Austria', code: 'AT' },
  { name: 'Azerbaijan', code: 'AZ' },
  { name: 'Bahamas', code: 'BS' },
  { name: 'Bahrain', code: 'BH' },
  { name: 'Bangladesh', code: 'BD' },
  { name: 'Barbados', code: 'BB' },
  { name: 'Belarus', code: 'BY' },
  { name: 'Belgium', code: 'BE' },
  { name: 'Belize', code: 'BZ' },
  { name: 'Benin', code: 'BJ' },
  { name: 'Bhutan', code: 'BT' },
  { name: 'Bolivia', code: 'BO' },
  { name: 'Bosnia and Herzegovina', code: 'BA' },
  { name: 'Botswana', code: 'BW' },
  { name: 'Brazil', code: 'BR' },
  { name: 'Brunei', code: 'BN' },
  { name: 'Bulgaria', code: 'BG' },
  { name: 'Burkina Faso', code: 'BF' },
  { name: 'Burundi', code: 'BI' },
  { name: 'Cambodia', code: 'KH' },
  { name: 'Cameroon', code: 'CM' },
  { name: 'Canada', code: 'CA' },
  { name: 'Cape Verde', code: 'CV' },
  { name: 'Central African Republic', code: 'CF' },
  { name: 'Chad', code: 'TD' },
  { name: 'Chile', code: 'CL' },
  { name: 'China', code: 'CN' },
  { name: 'Colombia', code: 'CO' },
  { name: 'Comoros', code: 'KM' },
  { name: 'Costa Rica', code: 'CR' },
  { name: 'Croatia', code: 'HR' },
  { name: 'Cuba', code: 'CU' },
  { name: 'Cyprus', code: 'CY' },
  { name: 'Czech Republic', code: 'CZ' },
  { name: 'Denmark', code: 'DK' },
  { name: 'Djibouti', code: 'DJ' },
  { name: 'Dominica', code: 'DM' },
  { name: 'Dominican Republic', code: 'DO' },
  { name: 'Ecuador', code: 'EC' },
  { name: 'Egypt', code: 'EG' },
  { name: 'El Salvador', code: 'SV' },
  { name: 'Equatorial Guinea', code: 'GQ' },
  { name: 'Eritrea', code: 'ER' },
  { name: 'Estonia', code: 'EE' },
  { name: 'Eswatini', code: 'SZ' },
  { name: 'Ethiopia', code: 'ET' },
  { name: 'Fiji', code: 'FJ' },
  { name: 'Finland', code: 'FI' },
  { name: 'France', code: 'FR' },
  { name: 'Gabon', code: 'GA' },
  { name: 'Gambia', code: 'GM' },
  { name: 'Georgia', code: 'GE' },
  { name: 'Germany', code: 'DE' },
  { name: 'Ghana', code: 'GH' },
  { name: 'Greece', code: 'GR' },
  { name: 'Grenada', code: 'GD' },
  { name: 'Guatemala', code: 'GT' },
  { name: 'Guinea', code: 'GN' },
  { name: 'Guyana', code: 'GY' },
  { name: 'Haiti', code: 'HT' },
  { name: 'Honduras', code: 'HN' },
  { name: 'Hungary', code: 'HU' },
  { name: 'Iceland', code: 'IS' },
  { name: 'India', code: 'IN' },
  { name: 'Indonesia', code: 'ID' },
  { name: 'Iran', code: 'IR' },
  { name: 'Iraq', code: 'IQ' },
  { name: 'Ireland', code: 'IE' },
  { name: 'Israel', code: 'IL' },
  { name: 'Italy', code: 'IT' },
  { name: 'Jamaica', code: 'JM' },
  { name: 'Japan', code: 'JP' },
  { name: 'Jordan', code: 'JO' },
  { name: 'Kazakhstan', code: 'KZ' },
  { name: 'Kenya', code: 'KE' },
  { name: 'Kuwait', code: 'KW' },
  { name: 'Kyrgyzstan', code: 'KG' },
  { name: 'Laos', code: 'LA' },
  { name: 'Latvia', code: 'LV' },
  { name: 'Lebanon', code: 'LB' },
  { name: 'Lesotho', code: 'LS' },
  { name: 'Liberia', code: 'LR' },
  { name: 'Libya', code: 'LY' },
  { name: 'Liechtenstein', code: 'LI' },
  { name: 'Lithuania', code: 'LT' },
  { name: 'Luxembourg', code: 'LU' },
  { name: 'Madagascar', code: 'MG' },
  { name: 'Malawi', code: 'MW' },
  { name: 'Malaysia', code: 'MY' },
  { name: 'Maldives', code: 'MV' },
  { name: 'Mali', code: 'ML' },
  { name: 'Malta', code: 'MT' },
  { name: 'Mauritania', code: 'MR' },
  { name: 'Mauritius', code: 'MU' },
  { name: 'Mexico', code: 'MX' },
  { name: 'Moldova', code: 'MD' },
  { name: 'Monaco', code: 'MC' },
  { name: 'Mongolia', code: 'MN' },
  { name: 'Montenegro', code: 'ME' },
  { name: 'Morocco', code: 'MA' },
  { name: 'Mozambique', code: 'MZ' },
  { name: 'Myanmar', code: 'MM' },
  { name: 'Namibia', code: 'NA' },
  { name: 'Nepal', code: 'NP' },
  { name: 'Netherlands', code: 'NL' },
  { name: 'New Zealand', code: 'NZ' },
  { name: 'Nicaragua', code: 'NI' },
  { name: 'Niger', code: 'NE' },
  { name: 'Nigeria', code: 'NG' },
  { name: 'North Korea', code: 'KP' },
  { name: 'North Macedonia', code: 'MK' },
  { name: 'Norway', code: 'NO' },
  { name: 'Oman', code: 'OM' },
  { name: 'Pakistan', code: 'PK' },
  { name: 'Panama', code: 'PA' },
  { name: 'Papua New Guinea', code: 'PG' },
  { name: 'Paraguay', code: 'PY' },
  { name: 'Peru', code: 'PE' },
  { name: 'Philippines', code: 'PH' },
  { name: 'Poland', code: 'PL' },
  { name: 'Portugal', code: 'PT' },
  { name: 'Qatar', code: 'QA' },
  { name: 'Romania', code: 'RO' },
  { name: 'Russia', code: 'RU' },
  { name: 'Rwanda', code: 'RW' },
  { name: 'Saudi Arabia', code: 'SA' },
  { name: 'Senegal', code: 'SN' },
  { name: 'Serbia', code: 'RS' },
  { name: 'Singapore', code: 'SG' },
  { name: 'Slovakia', code: 'SK' },
  { name: 'Slovenia', code: 'SI' },
  { name: 'Somalia', code: 'SO' },
  { name: 'South Africa', code: 'ZA' },
  { name: 'South Korea', code: 'KR' },
  { name: 'Spain', code: 'ES' },
  { name: 'Sri Lanka', code: 'LK' },
  { name: 'Sudan', code: 'SD' },
  { name: 'Sweden', code: 'SE' },
  { name: 'Switzerland', code: 'CH' },
  { name: 'Syria', code: 'SY' },
  { name: 'Taiwan', code: 'TW' },
  { name: 'Tajikistan', code: 'TJ' },
  { name: 'Tanzania', code: 'TZ' },
  { name: 'Thailand', code: 'TH' },
  { name: 'Togo', code: 'TG' },
  { name: 'Trinidad and Tobago', code: 'TT' },
  { name: 'Tunisia', code: 'TN' },
  { name: 'Turkey', code: 'TR' },
  { name: 'Turkmenistan', code: 'TM' },
  { name: 'Uganda', code: 'UG' },
  { name: 'Ukraine', code: 'UA' },
  { name: 'United Arab Emirates', code: 'AE' },
  { name: 'United Kingdom', code: 'GB' },
  { name: 'United States', code: 'US' },
  { name: 'Uruguay', code: 'UY' },
  { name: 'Uzbekistan', code: 'UZ' },
  { name: 'Vanuatu', code: 'VU' },
  { name: 'Venezuela', code: 'VE' },
  { name: 'Vietnam', code: 'VN' },
  { name: 'Yemen', code: 'YE' },
  { name: 'Zambia', code: 'ZM' },
  { name: 'Zimbabwe', code: 'ZW' }
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
