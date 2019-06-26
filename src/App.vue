<template>
  <component :is="layout">
    <router-view></router-view>
  </component>
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

<style lang="scss">
.no-grow {
  flex-grow: 0;
}
</style>
