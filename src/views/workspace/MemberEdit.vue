<template>
  <v-form @submit="onSubmit">
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md8>
        <v-card-text>
          <v-text-field
            name="member.firstName"
            label="Given name"
            v-model="member.firstName"
            v-validate="'required'"
            :error-messages="errors.collect('member.firstName')"
          />

          <v-text-field
            name="member.lastName"
            label="Family name"
            v-model="member.lastName"
            v-validate="'required'"
            :error-messages="errors.collect('member.lastName')"
          />

          <v-text-field
            append-icon="email"
            name="email"
            label="Email"
            v-model="member.email"
            v-validate="'required|email'"
            :error-messages="errors.collect('email')"
          />

          <datepicker label="Start date" :model.sync="member.startDate" />
        </v-card-text>

        <errors-alert :items="be_errors" />

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text exact :to="{ name: 'workspace-members' }">Cancel</v-btn>
          <v-btn color="primary" type="submit">Edit member</v-btn>
        </v-card-actions>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
import {
  getWorkspaceMember,
  updateWorkspaceMember
} from "../../services/workspace.service";

export default {
  props: ["id", "userId"],
  data() {
    return {
      member: {
        firstName: "",
        lastName: "",
        email: "",
        startDate: ""
      },
      loading: false,
      be_errors: []
    };
  },
  async mounted() {
    this.loading = true;

    try {
      const res = await getWorkspaceMember(this.id, this.userId);
      this.member = { ...res.profile, startDate: res.startDate };
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault();

      this.loading = true;

      try {
        const is_valid = await this.$validator.validateAll();

        if (is_valid) {
          await updateWorkspaceMember(this.id, this.userId, this.member);

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
