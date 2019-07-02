<template>
  <v-card-text>
    <page-spinner v-if="loading" />

    <p>{{ data.length }}</p>

    <v-sheet height="500">
      <v-calendar
        :now="'2019-11-01'"
        :value="'2019-11-01'"
        type="month"
        color="primary"
        :weekdays="[1, 2, 3, 4, 5, 6, 0]"
      >
        <template v-slot:day="{ present, past, date }">
          <v-layout column>
            <template v-if="hasVacation(date)">
              <v-chip
                v-for="item in getVacationsForDate(date)"
                :color="colors[item.leaveType]"
                small
                v-bind:key="item.id"
              >
                <v-avatar>
                  <img
                    src="https://randomuser.me/api/portraits/men/5.jpg"
                    :alt="item.user.firstName"
                  />
                </v-avatar>
                {{ userName(item.user) }}
              </v-chip>
            </template>
          </v-layout>
        </template>
      </v-calendar>
    </v-sheet>
  </v-card-text>
</template>

<script>
import { isWithinRange } from "date-fns";
import { filter } from "lodash";
import { userName } from "../utils/user.utils";

const colors = {
  VACATION_PAID: "accent",
  VACATION_UNPAID: "primary",
  SICK_LEAVE: "teal",
  WFH: "red"
};

export default {
  props: ["data", "loading"],
  data() {
    return { colors };
  },
  methods: {
    userName,
    //
    hasVacation(date) {
      return !!this.getVacationsForDate(date).length;
    },
    getVacationsForDate(date) {
      return filter(this.data, leave =>
        isWithinRange(date, leave.startDate, leave.endDate)
      );
    }
  }
};
</script>
