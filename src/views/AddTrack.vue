<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/supabase'
const trackingNumber = ref('')
const events = ref([])
const newEvent = ref({
  status: '',
  location: ''
})

const addEvent = async () => {
  const { error } = await supabase.from('trackings').insert([
    {
      tracking_number: trackingNumber, // use current route tracking number
      status: newEvent.value.status,
      location: newEvent.value.location
    }
  ])

  if (error) {
    console.error('❌ Failed to add event:', error)
    return
  }

  // Clear form
  newEvent.value.status = ''
  newEvent.value.location = ''

  console.log('✅ Event added')

  // Optionally re-fetch or wait for real-time to kick in
  await fetchEvents()
}

// If you're not using real-time, add this function and call it manually
const fetchEvents = async () => {
  const { data, error } = await supabase
    .from('trackings')
    .select('*')
    .eq('tracking_number', trackingNumber)
    .order('created_at', { ascending: true })

  if (error) {
    console.error('❌ Supabase fetch failed:', error)
  } else {
    events.value = data
  }
}

onMounted(() => {
  fetchEvents()

  supabase
    .channel('trackings-inserts')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'trackings',
        filter: `tracking_number=eq.${trackingNumber}`
      },
      (payload) => {
        events.value.push(payload.new)
      }
    )
    .subscribe()
})

</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-semibold mb-4">Add Tracking</h1>

    <v-container class="d-flex justify-center" v-if="loading">
      <v-progress-circular indeterminate color="primary" />
    </v-container>

    <v-form v-else>
      <v-text-field
        v-model="trackingNumber"
        label="Tracking Number"
        outlined
        required
      ></v-text-field>
      <v-btn @click="addEvent" color="primary">Add Tracking</v-btn>
    </v-form>
  </div>
</template>
