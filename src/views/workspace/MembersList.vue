<template>
  <v-card-text>
    <page-spinner v-if="loading" />

    <div v-if="!loading">
      <v-layout row wrap justify-end>
        <v-btn @click="onAddMember" outline color="primary">
          <v-icon>add</v-icon>Add member
        </v-btn>
      </v-layout>

      <v-list two-line>
        <v-list-group lazy v-for="member in members" v-bind:key="member.userId">
          <template v-slot:activator>
            <v-list-tile v-bind:key="member.userId">
              <v-list-tile-avatar>
                <img
                  :src="
                    `https://randomuser.me/api/portraits/men/${member.userId}.jpg`
                  "
                />
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>
                  {{ userName(member.profile) }}
                  <v-btn
                    @click="onEditMember($event, member.userId)"
                    color="primary"
                    flat
                    icon
                    class="member-edit-btn"
                  >
                    <v-icon size="16">edit</v-icon>
                  </v-btn>
                </v-list-tile-title>
                <v-list-tile-sub-title>{{
                  member.profile.email
                }}</v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-layout row wrap justify-space-between>
                  <v-list-tile-action-text>
                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <span
                          v-on="on"
                          :class="`${leaveColor(BALANCE_TYPES.VACATION_PAID)}`"
                        >
                          {{ member.balance.leftPaidLeaves }} /
                          {{ member.balance.totalPaidLeaves }}
                          <v-icon size="16">work_off</v-icon>
                        </span>
                      </template>
                      <span>Paid leaves</span>
                    </v-tooltip>
                  </v-list-tile-action-text>

                  <v-list-tile-action-text>
                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <span
                          v-on="on"
                          :class="
                            `${leaveColor(BALANCE_TYPES.VACATION_UNPAID)}`
                          "
                        >
                          {{ member.balance.leftUnpaidLeaves }} /
                          {{ member.balance.totalUnpaidLeaves }}
                          <v-icon size="16">home</v-icon>
                        </span>
                      </template>
                      <span>Unpaid leaves</span>
                    </v-tooltip>
                  </v-list-tile-action-text>

                  <v-list-tile-action-text>
                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <span
                          v-on="on"
                          :class="`${leaveColor(BALANCE_TYPES.SICK_LEAVE)}`"
                        >
                          {{ member.balance.leftSickLeaves }} /
                          {{ member.balance.totalSickLeaves }}
                          <v-icon size="16">local_hospital</v-icon>
                        </span>
                      </template>
                      <span>Sick leaves</span>
                    </v-tooltip>
                  </v-list-tile-action-text>
                </v-layout>
              </v-list-tile-action>
            </v-list-tile>
          </template>

          <v-list-tile-content>
            <member-leaves :wsId="id" :userId="member.userId" />
          </v-list-tile-content>
        </v-list-group>
      </v-list>
    </div>
  </v-card-text>
</template>

<script>
import { getWorkspaceMembers } from "../../services/workspace.service";
import { userName } from "../../utils/user.utils";
import {
  TYPES as BALANCE_TYPES,
  THEME as BALANCE_THEME
} from "../../utils/balance.utils";
import MemberLeaves from "./MemberLeaves";

export default {
  components: {
    MemberLeaves
  },
  props: ["id"],
  data() {
    return {
      loading: true,
      members: [],
      BALANCE_TYPES
    };
  },
  async mounted() {
    this.loading = true;

    try {
      this.members = await getWorkspaceMembers(this.id);
      this.loading = false;
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    userName,
    onAddMember() {
      this.$router.push({ name: "workspace-member-add" });
    },
    onEditMember(e, userId) {
      e.stopPropagation();

      this.$router.push({
        name: "workspace-member-edit",
        params: { userId }
      });
    },
    leaveColor(type /* total, left */) {
      return BALANCE_THEME[type];
    }
  }
};
</script>

<style lang="scss" scoped>
.v-list__tile__action-text {
  margin: 0 8px;

  .v-icon {
    color: inherit;
  }
}

.v-list__group {
  &::before,
  &::after {
    background: rgba(0, 0, 0, 0.12);
  }
}

.member-edit-btn {
  margin: 0 8px;
  width: 24px;
  height: 24px;
}
</style>