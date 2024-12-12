<template>
  <div :data-theme="$q.dark.isActive ? 'dark' : 'light'">
    <router-view />
  </div>
</template>
<style>
  @import '../src/css/custom.css';
</style>

<script setup>
import { watch } from "vue";
import { useQuasar } from "quasar";

const $q = useQuasar();

watch(
  () => $q.dark.isActive,
  () => {
    document.documentElement.setAttribute(
      "data-theme",
      $q.dark.isActive ? "dark" : "light"
    );
  }
);
</script>

<style>
:root {
  --page-background-color-light: #ffffff;
  --card-background-color-light: #f9f9f9;
  --button-background-color-light: #42ffbd;
  --button-text-color-light: #ffffff;
  --link-color-light: #42ffbd;

  --page-background-color-dark: #121212;
  --card-background-color-dark: #1e1e1e;
  --button-background-color-dark: #42ffbd;
  --button-text-color-dark: #ffffff;
  --link-color-dark: #42ffbd;
}

[data-theme="light"] {
  --page-background-color: var(--page-background-color-light);
  --card-background-color: var(--card-background-color-light);
  --button-background-color: var(--button-background-color-light);
  --button-text-color: var(--button-text-color-light);
  --link-color: var(--link-color-light);
}

[data-theme="dark"] {
  --page-background-color: var(--page-background-color-dark);
  --card-background-color: var(--card-background-color-dark);
  --button-background-color: var(--button-background-color-dark);
  --button-text-color: var(--button-text-color-dark);
  --link-color: var(--link-color-dark);
  --crna-color: #000000;
  --ljubicasta:#6d16c4;
  --siva:#a8a8a8;
  --bijela:#ffffff;
  --filter:invert(100%) sepia(15%) saturate(652%) hue-rotate(181deg)
  brightness(115%) contrast(100%);
}

body {
  background-color: var(--page-background-color);
}
</style>
