<!-- eslint-disable vue/no-deprecated-filter -->
<template>
  <q-page padding>
    <div>
      <!-- Header -->
      <h1 class="text-h3">Događaji za kućne ljubimce</h1>

      <!-- Kalendar -->
      <FullCalendar
        :events="events"
        :plugins="calendarPlugins"
        :initialView="'dayGridMonth'"
        :dateClick="handleDateClick"
        :eventClick="handleEventClick"
      />

      <!-- Detalji odabranog događaja -->
      <q-expansion-item
        v-if="selectedEvent"
        label="Detalji događaja"
        icon="event"
      >
        <div class="q-mt-md">
          <p><strong>Naslov:</strong> {{ selectedEvent.title }}</p>
          <p>
            <strong>Vrijeme:</strong> {{ selectedEvent.start | formatDate }}
          </p>
          <p><strong>Lokacija:</strong> {{ selectedEvent.location }}</p>
          <p><strong>Opis:</strong> {{ selectedEvent.description }}</p>
        </div>
      </q-expansion-item>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import FullCalendar from "@fullcalendar/vue"; // FullCalendar komponenta
import dayGridPlugin from "@fullcalendar/daygrid"; // Kalendar sa mjesečnim pregledom
import interactionPlugin from "@fullcalendar/interaction"; // Za interakciju sa kalendarom
import { date } from "quasar";
import eventData from "~assets/events.json"; // Import podataka iz events.json

// Podaci događaja preuzeti iz JSON-a
const events = ref(eventData); // Podaci su sada dostupni u `events`
const selectedEvent = ref(null);

// Pluginovi za kalendar
const calendarPlugins = [dayGridPlugin, interactionPlugin];

// Formatiranje datuma za Vue
const formatDate = (date) => {
  return date ? date.toLocaleString() : "";
};

// Funkcija koja se poziva prilikom klika na datum
const handleDateClick = (info) => {
  console.log("Clicked on: " + info.dateStr);
  // Možete otvoriti formu za dodavanje novog događaja ili prikazivanje svih događaja za taj datum
};

// Funkcija koja se poziva prilikom klika na događaj
const handleEventClick = (info) => {
  console.log("Event clicked:", info.event);
  // Prikazivanje detalja za odabrani događaj
  selectedEvent.value = {
    title: info.event.title,
    start: new Date(info.event.start),
    location: info.event.extendedProps.location,
    description: info.event.extendedProps.description,
  };
};
</script>

<style scoped>
/* Stiliziraj kalendar i detalje događaja */
q-page {
  max-width: 1200px;
  margin: auto;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

q-expansion-item {
  margin-top: 20px;
}
</style>
