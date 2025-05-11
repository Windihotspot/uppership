<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '@/supabase'
import Timeline from '@/components/Timeline.vue'

const route = useRoute()
const trackingNumber = route.params.trackingNumber
const events = ref([])

onMounted(async () => {
  const { data, error } = await supabase
    .from('trackings')
    .select('*')
    .eq('tracking_number', trackingNumber)
    .order('timestamp', { ascending: true })

  if (!error) {
    events.value = data
  } else {
    console.error('Tracking fetch failed:', error)
  }
})
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-semibold mb-4">Tracking Info for {{ trackingNumber }}</h1>
    <Timeline :events="events" />
  </div>
</template>
