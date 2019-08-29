<template>
  <v-dialog
    ref="dialog"
    v-model="isModalVisible"
    :return-value.sync="date"
    width="460px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="dateFormatted"
        label="Start date"
        append-icon="event"
        readonly
        v-on="on"
      ></v-text-field>
    </template>

    <v-date-picker v-model="date" scrollable landscape full-width>
      <v-spacer></v-spacer>
      <v-btn text color="secondary" @click="isModalVisible = false"
        >Cancel</v-btn
      >
      <v-btn outlined color="primary" @click="$refs.dialog.save(date)"
        >OK</v-btn
      >
    </v-date-picker>
  </v-dialog>
</template>

<script>
import { format } from "../utils/date.utils";

export default {
  props: ["model", "label"],
  data() {
    return {
      date: this.model,
      isModalVisible: false
    };
  },
  computed: {
    dateFormatted() {
      return format(this.model);
    }
  },
  watch: {
    date(value) {
      this.$emit("update:model", value);
    }
  }
};
</script>
