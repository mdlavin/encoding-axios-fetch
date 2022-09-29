<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
    </q-drawer>

    <q-page-container>
      <RouterView v-slot="{ Component }">
        <template v-if="Component">
          <Transition mode="out-in">
              <Suspense>
                <!-- main content -->
                <component :is="Component"></component>

                <!-- loading state -->
                <template #fallback>
                  Loading...
                </template>
              </Suspense>
          </Transition>
        </template>
      </RouterView>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';


const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
