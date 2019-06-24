<template>
  <v-app>
    <component :is="layout">
      <router-view></router-view>
    </component>
  </v-app>
</template>

<script>
import SimpleLayout from "./layouts/SimpleLayout";
import AppLayout from "./layouts/AppLayout";

const LAYOUTS = {
  simple: SimpleLayout
};

export default {
  name: "App",
  computed: {
    layout() {
      return LAYOUTS[this.$route.meta.layout] || AppLayout;
    }
  }
};
</script>
