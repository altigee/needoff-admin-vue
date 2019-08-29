<template>
  <v-card-text v-if="items.length">
    <v-alert :value="true" color="error" icon="warning" outlined>
      <ul>
        <li v-for="err in items" v-bind:key="err.message">{{ err.message }}</li>
      </ul>
    </v-alert>
  </v-card-text>
</template>

<script>
export default {
  props: ["items"]
};
</script>
