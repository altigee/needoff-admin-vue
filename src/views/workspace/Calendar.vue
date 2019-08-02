<template>
  <v-card-text>
    <page-spinner v-if="loading" />

    <v-sheet height="500" v-if="!loading">
      <v-calendar
        v-model="start"
        type="month"
        color="primary"
        :weekdays="[1, 2, 3, 4, 5, 6, 0]"
        ref="calendar"
      >
        <template v-slot:day="{ present, past, date }">
          <v-layout column>
            <template v-if="hasVacation(date)">
              <v-chip
                v-for="item in getVacationsForDate(date)"
                :color="colors[item.leaveType]"
                small
                v-bind:key="item.id"
                :title="userName(item.user)"
              >
                <v-avatar>
                  <img
                    :src="
                      `https://randomuser.me/api/portraits/men/${item.user.userId}.jpg`
                    "
                  />
                </v-avatar>

                <span class="ellipsis">{{ userName(item.user) }}</span>
              </v-chip>
            </template>
          </v-layout>
        </template>
      </v-calendar>
    </v-sheet>

    <v-btn @click="$refs.calendar.prev()">
      <v-icon dark left>keyboard_arrow_left</v-icon>Prev
    </v-btn>
    <v-btn @click="$refs.calendar.next()">
      Next
      <v-icon right dark>keyboard_arrow_right</v-icon>
    </v-btn>
  </v-card-text>
</template>

<script>
import { isWithinRange } from "date-fns";
import { filter } from "lodash";
import { getWorkspaceCalendar } from "../../services/workspace.service";
import { userInitials, userName } from "../../utils/user.utils";

const colors = {
  VACATION_PAID: "accent",
  VACATION_UNPAID: "primary",
  SICK_LEAVE: "teal",
  WFH: "red"
};

export default {
  props: ["id"],
  data() {
    return {
      loading: true,
      start: "2019-11-01",
      calendar: [],
      colors
    };
  },
  async mounted() {
    this.loading = true;

    try {
      const data = await getWorkspaceCalendar(this.id);

      this.ws = data.workspaceById;
      this.calendar = data.teamCalendar;
    } catch (error) {
      console.error(error);
    }

    this.loading = false;
  },
  methods: {
    userName,
    userInitials,
    //
    hasVacation(date) {
      return !!this.getVacationsForDate(date).length;
    },
    getVacationsForDate(date) {
      return filter(this.calendar, leave =>
        isWithinRange(date, leave.startDate, leave.endDate)
      );
    }
  }
};
</script>

<style lang="stylus" scoped>
.v-card__text {
  padding-top: 64px;
}

.v-calendar-monthly {
  border-top: 1px solid #e0e0e0;
  border-left: 1px solid #e0e0e0;
}

.v-chip >>> .v-chip__content {
  overflow: hidden;
}
</style>
