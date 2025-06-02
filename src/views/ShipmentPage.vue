<template>
<Header/>
 <v-container>
    <v-stepper v-model="step">
      <!-- Stepper Header -->
      <v-stepper-header>
        <v-stepper-item :value="1" title="Ship From" />
        <v-stepper-item :value="2" title="Ship To" />
        <v-stepper-item :value="3" title="Packaging" />
        <v-stepper-item :value="4" title="Payment" />
        <v-stepper-item :value="5" title="Summary" />
      </v-stepper-header>

      <!-- Stepper Content Window -->
      <v-stepper-window>
        <!-- Step 1 -->
        <v-stepper-window-item :value="1">
          <v-form class="grid grid-cols-2 gap-4 ">
            <v-select class="mt-4" label="Country or Territory" variant="outlined" color="blue" :items="countries" v-model="shipFrom.country" />
            <div></div>

            <v-text-field variant="outlined" color="blue" label="Full Name or Company Name*" v-model="shipFrom.name" />
            <v-text-field variant="outlined" color="blue" label="Contact Name" v-model="shipFrom.contactName" />
            <v-text-field variant="outlined" color="blue"  label="Email*" v-model="shipFrom.email" />
            <v-text-field variant="outlined" color="blue" label="Phone" v-model="shipFrom.phone" />
            <v-text-field variant="outlined" color="blue" label="Street Address*" v-model="shipFrom.address" class="col-span-2" />

           
          </v-form>
        </v-stepper-window-item>

        <!-- Step 2 -->
        <v-stepper-window-item :value="2">
          <v-form class="grid grid-cols-2 gap-4">
            <v-select variant="outlined" color="blue" label="Country or Territory" :items="countries" v-model="shipTo.country" />
            <div></div>

            <v-text-field variant="outlined" color="blue" label="Full Name or Company Name*" v-model="shipTo.name" />
            <v-text-field variant="outlined" color="blue" label="Contact Name" v-model="shipTo.contactName" />
            <v-text-field variant="outlined" color="blue" label="Email" v-model="shipTo.email" />
            <v-text-field variant="outlined" color="blue" label="Phone" v-model="shipTo.phone" />
            <v-text-field variant="outlined" color="blue" label="Street Address*" v-model="shipTo.address" class="col-span-2" />

          </v-form>
        </v-stepper-window-item>

        <!-- Step 3 -->
        <v-stepper-window-item :value="3">
          <div class="p-4">
            <p class="text-lg">Packaging options go here.</p>
            <!-- Placeholder -->
          </div>
        </v-stepper-window-item>

        <!-- Step 4 -->
        <v-stepper-window-item :value="4">
          <v-form class="grid grid-cols-2 gap-4">
            <v-btn-toggle v-model="paymentMethod" mandatory class="col-span-2">
              <v-btn value="card">Payment Card</v-btn>
              <v-btn value="other">Other Methods</v-btn>
            </v-btn-toggle>

            <v-select label="Card Type*" :items="cardTypes" v-model="card.cardType" class="col-span-2" />

            <v-text-field variant="outlined" color="blue" label="Card Number*" v-model="card.number" />
            <v-text-field variant="outlined" color="blue" label="Expiration Date*" v-model="card.expiry" placeholder="MM/YY" />
            <v-text-field variant="outlined" color="blue" label="CVV*" v-model="card.cvv" />
            <div></div>
            <v-text-field variant="outlined" color="blue" label="Cardholder Name*" v-model="card.name" class="col-span-2" />

           
          </v-form>
        </v-stepper-window-item>

        <!-- Step 5 -->
        <v-stepper-window-item :value="5">
          <div class="p-4">
            <p class="text-lg font-semibold mb-2">Shipment Summary</p>
            <!-- Placeholder: add summary preview here -->
          </div>
        </v-stepper-window-item>
      </v-stepper-window>

      <!-- Stepper Actions -->
      <v-stepper-actions>
        <div class="flex justify-between w-full mt-4">
          <v-btn :disabled="step === 1" @click="step--">Back</v-btn>
          <v-btn
            v-if="step < 5"
            color="primary"
            @click="step++"
          >Next</v-btn>
          <v-btn
            v-else
            color="success"
            @click="submitForm"
          >Submit</v-btn>
        </div>
      </v-stepper-actions>
    </v-stepper>
  </v-container>
  <Footer/>
</template>

<script setup>
import { ref } from 'vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

const step = ref(1);
const countries = ['United States', 'Canada', 'Mexico'];

const shipFrom = ref({
  country: 'United States',
  name: '',
  contactName: '',
  email: '',
  phone: '',
  address: '',
  notify: false
});

const shipTo = ref({
  country: 'United States',
  name: '',
  contactName: '',
  email: '',
  phone: '',
  address: '',
  notify: false,
  isResidential: false
});

const paymentMethod = ref('card');
const cardTypes = ['Visa', 'MasterCard', 'American Express', 'Discover', 'Diners Club'];
const card = ref({
  cardType: '',
  number: '',
  expiry: '',
  cvv: '',
  name: '',
  sameBilling: true
});

const submitForm = () => {
  console.log("Form submitted with data:", {
    shipFrom: shipFrom.value,
    shipTo: shipTo.value,
    payment: card.value
  });
};
</script>

<style scoped>
/* Optional additional styling */
</style>
