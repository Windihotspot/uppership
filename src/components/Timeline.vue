<template>
  <v-container style="max-width: 600px">
    <!-- shipment title -->
    <div class="border-b">
      <p class="m-2">Your shipment <span class="font-semibold">ascf12344</span></p>
      <p class="font-bold m-2">Estimated delivery</p>
      <p class="font-bold text-blue-600 m-2">
        The delivery date would be provided as soon as possible
      </p>
    </div>

    <v-timeline density="compact" side="end" truncate-line>
      <v-timeline-item class="mb-12" dot-color="green" size="large" fill-dot>
        <template v-slot:icon>
          <span>
            <v-icon>mdi-check-circle</v-icon>
          </span>
        </template>
        <p class="font-bold">We have your parcel</p>
        <p>Texas, United States</p>
        <p>01/01/2025, 12:00pm</p>
      </v-timeline-item>

      <v-slide-x-transition group>
        <v-timeline-item
          v-for="event in timeline"
          :key="event.id"
          class="mb-4"
          dot-color="pink"
          size="small"
        >
          <div class="d-flex justify-space-between flex-grow-1">
            <div>{{ event.text }}</div>
            <div class="flex-shrink-0">{{ event.time }}</div>
          </div>
        </v-timeline-item>
      </v-slide-x-transition>

      <v-timeline-item class="mb-12" dot-color="green" size="large">
        <template v-slot:icon>
          <span>
            <v-icon>mdi-check-circle</v-icon>
          </span>
        </template>
        <p class="font-bold">On the way</p>
        <p>Florida, United States</p>
        <p>02/01/2025, 1:00pm</p>
      </v-timeline-item>

      <v-timeline-item class="mb-12" dot-color="green" size="large">
        <template v-slot:icon>
          <span>
            <v-icon>mdi-check-circle</v-icon>
          </span>
        </template>
        <p class="font-bold">Out for delivery</p>
        <p>California, United States</p>
        <p>03/01/2025, 4:00pm</p>
      </v-timeline-item>

      <v-timeline-item class="mb-12" dot-color="white" size="large">
        <template v-slot:icon>
          <span>
            <v-icon class="text-red-500">mdi-alert-circle</v-icon>
          </span>
        </template>
        <p class="font-bold">Parcel on hold</p>
        <p>California, United States</p>
        <p>03/01/2025, 8:00pm</p>
      </v-timeline-item>
    </v-timeline>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    events: [],
    input: null,
    nonce: 0
  }),

  computed: {
    timeline() {
      return this.events.slice().reverse()
    }
  },

  methods: {
    comment() {
      const time = new Date().toTimeString()
      this.events.push({
        id: this.nonce++,
        text: this.input,
        time: time.replace(/:\d{2}\sGMT-\d{4}\s\((.*)\)/, (match, contents, offset) => {
          return ` ${contents
            .split(' ')
            .map((v) => v.charAt(0))
            .join('')}`
        })
      })

      this.input = null
    }
  }
}
</script>

<style scoped>
.v-timeline-item:first-of-type::before,
.v-timeline-item:last-of-type::after {
  display: none;
}
</style>
