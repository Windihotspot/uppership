<template>
  <div class="max-w-xl mx-auto p-4">
    <!-- Shipment Info -->
    <div class="border-b mb-6 pb-4">
      <p class="mb-1">Your shipment <span class="font-semibold">{{ trackingNumber }}</span></p>
      <p class="font-bold mb-1">Estimated delivery</p>
      <p class="font-bold text-blue-600">The delivery date will be provided as soon as possible</p>
    </div>

    <!-- Timeline Events -->
    <div class="relative border-l-2 border-gray-200 space-y-8">
      <div
        v-for="event in reversedEvents"
        :key="event.id"
        class="relative pl-6"
      >
        <!-- Dot -->
        <span
          class="absolute left-[-0.45rem] top-1 w-3 h-3 rounded-full"
          :class="getDotColorClass(event.status)"
        ></span>

        <!-- Content -->
        <div>
          <p class="font-semibold text-gray-800">{{ event.status }}</p>
          <p class="text-sm text-gray-600">{{ event.location }}</p>
          <p class="text-xs text-gray-400">{{ event.created_at }}</p>
        </div>
      </div>
    </div>
  </div>
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

const getDotColorClass = (status) => {
  switch (status?.toLowerCase()) {
    case 'on the way':
    case 'out for delivery':
    case 'delivered':
      return 'bg-green-500'
    case 'parcel on hold':
    case 'delayed':
      return 'bg-red-500'
    default:
      return 'bg-gray-400'
  }
}
</script>
