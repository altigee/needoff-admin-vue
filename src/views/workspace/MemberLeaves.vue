<template>
  <div>
    <page-spinner v-if="loading" />

    <v-data-table
      :items="leaves"
      :headers="columns"
      class="member-leaves-table elevation-1"
      hide-default-footer
    >
      <template v-slot:items="props">
        <td>{{ props.item.leaveType }}</td>
        <td>{{ props.item.duration }}</td>
        <td>{{ props.item.startDate }}</td>
        <td>{{ props.item.endDate }}</td>
        <!-- <td>{{ props.item.comment }}</td> -->
        <td>
          {{ props.item.approvedBy.firstName }}
          {{ props.item.approvedBy.lastName }}
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { getUserLeaves } from "../../services/workspace.service";
import { differenceInCalendarDays } from "date-fns";

export default {
  props: ["wsId", "userId"],
  data() {
    return {
      loading: true,
      leaves_data: [],
      columns: [
        { text: "Type", value: "leaveType" },
        { text: "Duration", value: "duration", width: "60px" },
        { text: "Start date", value: "startDate" },
        { text: "End date", value: "endDate" },
        // { text: "Comment", value: "comment", sortable: false },
        { text: "Approved by", value: "approvedBy" }
      ]
    };
  },
  computed: {
    leaves() {
      return this.leaves_data.map(leave => {
        return {
          ...leave,
          duration: differenceInCalendarDays(leave.endDate, leave.startDate) + 1
        };
      });
    }
  },
  async mounted() {
    this.loading = true;

    try {
      this.leaves_data = await getUserLeaves(this.wsId, this.userId);
    } catch (error) {
      console.error(error);
    }

    this.loading = false;
  }
};
</script>

<style lang="scss" scoped>
.member-leaves-table {
  margin: 16px;
}
</style>
