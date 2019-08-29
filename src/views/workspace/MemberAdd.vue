<template>
  <v-form @submit="onSubmit">
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md8>
        <v-card-text>
          <v-text-field
            prepend-icon="email"
            name="email"
            label="Email"
            v-model="member.email"
            v-validate="'required|email'"
            :error-messages="errors.collect('email')"
            type="text"
          ></v-text-field>

          <v-dialog
            ref="dialog"
            v-model="modal"
            :return-value.sync="member.startDate"
            persistent
            full-width
            width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="startDateFormatted"
                label="Start date"
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="member.startDate" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
              <v-btn
                flat
                color="primary"
                @click="$refs.dialog.save(member.startDate)"
                >OK</v-btn
              >
            </v-date-picker>
          </v-dialog>
        </v-card-text>

        <v-card-text v-if="be_errors.length">
          <v-alert :value="true" color="error" icon="warning" outlined>
            {{ be_errors[0].message }}
          </v-alert>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text exact :to="{ name: 'workspace-members' }">Cancel</v-btn>
          <v-btn color="primary" type="submit">Add member</v-btn>
        </v-card-actions>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
import { format } from "date-fns";
import { addWorkspaceMember } from "../../services/workspace.service";

export default {
  props: ["id"],
  data() {
    return {
      member: {
        email: "tkharuk@altigee.com",
        startDate: new Date().toISOString().substr(0, 10)
      },
      loading: false,
      modal: false,
      be_errors: []
    };
  },
  computed: {
    startDateFormatted() {
      return format(this.member.startDate, "DD MMM YYYY");
    }
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault();

      this.loading = true;

      try {
        const is_valid = await this.$validator.validateAll();

        if (is_valid) {
          await addWorkspaceMember({
            workspaceId: this.id,
            member: this.member
          });

          this.$router.back();
        }
      } catch (err) {
        this.be_errors = err.response.errors;
        console.error(this.be_errors);
      }

      this.loading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.v-form {
  height: 100%;
  padding: 32px;
}
</style>
