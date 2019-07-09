<template>
  <v-card-text>
    <page-spinner v-if="loading" />

    <v-data-table
      :items="leaves"
      :headers="columns"
      :pagination.sync="pagination"
      hide-actions
      expand
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
                        `https://randomuser.me/api/portraits/men/${item.user.userId}.jpg`
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
                    outline
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
import { request } from "../../services/gql";
import { userName } from "../../utils/user.utils";
import { getLabel } from "../../utils/balance.utils";

async function getLeaves(wsId) {
  const res = await request(/* GraphQL */ `
    {
      dayOffs(workspaceId: ${wsId}) {
        id
        leaveType
        user {
          userId
          firstName
          lastName
          email
        }
        comment
        startDate
        endDate
        approvedBy {
          userId
          firstName
          lastName
          email
        }
      }
    }
  `);

  return res.dayOffs;
}

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
      ],
      pagination: {
        sortBy: "startDate",
        descending: true
      }
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

        const res = await request(/* GraphQL */ `mutation {
          approveDayOff(dayOffId:${leaveId}){
            ok
            dayOff {
              id
              approvedBy {
                userId
                firstName
                lastName
                email
              }
            }
          }
        }`);

        leave.approvedBy = get(res, "approveDayOff.dayOff.approvedBy");
      } catch (error) {
        console.error(error);
      }

      leave.loading = false;
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
  tbody td,
  thead th {
    padding: 0 8px;
  }
}
</style>
