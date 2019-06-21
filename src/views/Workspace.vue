<template>
  <div>
    <h3>Workspace ID: {{ id }}</h3>
    <hr />

    <h4>Team calendar</h4>

    <ul>
      <li v-for="vac in vacations" v-bind:key="vac.id">
        {{ vac.leaveType }}
        ({{ vac.startDate | date }} - {{ vac.endDate | date }}) -
        {{ vac.user.firstName }} {{ vac.user.lastName }}
      </li>
    </ul>
  </div>
</template>

<script>
import { getTeamCalendar } from "../services/workspace.service";

export default {
  props: ["id"],
  data() {
    return {
      loading: false,
      vacations: []
    };
  },
  async mounted() {
    this.loading = true;

    try {
      this.vacations = await getTeamCalendar(this.id);
    } catch (error) {
      console.error(error);
    }

    this.loading = false;
  }
};
</script>
