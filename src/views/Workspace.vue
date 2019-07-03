<template>
  <v-layout column>
    <v-card elevation="1" min-height="300px">
      <v-tabs class="no-grow" fixed-tabs>
        <v-tab
          v-for="tab in tabs"
          :to="{ name: tab.routeName }"
          :key="tab.id"
          >{{ tab.name }}</v-tab
        >
      </v-tabs>

      <transition-page>
        <router-view />
      </transition-page>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      tabs: [
        {
          id: 1,
          name: "Calendar",
          routeName: "workspace-calendar"
        },
        {
          id: 2,
          name: "Members",
          routeName: "workspace-members"
        },
        {
          id: 3,
          name: "Details",
          routeName: "workspace-details"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.v-tabs {
  margin-top: 16px;
}
</style>
