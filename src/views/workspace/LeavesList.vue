<template>
  <v-card-text>
    <v-layout row wrap justify-end>
      <v-btn @click="onAddLeave" outlined color="primary">
        <v-icon>add</v-icon>Add leave
      </v-btn>
    </v-layout>

    <v-data-table
      :items="leaves"
      :headers="columns"
      sort-by="startDate"
      :sort-desc="true"
      :items-per-page="-1"
      hide-default-footer
      :loading="loading"
      class="member-leaves-table"
    >
      <template v-slot:items="props">
        <pass :item="props.item">
          <tr @click="props.expanded = !props.expanded" slot-scope="{ item }">
            <td>
              <v-layout row align-center>
                <v-flex class="no-grow mr-2">
                  <v-avatar size="24">
                    <img
                      :src="
                        `https://randomuser.me/api/portraits/men/${
                          item.user.userId
                        }.jpg`
                      "
                    />
                  </v-avatar>
                </v-flex>

                <v-flex>
                  <div>{{ userName(item.user) }}</div>
                  <div class="secondary--text text--lighten-2 caption">
                    {{ item.user.email }}
                  </div>
                </v-flex>
              </v-layout>
            </td>
            <td>{{ getLabel(item.leaveType) }}</td>
            <td>
              <template v-if="item.duration > 1"
                >{{ item.startDate | date("DD MMM") }} -</template
              >
              {{ item.endDate | date }}
              <div class="secondary--text text--lighten-2 caption">
                {{ item.duration }} {{ "day" | pluralize(item.duration) }}
              </div>
            </td>
            <td>
              <v-layout row wrap>
                <v-spacer></v-spacer>

                <template v-if="item.approvedBy">
                  {{ item.approvedBy.firstName }}
                  {{ item.approvedBy.lastName }}
                </template>

                <template v-else>
                  <v-btn
                    @click="onApproveClick($event, item.id)"
                    :loading="item.loading"
                    color="info"
                    small
                    outlined
                    class="pa-0 ma-0"
                    >Approve</v-btn
                  >
                </template>
              </v-layout>
            </td>
          </tr>
        </pass>
      </template>

      <template v-slot:expand="props">
        <v-card flat class="leave-details">
          <v-card-text>{{ props.item.comment }}</v-card-text>
        </v-card>
      </template>
    </v-data-table>
  </v-card-text>
</template>

<script>
import { differenceInCalendarDays } from "date-fns";
import { find, get } from "lodash";
import { userName } from "../../utils/user.utils";
import { getLabel } from "../../utils/balance.utils";
import { getLeaves, approveLeave } from "../../services/workspace.service";

export default {
  props: ["id"],
  data() {
    return {
      loading: true,
      leaves_data: [],
      columns: [
        { text: "User", value: "user" },
        { text: "Type", value: "leaveType" },
        { text: "Date", value: "startDate" },
        { text: "Approved by", value: "approvedBy", align: "right" }
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
      const leaves_data = await getLeaves(this.id);
      this.leaves_data = leaves_data.map(leave => ({
        ...leave,
        loading: false
      }));
    } catch (error) {
      console.log(error);
    }

    this.loading = false;
  },
  methods: {
    userName,
    getLabel,
    //
    async onApproveClick(e, leaveId) {
      e.stopPropagation();
      const leave = this.getLeave(leaveId);

      try {
        leave.loading = true;
        const res = await approveLeave(leaveId);
        leave.approvedBy = get(res, "dayOff.approvedBy");
      } catch (error) {
        console.error(error);
      }

      leave.loading = false;
    },

    onAddLeave() {
      this.$router.push({ name: "workspace-leave-add" });
    },

    getLeave(id) {
      return find(this.leaves_data, { id });
    }
  }
};
</script>

<style lang="stylus" scoped>
.leave-details {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.leave-date {
  font-size: 14px;
}

table.member-leaves-table {
  tbody td, thead th {
    padding: 0 8px;
  }
}
</style>
