<template>
  <q-page class="q-pa-md">
    <q-card>
      <q-card-section class="q-pt-none">
        <h1 class="text-center custom-title bijela">{{ $t('Postavke') }}</h1>

        <q-separator />

        <!-- Dark Mode Postavka -->
        <q-toggle
          v-model="darkMode"
          :label="$t('darkMode')"
          @update:model-value="changeDarkMode"
          color="primary"
          class="q-mb-md"
        />

        <!-- Postavka za veličinu teksta -->
        <q-select
          v-model="textSize"
          :options="textSizeOptions"
          dense
          emit-value
          map-options
          options-dense
          @update:model-value="changeTextSize"
          :label="$t('textSize')"
          color="primary"
          class="q-mb-md"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useI18n } from "vue-i18n";

const $q = useQuasar();
const { locale } = useI18n({ useScope: "global" });

// Dark Mode postavka
const darkMode = ref($q.dark.isActive);
const changeDarkMode = () => {
  $q.dark.toggle();
};

// Veličina teksta postavka
const textSize = ref("medium");
const textSizeOptions = [
  { value: "small", label: "Mala" },
  { value: "medium", label: "Srednja" },
  { value: "large", label: "Velika" },
];
const changeTextSize = (value) => {
  textSize.value = value;
};
</script>

<style scoped>
/* Stilizacija naslova za lijep izgled */
.custom-title {
  color: #422c50; /* Purple boja */
  font-weight: bold;
  font-family: 'Times New Roman', Times, serif;
  font-size: 2rem; /* Veličina fonta */
  text-align: center; /* Centriranje naslova */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1); /* Efekt sjenčanja */
  margin-bottom: 20px; /* Razmak ispod naslova */
}

.q-card {
  max-width: 400px;
  margin: 0 auto;
}

.q-toggle, .q-select {
  width: 100%;
}

.q-separator {
  margin: 20px 0;
}
</style>
