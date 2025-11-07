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
    
      <p
        @click="downloadShipmentPDF"
        class="text-blue-600 text-sm font-medium mb-2 cursor-pointer hover:underline"
      >
        View All Shipping Details
      </p>
      <div class="border-2 border-blue-300 rounded-md p-3">
        <h2 class="font-semibold text-gray-800 mb-1">Get Answers Fast</h2>
        <p class="text-sm text-gray-700">
          If you need help, use the
          <a href="https://works.do/GnurSRI" class="text-blue-600 hover:underline"
            >Virtual Assistant</a
          >. Still stuck? Try our
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
import { computed, h, ref } from 'vue'
import { ElTimeline, ElTimelineItem } from 'element-plus'
import moment from 'moment'
import logo from '@/assets/uppership.png'
import canadaLogo from '@/assets/canada.png'
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

// Invoice reactive data (pre-filled; you can update programmatically)
const invoice = ref({
  invoiceNumber: 'INV-2025-33286',
  dateIssued: moment().format('MMMM D, YYYY'), // e.g., October 27, 2025
  dueDate: moment().add(2, 'days').format('MMMM D, YYYY'), // e.g., +7 days
  billedTo: {
    name: props.events[0]?.receiver_name || '[Customer/Recipient Name]',
    address: props.events[0]?.receiver_address || '[Customer Address]',
    city: props.events[0]?.receiver_city || 'Ontario, Canada',
    phone: props.events[0]?.receiver_number || '[Phone Number]'
  },
  items: [
    { description: 'Customs Processing Fee', quantity: 1, unitCost: 100.0 },
    { description: 'Handling and Delivery Fee', quantity: 1, unitCost: 45.0 },
    { description: 'Import Duty & Taxes', quantity: 1, unitCost: 5.0 }
  ],

  taxRate: 0.05,
  get subtotal() {
    return this.items.reduce((s, it) => s + it.quantity * it.unitCost, 0)
  },
  get tax() {
    return this.subtotal * this.taxRate
  },
  get total() {
    return this.subtotal + this.tax
  }
})

// PDF generation for invoice
const downloadInvoicePDF = async () => {
  // use existing logo helper; fallback to null if unavailable
  let logoBase64 = null
  try {
    logoBase64 = await getBase64(logo)
  } catch (e) {
    // ignore; logo optional
  }

  const rows = [
    [
      { text: 'Description', bold: true },
      { text: 'Quantity', bold: true, alignment: 'center' },
      { text: 'Unit Cost', bold: true, alignment: 'right' },
      { text: 'Total', bold: true, alignment: 'right' }
    ],
    ...invoice.value.items.map((it) => [
      { text: it.description, alignment: 'left' },
      { text: String(it.quantity), alignment: 'center' },
      { text: `$${it.unitCost.toFixed(2)}`, alignment: 'right' },
      { text: `$${(it.quantity * it.unitCost).toFixed(2)}`, alignment: 'right' }
    ])
  ]

  const docDefinition = {
    background: (currentPage, pageSize) => {
      if (!logoBase64) return null
      return {
        image: logoBase64,
        width: pageSize.width * 0.6,
        opacity: 0.06,
        alignment: 'center',
        margin: [0, pageSize.height * 0.3, 0, 0]
      }
    },
    content: [
      {
        columns: [
          [
            { text: 'Upperships', style: 'companyName' },
            { text: 'Email: upperships@gmail.com', style: 'companyText' },
            { text: 'Website: upperships@gmail.com', style: 'companyText' }
          ],
          [
            logoBase64 ? { image: logoBase64, width: 90, alignment: 'right' } : {},
            {
              text: '',
              margin: [0, 0, 0, 0]
            },
            {
              table: {
                widths: ['*'],
                body: [
                  [
                    {
                      text: `Invoice Number: ${invoice.value.invoiceNumber}\nDate Issued: ${invoice.value.dateIssued}\nDue Date: ${invoice.value.dueDate}`,
                      alignment: 'right'
                    }
                  ]
                ]
              },
              layout: 'noBorders'
            }
          ]
        ]
      },

      { text: '\n' },

      { text: 'Billed To:', bold: true },
      {
        text: `${invoice.value.billedTo.name}\n${invoice.value.billedTo.address}\n${invoice.value.billedTo.city}\nPhone: ${invoice.value.billedTo.phone}`,
        margin: [0, 4, 0, 10]
      },

      { text: 'Shipment Details', style: 'sectionHeader', margin: [0, 6, 0, 6] },

      {
        table: {
          widths: ['*', 'auto', 'auto', 'auto'],
          body: rows
        },
        layout: {
          fillColor: (rowIndex) => (rowIndex === 0 ? '#f3f4f6' : null),
          hLineWidth: () => 0.5,
          vLineWidth: () => 0.5,
          hLineColor: () => '#e5e7eb',
          vLineColor: () => '#e5e7eb',
          paddingLeft: () => 6,
          paddingRight: () => 6,
          paddingTop: () => 4,
          paddingBottom: () => 4
        }
      },

      { text: '\n' },

      {
        columns: [
          { width: '*', text: '' },
          {
            width: 'auto',
            table: {
              body: [
                [
                  'Subtotal:',
                  { text: `$${invoice.value.subtotal.toFixed(2)}`, alignment: 'right' }
                ],
                [
                  `VAT (${(invoice.value.taxRate * 100).toFixed(0)}%):`,
                  { text: `$${invoice.value.tax.toFixed(2)}`, alignment: 'right' }
                ],
                [
                  { text: 'Total Amount Due:', bold: true },
                  { text: `$${invoice.value.total.toFixed(2)}`, bold: true, alignment: 'right' }
                ]
              ]
            },
            layout: 'noBorders'
          }
        ]
      },

      { text: '\n' },

      { text: 'Payment Information:', bold: true },
      {
        text: 'All payments should be made only through official payment channels provided upon request and confirmation',
        margin: [0, 4, 0, 0]
      },

      {
        text: '\n\nThank you for your business!',
        italics: true,
        alignment: 'center',
        color: 'green'
      }
    ],

    styles: {
      companyName: { fontSize: 14, bold: true, color: '#111827' },
      companyText: { fontSize: 10, color: '#374151' },
      sectionHeader: { fontSize: 12, bold: true, color: '#111827' }
    },

    defaultStyle: {
      fontSize: 10,
      color: '#374151'
    },

    pageMargins: [40, 40, 40, 40]
  }

  pdfMake.createPdf(docDefinition).download(`Invoice_${invoice.value.invoiceNumber}.pdf`)
}

const downloadCBSAReceiptPDF = async () => {
  if (!props.events || props.events.length === 0) return

  const shipment = props.events[0]
  const logoBase64 = await getBase64(canadaLogo)

  // Randomized but realistic CBSA receipt values
  const randomReceiptNumber = 'B3-' + Math.floor(100000 + Math.random() * 900000)
  const referenceNumber = 'REF-' + Math.floor(10000 + Math.random() * 90000)
  const portCode = 'TOR'
  const importerCode = 'IM' + Math.floor(1000 + Math.random() * 9000)
  // Generate random proportions that will always sum to 100
  const dutyRatio = Math.random() * 0.5 + 0.3 // 30%–80% of total
  const freightRatio = Math.random() * (1 - dutyRatio - 0.05) + 0.05 // 5%–remaining
  const gstRatio = 1 - (dutyRatio + freightRatio) // whatever remains

  // Now calculate each amount based on total = 100
  const totalAmount = 100.0
  const dutyAmount = (totalAmount * dutyRatio).toFixed(2)
  const freightAmount = (totalAmount * freightRatio).toFixed(2)
  const gstAmount = (totalAmount * gstRatio).toFixed(2)

  const officerNames = ['Damien Smith', 'Karoline Johnson', 'Leonard Patel', 'Miles Brown']
  const officerName = officerNames[Math.floor(Math.random() * officerNames.length)]

  const docDefinition = {
    pageMargins: [35, 35, 35, 45],
    defaultStyle: {
      fontSize: 12,
      color: '#111827'
    },
    content: [
      // 🇨🇦 Header
      {
        columns: [
          { image: logoBase64, width: 70 },
          {
            stack: [
              {
                text: 'CANADA BORDER SERVICES AGENCY / AGENCE DES SERVICES FRONTALIERS DU CANADA',
                alignment: 'center',
                bold: true,
                fontSize: 9
              },
              {
                text: 'B3 - CUSTOMS CODING FORM / FORMULE DE CODAGE DES DOUANES',
                alignment: 'center',
                fontSize: 9,
                margin: [0, 2, 0, 0]
              }
            ],
            width: '*'
          },
          {
            stack: [
              { text: `No. ${randomReceiptNumber}`, bold: true, alignment: 'right', fontSize: 9 },
              {
                text: `Date: ${moment('2025-10-22').format('MMM D, YYYY')}`,
                alignment: 'right',
                fontSize: 9
              }
            ],
            width: 'auto'
          }
        ]
      },

      { text: ' ', margin: [0, 5] },

      // Top Reference Fields
      {
        table: {
          widths: ['33%', '33%', '34%'],
          body: [
            [
              {
                text: `Reference No. / Référence:\n${referenceNumber}`,
                border: [true, true, true, true],
                margin: [4, 4, 0, 4]
              },
              {
                text: `Port Code / Code du Port:\n${portCode}`,
                border: [true, true, true, true],
                margin: [4, 4, 0, 4]
              },
              {
                text: `Importer Code / Code Importateur:\n${importerCode}`,
                border: [true, true, true, true],
                margin: [4, 4, 0, 4]
              }
            ]
          ]
        },
        layout: 'noBorders'
      },

      { text: ' ', margin: [0, 6] },

      // Importer / Shipment Info Section
      {
        table: {
          widths: ['30%', '70%'],
          body: [
            [{ text: 'Importer / Importateur', bold: true }, shipment.receiver_name || '-'],
            [{ text: 'Address / Adresse', bold: true }, shipment.receiver_address || '-'],
            [{ text: 'Phone / Téléphone', bold: true }, shipment.receiver_number || '-'],
            [{ text: 'Shipper / Expéditeur', bold: true }, shipment.sender_name || '-'],
            [
              { text: 'Origin Country / Pays d’Origine', bold: true },
              shipment.sender_address || '—'
            ],
            [
              { text: 'Tracking Number / Numéro de Suivi', bold: true },
              shipment.tracking_number || '-'
            ]
          ]
        },
        layout: {
          hLineWidth: () => 0.5,
          vLineWidth: () => 0.5,
          hLineColor: () => '#d1d5db',
          vLineColor: () => '#d1d5db',
          paddingLeft: () => 6,
          paddingRight: () => 6,
          paddingTop: () => 8, // ⬆️ increase for more height
          paddingBottom: () => 8 // ⬇️ increase for more height
        }
      },

      { text: '\n', margin: [0, 6] },

      // Customs Charges
      {
        table: {
          widths: ['40%', '30%', '30%'],
          body: [
            [
              { text: 'Description / Description', bold: true },
              { text: 'Rate / Taux', bold: true },
              { text: 'Amount (CAD) / Montant', bold: true }
            ],
            ['Customs Duty / Droits de Douane', '—', `$${dutyAmount}`],
            ['GST / TPS (5%)', '5%', `$${gstAmount}`],
            ['Freight / Fret', '—', `$${freightAmount}`],
            [{ text: 'TOTAL / TOTAL', bold: true }, '', { text: `$${totalAmount}`, bold: true }]
          ]
        },
        layout: {
          hLineWidth: () => 0.5,
          vLineWidth: () => 0.5,
          hLineColor: () => '#d1d5db',
          vLineColor: () => '#d1d5db',
          paddingLeft: () => 6,
          paddingRight: () => 6,
          paddingTop: () => 8, // ⬆️ increase for more height
          paddingBottom: () => 8 // ⬇️ increase for more height
        }
      },

      { text: '\n' },

      // Declaration Box
      {
        table: {
          widths: ['*'],
          body: [
            [
              {
                text:
                  'DECLARATION / DÉCLARATION\nI hereby declare that the particulars on this form are true and correct, ' +
                  'and that all applicable duties and taxes are payable under the Customs Act and Regulations.\n' +
                  'Je déclare par la présente que les renseignements fournis sont exacts et conformes aux règlements en vigueur.',
                margin: [5, 6, 5, 6]
              }
            ]
          ]
        },
        layout: {
          hLineWidth: () => 0.5,
          vLineWidth: () => 0.5,
          hLineColor: () => '#9ca3af',
          vLineColor: () => '#9ca3af'
        }
      },

      { text: ' ', margin: [0, 6] },

      // Officer Signature
      {
        columns: [
          { text: `CBSA Officer / Agent ASFC: ${officerName}`, width: '50%' },
          { text: 'Signature: ______________________', alignment: 'right', width: '50%' }
        ]
      },

      { text: '\n\n', margin: [0, 10] },

      // ✅ Thank you note
      {
        text: 'www.csba.gc.ga',
        alignment: 'center',
        bold: true,
        fontSize: 18
      }
    ]
  }

  pdfMake
    .createPdf(docDefinition)
    .download(`CBSA_Receipt_${shipment.tracking_number || 'details'}.pdf`)
}
</script>

<style scoped>
.custom-btn {
  text-transform: none;
}
</style>
