<template>
  <div class="max-w-4xl mx-auto p-6">
    <div class="max-w-xl mx-auto p-4">
      <v-text-field
        variant="outlined"
        color="primary"
        v-model="searchTracking"
        label="Enter Tracking Number"
        placeholder="e.g. UPS123456789"
        clearable
      ></v-text-field>

      <v-btn color="blue" class="text-white mb-4" @click="fetchShipment"> Search Shipment </v-btn>
    </div>

    <!-- Page header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-semibold text-gray-800">Edit Invoice</h1>

      <v-btn color="blue" @click="generatePDF" class="text-white"> Download Invoice </v-btn>
    </div>

    <v-text-field
      v-model="invoice.currency"
      label="Currency Symbol"
      placeholder="$"
      variant="outlined"
      class="mb-4"
    />

    <!-- Invoice Card -->
    <div class="bg-white rounded-xl shadow p-6">
      <!-- Invoice Meta -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <v-text-field
          v-model="invoice.invoiceNumber"
          label="Invoice Number"
          variant="outlined"
        ></v-text-field>

        <v-text-field
          v-model="invoice.dateIssued"
          label="Date Issued"
          type="date"
          variant="outlined"
        ></v-text-field>

        <v-text-field
          v-model="invoice.dueDate"
          label="Due Date"
          type="date"
          variant="outlined"
        ></v-text-field>
      </div>

      <!-- Billed To Section -->
      <h2 class="font-semibold text-gray-800 text-lg mb-2">Billed To</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <v-text-field
          v-model="invoice.billedTo.name"
          label="Name"
          variant="outlined"
        ></v-text-field>

        <v-text-field
          v-model="invoice.billedTo.phone"
          label="Phone"
          variant="outlined"
        ></v-text-field>

        <v-textarea
          v-model="invoice.billedTo.address"
          label="Address"
          variant="outlined"
          rows="2"
        ></v-textarea>

        <v-text-field
          v-model="invoice.billedTo.city"
          label="City"
          variant="outlined"
        ></v-text-field>
      </div>

      <!-- Items Section -->
      <h2 class="font-semibold text-gray-800 text-lg mb-2">Invoice Items</h2>

      <div class="space-y-4 mb-6">
        <div
          v-for="(item, index) in invoice.items"
          :key="index"
          class="border p-4 rounded-lg bg-gray-50"
        >
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <v-text-field
              v-model="item.description"
              label="Description"
              variant="outlined"
            ></v-text-field>

            <v-text-field
              v-model.number="item.quantity"
              label="Qty"
              type="number"
              variant="outlined"
            ></v-text-field>

            <v-text-field
              v-model.number="item.unitCost"
              label="Unit Cost"
              type="number"
              variant="outlined"
            ></v-text-field>

            <div class="flex items-center justify-between">
              <p class="text-gray-800 font-semibold">
                {{ invoice.currency }}{{ (item.quantity * item.unitCost).toFixed(2) }}
              </p>

              <i
                class="fa fa-trash text-red-500 cursor-pointer"
                @click="removeItem(index)"
                title="Remove item"
              ></i>
            </div>
          </div>
        </div>
      </div>

      <v-btn color="green" variant="tonal" @click="addItem" class="mb-8 text-white">
        + Add Item
      </v-btn>

      <!-- Totals Section -->
      <div class="bg-gray-100 p-4 rounded-lg">
        <div class="flex justify-between text-sm mb-2">
          <span>Subtotal:</span>
          <span class="font-semibold">{{ invoice.currency }}{{ subtotal.toFixed(2) }}</span>
        </div>

        <div class="flex justify-between text-sm mb-2">
          <span>Tax ({{ (taxRate * 100).toFixed(0) }}%):</span>
          <span class="font-semibold">{{ invoice.currency }}{{ tax.toFixed(2) }}</span>
        </div>

        <div class="flex justify-between text-lg border-t pt-3">
          <span class="font-semibold">Total:</span>
          <span class="font-bold text-gray-900">{{ invoice.currency }}{{ total.toFixed(2) }}</span>
        </div>
      </div>

      <!-- Save Button -->
      <div class="flex justify-end mt-6">
        <v-btn color="blue" class="text-white px-6" @click="saveInvoice"> Save Changes </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, ref } from 'vue'
import moment from 'moment'
import { supabase } from '@/supabase' // your supabase client
import { ElLoading, ElMessage } from 'element-plus'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
pdfMake.vfs = pdfFonts.vfs
import logo from '@/assets/uppership.png'

// Optional logo helper
const getBase64 = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

const searchTracking = ref('')
const loading = ref(false)

// These replace props when searching manually
const shipmentEvents = ref([])

const fetchShipment = async () => {
  if (!searchTracking.value) return

  loading.value = true

  // Show Element Plus loading
  const loadingInstance = ElLoading.service({
    lock: true,
    text: 'Searching shipment...',
    background: 'rgba(0, 0, 0, 0.3)'
  })

  try {
    const { data, error } = await supabase
      .from('trackings')
      .select('*')
      .eq('tracking_number', searchTracking.value)
      .order('created_at', { ascending: true })

    if (error) throw error

    if (!data || data.length === 0) {
      alert('No shipment found for that tracking number.')
      return
    }

    console.log('Shipment data:', data)

    // Take the first (oldest) event for invoice info
    const shipment = data[0]

    // -----------------------
    // Autofill invoice fields
    // -----------------------
    invoice.invoiceNumber = shipment.tracking_number
      ? `INV-${shipment.tracking_number}`
      : 'INV-UNKNOWN'

    invoice.dateIssued = shipment.created_at
      ? moment(shipment.created_at).format('YYYY-MM-DD')
      : moment().format('YYYY-MM-DD')

    invoice.dueDate = shipment.created_at
      ? moment(shipment.created_at).add(2, 'days').format('YYYY-MM-DD')
      : moment().add(2, 'days').format('YYYY-MM-DD')

    invoice.billedTo.name = shipment.receiver_name || 'Unknown Receiver'
    invoice.billedTo.address = shipment.receiver_address || 'Address Not Provided'
    invoice.billedTo.city = '' // Optional
    invoice.billedTo.phone = shipment.receiver_number || ''

    // -----------------------
    // Default invoice items (can later pull from shipment if linked)
    // -----------------------
    invoice.items = [
      { description: 'Handling and Delivery Fee', quantity: 1, unitCost: 0 },
      { description: 'Import Duty & Taxes', quantity: 1, unitCost: 0 }
    ]

    console.log('Invoice autofilled from shipment:', invoice)
  } catch (err) {
    console.error('Error fetching shipment:', err)
    alert('Failed to fetch shipment. Check console for details.')
  } finally {
    loadingInstance.close() // close loading
  }
}

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD', // optional: could dynamically use invoice.currency
    minimumFractionDigits: 2
  }).format(amount)
}

const downloadInvoicePDF = async () => {
  // Convert logo to Base64 from URL
  let logoBase64 = null
  try {
    const res = await fetch(logo)
    const blob = await res.blob()
    logoBase64 = await new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(blob)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (err) => reject(err)
    })
  } catch (e) {
    console.warn('Logo conversion failed, skipping logo.')
  }

  const itemRows = invoice.items.map((it) => [
    { text: it.description, alignment: 'left' },
    { text: String(it.quantity), alignment: 'center' },
    { text: formatCurrency(it.unitCost), alignment: 'right' },
    { text: formatCurrency(it.quantity * it.unitCost), alignment: 'right' }
  ])

  const rows = [
    [
      { text: 'Description', bold: true },
      { text: 'Quantity', bold: true, alignment: 'center' },
      { text: 'Unit Cost', bold: true, alignment: 'right' },
      { text: 'Total', bold: true, alignment: 'right' }
    ],
    ...itemRows
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
              table: {
                widths: ['*'],
                body: [
                  [
                    {
                      text: `Invoice Number: ${invoice.invoiceNumber}\nDate Issued: ${invoice.dateIssued}\nDue Date: ${invoice.dueDate}`,
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
        text: `${invoice.billedTo.name}\n${invoice.billedTo.address}\n${invoice.billedTo.city}\nPhone: ${invoice.billedTo.phone}`,
        margin: [0, 4, 0, 10]
      },

      { text: 'Invoice Items', style: 'sectionHeader', margin: [0, 6, 0, 6] },

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

      // Totals section
      {
        columns: [
          { width: '*', text: '' },
          {
            width: 'auto',
            table: {
              body: [
                ['Subtotal:', { text: formatCurrency(subtotal.value), alignment: 'right' }],
                [
                  `VAT (${(invoice.taxRate * 100).toFixed(0)}%):`,
                  { text: formatCurrency(tax.value), alignment: 'right' }
                ],
                [
                  { text: 'Total Amount Due:', bold: true },
                  { text: formatCurrency(total.value), bold: true, alignment: 'right' }
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

  pdfMake.createPdf(docDefinition).download(`Invoice_${invoice.invoiceNumber}.pdf`)
}

const generatePDF = async () => {
  await downloadInvoicePDF()
}

// -------------------------------
//  INVOICE DATA (editable)
// -------------------------------
const invoice = reactive({
  invoiceNumber: 'INV-2025-',
  dateIssued: moment().format('YYYY-MM-DD'),
  dueDate: moment().add(2, 'days').format('YYYY-MM-DD'),
  currency: '$',
  billedTo: {
    name: '',
    address: '',
    city: '',
    phone: ''
  },

  items: [
    { description: 'Handling and Delivery Fee', quantity: 0, unitCost: 0 },
    { description: 'Import Duty & Taxes', quantity: 0, unitCost: 0 }
  ],

  taxRate: 0.05
})

// Computed totals
const subtotal = computed(() => invoice.items.reduce((s, it) => s + it.quantity * it.unitCost, 0))

const taxRate = computed(() => invoice.taxRate)
const tax = computed(() => subtotal.value * taxRate.value)
const total = computed(() => subtotal.value + tax.value)

// Add item
const addItem = () => {
  invoice.items.push({
    description: '',
    quantity: 1,
    unitCost: 0
  })
}

// Remove item
const removeItem = (index) => {
  invoice.items.splice(index, 1)
}

// Save action (send to backend)
const saveInvoice = () => {
  console.log('Saving invoice...', JSON.parse(JSON.stringify(invoice)))
  // axios.post('/api/update-invoice', invoice)
}
</script>

<style scoped></style>
