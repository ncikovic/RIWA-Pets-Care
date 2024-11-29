<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<style>
  @import '../src/css/custom.css';
</style>

<script setup>
import { ref, provide, watch } from "vue";
import { useI18n } from "vue-i18n";

// Inicijalne postavke jezika i veličine teksta
const { locale } = useI18n({ useScope: "global" });
const textSize = ref("medium");

// Promjena veličine teksta na temelju postavke
const applyTextSize = (size) => {
  document.documentElement.style.setProperty(
    "--text-size",
    {
      small: "14px",
      medium: "16px",
      large: "18px",
    }[size]
  );
};
applyTextSize(textSize.value);

// Pratimo promjene veličine teksta
watch(textSize, (newSize) => {
  applyTextSize(newSize);
});

// Pratimo promjene jezika
watch(locale, (newLocale) => {
  locale.value = newLocale;
});

// Pružanje postavki cijeloj aplikaciji
provide("textSize", textSize);
provide("locale", locale);
</script>

<style>
/* Postavljanje prilagodljive veličine teksta za cijelu aplikaciju */
html {
  font-size: var(--text-size, 16px);
}
</style>
