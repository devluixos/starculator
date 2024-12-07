<template>
  <div class="navbar">
    <Menubar :model="items">
      <template #start>
        <img src="../assets/favicon.png" alt="Logo" class="logo" />
      </template>
      <template #end>
        <InputText placeholder="Search" type="text" class="search-input" />
        <Avatar
          image="../assets/favicon.png"
          shape="circle"
        />
      </template>
    </Menubar>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Menubar from 'primevue/menubar'
import InputText from 'primevue/inputtext'
import Avatar from 'primevue/avatar'

const items = ref([
  { label: 'Home', icon: 'pi pi-home' },
  { label: 'Cargo Calculator', icon: 'pi pi-box' },
  { label: 'Mining Loadout', icon: 'pi pi-chart-line' },
  { label: 'tbd', icon: 'pi pi-envelope' },
])
</script>

<style scoped>
.navbar {
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: var(--color-background);
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo {
  height: 40px;
  margin-right: 1rem;
}

.search-input {
  margin-right: 1rem;
}

.card {
  width: 100%; /* Ensure the Menubar fills the navbar */
}
</style>
