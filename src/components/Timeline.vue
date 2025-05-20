<template>
  <div class="max-w-xl mx-auto p-2">
    <!-- Shipment Info -->
    <div class="bg-white p-4 text-sm max-w-sm mx-auto rounded shadow">
      <div class="text-gray-700 font-medium mb-1">Your shipment</div>
      <div class="text-xs font-semibold mb-6">{{ trackingNumber }}</div>

      <!-- Delivered Info -->
      <div v-if="lastEvent" class="flex items-center font-semibold mb-1">
        <i class="fas fa-check-circle mr-1 text-green-600"></i>
        Delivered On
      </div>

      <div v-if="lastEvent" class="text-green-600 font-bold text-base mb-4">
        {{ formatDate(lastEvent.created_at) }}
      </div>

      <div v-if="lastEvent" class="border-t pt-3">
        <div class="text-xs text-gray-500">Delivered To</div>
        <div class="text-sm font-semibold text-gray-800 mb-1">{{ lastEvent.location }}</div>
        <v-btn variant="plain" class="text-blue-600 text-sm font-medium hover:underline px-0 custom-btn">
          Proof of Delivery
          <i class="fas fa-arrow-right ml-1 text-xs"></i>
        </v-btn>
      </div>

      <!-- Element Plus Timeline -->
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

     <div class="bg-white p-6 mt-4 rounded shadow-lg h-[250px]">
      <p class="mb-6 text-lg font-semibold">Track Your Parcel</p>
      <v-text-field
        label="Tracking Number"
        variant="outlined"
        dense
        required
        color="blue"
        class="w-full"
        
      ></v-text-field>
      <div class="mt-4">
        <v-btn variant="outlined" rounded="pill" color="primary">Track</v-btn>
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
  .custom-btn{
    text-transform: none;
  }
</style>