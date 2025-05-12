<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '@/supabase'
import Timeline from '@/components/Timeline.vue'
import moment from 'moment'


const route = useRoute()
const trackingNumber = route.params.trackingNumber
const events = ref([])
const loading = ref(true)


onMounted(async () => {
  loading.value = true
  const { data, error } = await supabase
    .from('trackings')
    .select('*')
    .eq('tracking_number', trackingNumber)
    .order('created_at', { ascending: true })
     // Format the date using moment
     events.value = data.map(event => ({
      ...event,
      formatted_date: moment(event.created_at).format('MMMM Do YYYY, ')
    }))

    if (error) {
    console.error('❌ Supabase fetch failed:', error)
  } else {
    console.log('✅ Supabase fetch success:', data)
    events.value = data
  }
   
  loading.value = false
})
</script>

<template>
  <Header/>
  <div class="p-6">
    <h1 class="text-2xl font-semibold mb-4">Tracking Info for {{ trackingNumber }}</h1>

    <v-container class="d-flex justify-center" v-if="loading">
      <v-progress-circular indeterminate color="primary" />
    </v-container>

    <Timeline v-else :events="events" />
  </div>
  <Footer/>
</template>

