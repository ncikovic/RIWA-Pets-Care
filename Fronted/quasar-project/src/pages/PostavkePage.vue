<template>
  <q-page class="q-pa-md">
    <h1>Postavke</h1>
    <q-card-section class="q-pt-none">
      <!-- Dark Mode Postavka -->
      <q-toggle
        v-model="darkMode"
        :label="$t('darkMode')"
        @update:model-value="changeDarkMode"
      />

      <!-- Opcije jezika -->
      <q-select
        v-model="currentLang"
        :options="languages"
        dense
        emit-value
        map-options
        options-dense
        @update:model-value="changeLanguage"
        :label="$t('language')"
      />

      <!-- Postavka za zvuk obavijesti -->
      <q-toggle
        v-model="notifications"
        :label="$t('notifications')"
        @update:model-value="changeNotifications"
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
      />
    </q-card-section>
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

// Opcije jezika
const currentLang = ref("hr");
const languages = [
  { value: "en", label: "English" },
  { value: "hr", label: "Hrvatski" },
  { value: "de", label: "Deutsch" },
  { value: "fr", label: "Français" },
  { value: "es", label: "Español" },
];
const changeLanguage = (value) => {
  locale.value = value;
  currentLang.value = value;
};

// Zvuk obavijesti postavka
const notifications = ref(false);
const changeNotifications = () => {
  notifications.value = !notifications.value;
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
h1 {
  color: #6619d2;
}
</style>
