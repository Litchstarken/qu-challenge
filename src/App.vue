<template>
  <div id="app">
    <v-app>
      <v-main>
        <v-container>
          <PlanetList /> 
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PlanetList from './components/PlanetsList.vue'; 

export default defineComponent({
  components: {
    PlanetList, 
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
