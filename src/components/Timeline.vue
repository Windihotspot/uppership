<template>
  <div class="max-w-xl mx-auto p-2 relative z-[50]">
    <!-- Shipment Info -->
    <div class="bg-white p-4 text-sm max-w-sm mx-auto rounded shadow">
      <div class="text-gray-700 font-medium mb-1">Your shipment</div>
      <div class="text-xs font-semibold mb-6">{{ trackingNumber }}</div>

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
      <p @click="downloadShipmentPDF" class="text-blue-600 text-sm font-medium mb-2 cursor-pointer hover:underline">
        View All Shipping Details
      </p>
      <div class="border-2 border-blue-300 rounded-md p-3">
        <h2 class="font-semibold text-gray-800 mb-1">Get Answers Fast</h2>
        <p class="text-sm text-gray-700">
          If you need help, use the
          <a href="https://works.do/GnurSRI" class="text-blue-600 hover:underline">Virtual Assistant</a>. Still stuck? Try
          our
          <a
            href="https://works.do/GnurSRI"
            target="_blank"
            rel="noopener noreferrer"
            class="text-blue-600 hover:underline"
            @click="console.log('clicked!')"
          >
            Tracking Support
          </a>

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
import logo from '@/assets/uppership.png'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
pdfMake.vfs = pdfFonts.vfs
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

// ✅ PDF generation
const downloadShipmentPDF = async () => {
  if (!props.events || props.events.length === 0) return

  // Use the first event as the base shipment info
  const shipment = props.events[0]

  // Convert logo to Base64 (for pdfmake)
  const logoBase64 = await getBase64(logo)

  // 🧠 Dynamically filter only non-empty fields
  const shipmentDetails = [
    ['Tracking Number', shipment.tracking_number],
    ['Current Status', reversedEvents.value[0]?.status],
    ['Current Location', reversedEvents.value[0]?.location],
    ['Sender Name', shipment.sender_name],
    ['Sender Address', shipment.sender_address],
    ['Sender Number', shipment.sender_number],
    ['Receiver Name', shipment.receiver_name],
    ['Receiver Address', shipment.receiver_address],
    ['Receiver Number', shipment.receiver_number],
    ['Created At', moment(shipment.created_at).format('MMM D, YYYY h:mm A')]
  ].filter(([_, value]) => value && value.trim && value.trim() !== '')

  // ✅ Build document definition
  const docDefinition = {
    content: [
      {
        columns: [
          { image: logoBase64, width: 80 },
          {
            text: 'Shipment Details',
            alignment: 'right',
            fontSize: 18,
            bold: true,
            margin: [0, 15, 0, 0]
          }
        ]
      },
      { text: ' ', margin: [0, 10] },

      // 📦 Shipment info table
      {
        table: {
          widths: ['35%', '65%'],
          body: shipmentDetails
        },
        layout: {
          fillColor: (rowIndex) => (rowIndex === 0 ? '#f9fafb' : null),
          paddingLeft: () => 8,
          paddingRight: () => 8,
          paddingTop: () => 6,
          paddingBottom: () => 6,
          hLineWidth: () => 0.5,
          vLineWidth: () => 0.5,
          hLineColor: () => '#e5e7eb',
          vLineColor: () => '#e5e7eb'
        }
      },

      // 📜 Section header
      {
        text: '\nShipment Status Timeline',
        style: 'sectionHeader'
      },

      // 🕓 Timeline table
      {
        table: {
          widths: ['30%', '30%', '40%'],
          body: [
            [
              { text: 'Date', bold: true, fillColor: '#f3f4f6', margin: [0, 5, 0, 5] },
              { text: 'Status', bold: true, fillColor: '#f3f4f6', margin: [0, 5, 0, 5] },
              { text: 'Location', bold: true, fillColor: '#f3f4f6', margin: [0, 5, 0, 5] }
            ],
            ...reversedEvents.value.map((e) => [
              { text: moment(e.created_at).format('MMM D, YYYY h:mm A'), margin: [0, 5, 0, 5] },
              { text: e.status, margin: [0, 5, 0, 5] },
              { text: e.location, margin: [0, 5, 0, 5] }
            ])
          ]
        },
        layout: {
          fillColor: (rowIndex) => (rowIndex % 2 === 0 ? null : '#fafafa'), // zebra striping
          paddingLeft: () => 8,
          paddingRight: () => 8,
          paddingTop: () => 6,
          paddingBottom: () => 6
        }
      }
    ],

    styles: {
      sectionHeader: {
        bold: true,
        fontSize: 14,
        margin: [0, 20, 0, 10],
        color: '#111827'
      }
    },

    defaultStyle: {
      fontSize: 10,
      color: '#374151'
    }
  }

  // 🧾 Download the generated PDF
  pdfMake.createPdf(docDefinition).download(`Shipment_${shipment.tracking_number || 'details'}.pdf`)
}


// ✅ Helper: convert logo file to Base64
const getBase64 = (url) =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onload = function () {
      const reader = new FileReader()
      reader.onloadend = function () {
        resolve(reader.result)
      }
      reader.readAsDataURL(xhr.response)
    }
    xhr.onerror = reject
    xhr.responseType = 'blob'
    xhr.open('GET', url)
    xhr.send()
  })

// ✅ Status icons

</script>

<style scoped>
.custom-btn {
  text-transform: none;
}
</style>
