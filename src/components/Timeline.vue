<template>
  <v-container style="max-width: 600px">
    <!-- Shipment Info -->
    <div class="border-b mb-6">
      <p class="m-2">Your shipment <span class="font-semibold">{{ trackingNumber }}</span></p>
      <p class="font-bold m-2">Estimated delivery</p>
      <p class="font-bold text-blue-600 m-2">
        The delivery date will be provided as soon as possible
      </p>
    </div>

    <!-- Timeline Events -->
    <v-timeline density="compact" side="end">
      <v-slide-x-transition group>
        <v-timeline-item
          v-for="event in reversedEvents"
          :key="event.id"
          :dot-color="getDotColor(event.status)"
          size="small"
        >
          <div class="d-flex justify-space-between flex-grow-1">
            <div>
              <p class="font-bold">{{ event.status }}</p>
              <p>{{ event.location }}</p>
              <p>{{ (event.created_at) }}</p>
            </div>
          </div>
        </v-timeline-item>
      </v-slide-x-transition>
    </v-timeline>
  </v-container>
</template>

<script setup>
import { computed } from 'vue'


const props = defineProps({
  events: {
    type: Array,
    default: () => []
  },
  trackingNumber: {
    type: String,
    default: ''
  }
})

const reversedEvents = computed(() => [...props.events].reverse())



const getDotColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'on the way':
    case 'out for delivery':
    case 'delivered':
      return 'green'
    case 'parcel on hold':
    case 'delayed':
      return 'red'
    default:
      return 'blue-grey'
  }
}
</script>

<style scoped>
.v-timeline-item:first-of-type::before,
.v-timeline-item:last-of-type::after {
  display: none;
}
</style>
