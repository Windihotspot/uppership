<template>
  <div class="max-w-xl mx-auto p-2">
    <!-- Shipment Info -->
    <div class="bg-white p-4 text-sm max-w-sm mx-auto rounded shadow">
      <div class="text-gray-700 font-medium mb-1">Your shipment</div>
      <div class="text-xs font-semibold mb-6">{{ trackingNumber }}</div>

      <!-- Delivered Info -->
      <!-- <div v-if="lastEvent" class="flex items-center font-semibold mb-1">
        <i class="fas fa-check-circle mr-1 text-green-600"></i>
        Delivered On
      </div>

      <div v-if="lastEvent" class="text-green-600 font-bold text-base mb-4">
        {{ formatDate(lastEvent.created_at) }}
      </div> -->

      <div v-if="lastEvent" class="border-t pt-3">
        <div class="text-xs text-gray-500">Current Location</div>
        <div class="text-sm font-semibold text-gray-800 mb-1">{{ lastEvent.location }}</div>
        <!-- <a href="" class="text-blue-600 mb-6">
          Proof of delivery
          <i class="fa-solid fa-arrow-right ml-2"></i>
        </a> -->
      </div>

      <!-- Element Plus Timeline -->
      <div class="mt-4">
        <el-timeline>
          <el-timeline-item
            v-for="event in reversedEvents"
            :key="event.id"
            :timestamp="event.formattedDate"
            type="success"
            :color="'#22c55e'"
            :icon="getStatusIconComponent(event.status)"
            size="large"
          >
            <div>
              <p class="font-semibold text-gray-800">{{ event.status }}</p>

              <p class="text-sm text-gray-600">{{ event.location }}</p>
            </div>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>

    <div class="bg-white p-6 mt-4 rounded shadow-lg h-[250px]">
      <p class="text-blue-600 text-sm font-medium mb-2 cursor-pointer hover:underline">
        View All Shipping Details
      </p>
      <div class="border-2 border-blue-300 rounded-md p-3">
        <h2 class="font-semibold text-gray-800 mb-1">Get Answers Fast</h2>
        <p class="text-sm text-gray-700">
          If you need help, use the
          <a href="#" class="text-blue-600 hover:underline">Virtual Assistant</a>. Still stuck? Try
          our
          <a href="#" class="text-blue-600 hover:underline">Tracking Support</a>
          for more specific guidance.
        </p>
      </div>
    </div>
  </div>
  
</template>

<script setup>
import { computed, h } from 'vue'
import { ElTimeline, ElTimelineItem } from 'element-plus'
import moment from 'moment'

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

// Reverse the timeline and format dates using moment
const reversedEvents = computed(() =>
  [...props.events].reverse().map((event) => ({
    ...event,
    formattedDate: moment(event.created_at).format('MMM D, YYYY [at] h:mm A')
  }))
)
// Get the last chronological event (first in reversed list)
const lastEvent = computed(() => reversedEvents.value[0] || null)

const formatDate = (date) => {
  return moment(date).format('dddd, MMMM D [at] HH:mm')
}

const trackingNumber = computed(() => {
  return props.events.length > 0 ? props.events[0].tracking_number : ''
})

// Optional: Use Element Plus types like 'success', 'danger', etc.
const getStatusType = (status) => {
  switch (status?.toLowerCase()) {
    case 'delivered':
      return 'success'
  }
}

// Optional: Override with custom colors
const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'delivered':
      return '#22c55e' // green
    case 'on the way':
    case 'out for delivery':
      return '#3b82f6' // blue
    case 'parcel on hold':
    case 'delayed':
      return '#ef4444' // red
    default:
      return '#9ca3af' // gray
  }
}

const getStatusIconComponent = (status) => {
  const iconClass = getStatusIconClass(status)
  return h('i', { class: iconClass + ' text-lg' }) // text-lg for sizing
}

const getStatusIconClass = (status) => {
  switch (status?.toLowerCase()) {
    case 'delivered':
    case 'shipped':
      return 'fas fa-check-circle'
    case 'out for delivery':
      return 'fas fa-check-circle'
    case 'In transit':
      return 'fas fa-check-circle'
    case 'parcel on hold':
    case 'delayed':
      return 'fas fa-check-circle'
    default:
      return 'fas fa-check-circle'
  }
}
</script>

<style scoped>
.custom-btn {
  text-transform: none;
}
</style>
