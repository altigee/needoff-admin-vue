<template>
  <v-layout column>
    <v-tabs class="no-grow" fixed-tabs>
      <v-tab key="calendar">Calendar</v-tab>
      <v-tab>Info</v-tab>

      <v-tab-item key="calendar">
        <v-card flat>
          <workspace-calendar :data="calendar" :loading="loading" />
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <workspace-info :id="id" />
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-layout>
</template>

<script>
import WorkspaceInfo from "./WorkspaceInfo";
import WorkspaceCalendar from "./WorkspaceCalendar";
import { getWorkspaceCalendar } from "../services/workspace.service";
import { setDocPageTitle } from "../utils/browser.utils";

export default {
  components: {
    WorkspaceInfo,
    WorkspaceCalendar
  },
  props: ["id"],
  data() {
    return {
      loading: true,
      activeTab: "calendar",
      ws: {},
      calendar: []
    };
  },
  async mounted() {
    this.loading = true;

    try {
      const data = await getWorkspaceCalendar(this.id);

      this.ws = data.workspaceById;
      this.calendar = data.teamCalendar;

      setDocPageTitle(this.ws.name);
    } catch (error) {
      console.error(error);
    }

    this.loading = false;
  }
};
</script>
