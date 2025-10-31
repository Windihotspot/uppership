<template>
  <v-container class="max-w-2xl mx-auto py-8">
    <v-card class="pa-6 rounded elevation-1">
      <v-card-title class="text-h6 font-semibold mb-4">Invoice Details</v-card-title>

      <v-form v-model="formValid" ref="formRef" class="space-y-4">
        <v-text-field
          v-model="invoice.number"
          label="Invoice Number"
          variant="outlined"
          color="primary"
          density="comfortable"
          hide-details
          required
        />
        <v-text-field
          v-model="invoice.date"
          label="Invoice Date"
          variant="outlined"
          color="primary"
          type="date"
          density="comfortable"
          hide-details
          required
        />
        <v-text-field
          v-model="invoice.client"
          label="Client Name"
          variant="outlined"
          color="primary"
          density="comfortable"
          hide-details
          required
        />
        <v-text-field
          v-model.number="invoice.amount"
          label="Amount"
          variant="outlined"
          color="primary"
          prefix="₦"
          density="comfortable"
          hide-details
          required
        />
        <v-textarea
          v-model="invoice.description"
          label="Description"
          variant="outlined"
          color="primary"
          rows="3"
          auto-grow
          hide-details
          required
        />
      </v-form>

      <div class="flex justify-end mt-6">
        <v-btn color="primary" @click="generateInvoice" size="large" variant="text">
          Generate Invoice
        </v-btn>
      </div>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
pdfMake.vfs = pdfFonts.vfs
import logo from '@/assets/uppership.png'
const formValid = ref(false)
const formRef = ref(null)

const invoice = ref({
  number: '',
  date: '',
  client: '',
  amount: '',
  description: ''
})

// Example stub for logo base64
const getBase64 = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onload = function () {
      const reader = new FileReader()
      reader.onloadend = function () {
        resolve(reader.result)
      }
      reader.readAsDataURL(xhr.response)
    }
    xhr.onerror = reject
    xhr.open('GET', url)
    xhr.responseType = 'blob'
    xhr.send()
  })
}

// Generate invoice PDF
const downloadInvoicePDF = async () => {
  let logoBase64 = null
  try {
    logoBase64 = await getBase64(logo)
  } catch (e) {
    // ignore if no logo
  }

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
            { text: 'Website: upperships.com', style: 'companyText' }
          ],
          [
            logoBase64 ? { image: logoBase64, width: 90, alignment: 'right' } : {},
            {
              table: {
                widths: ['*'],
                body: [
                  [
                    {
                      text: `Invoice #: ${invoice.value.number}\nDate: ${invoice.value.date}`,
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
      { text: `${invoice.value.client}`, margin: [0, 4, 0, 10] },

      {
        table: {
          widths: ['*', 'auto'],
          body: [
            [
              { text: 'Description', bold: true },
              { text: 'Amount', bold: true, alignment: 'right' }
            ],
            [
              { text: invoice.value.description, alignment: 'left' },
              { text: `₦${Number(invoice.value.amount).toLocaleString()}`, alignment: 'right' }
            ]
          ]
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
                  { text: 'Total Amount:', bold: true },
                  {
                    text: `₦${Number(invoice.value.amount).toLocaleString()}`,
                    bold: true,
                    alignment: 'right'
                  }
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
        text: 'All payments should be made only through official payment channels provided upon request and confirmation.',
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
    defaultStyle: { fontSize: 10, color: '#374151' },
    pageMargins: [40, 40, 40, 40]
  }

  pdfMake.createPdf(docDefinition).download(`Invoice_${invoice.value.number}.pdf`)
}

// Validate and generate
const generateInvoice = () => {
  const { number, date, client, amount, description } = invoice.value
  if (!number || !date || !client || !amount || !description) {
    ElMessage.warning('Please fill out all invoice fields before generating.')
    return
  }

  downloadInvoicePDF()
  ElMessage.success('Invoice generated successfully!')
}
</script>

<style scoped>
.v-btn {
  text-transform: none;
}
</style>
