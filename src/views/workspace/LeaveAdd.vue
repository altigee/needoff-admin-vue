<template>
  <v-form @submit="onSubmit">
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md8>
        <v-card-text>
          <users-select
            label="User"
            v-model="leave.userId"
            :options="members.options"
            name="leave.userId"
            v-validate="'required'"
            :error-messages="errors.collect('leave.userId')"
          />

          <v-select
            label="Leave type"
            :items="typeOptions"
            v-model="leave.type"
            name="leave.type"
            v-validate="'required'"
            :error-messages="errors.collect('leave.type')"
          ></v-select>

          <datepicker label="Start date" :model.sync="leave.startDate" />
          <datepicker label="End date" :model.sync="leave.endDate" />

          <v-textarea
            label="Comment"
            v-model.trim="leave.comment"
            name="leave.comment"
            v-validate="'max:250'"
            :error-messages="errors.collect('leave.comment')"
            counter="250"
            rows="3"
          />
        </v-card-text>

        <errors-alert :items="be_errors" />

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-if="!loading" text exact :to="{ name: 'workspace-leaves' }"
            >Cancel</v-btn
          >
          <v-btn :loading="loading" color="primary" type="submit"
            >Add leave</v-btn
          >
        </v-card-actions>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
import { startOfToday, startOfTomorrow } from "date-fns";
import UsersSelect from "../../components/UsersSelect";
import { toISO } from "../../utils/date.utils";
import { typeOptions } from "../../utils/balance.utils";
import { getUserOptions, userName } from "../../utils/user.utils";
import { messagesToRootError } from "../../services/gql";
import {
  getWorkspaceMembersList,
  createLeave
} from "../../services/workspace.service";

export default {
  components: {
    UsersSelect
  },
  props: ["id"],
  data() {
    return {
      leave: {
        type: "",
        startDate: toISO(startOfToday()),
        endDate: toISO(startOfTomorrow()),
        workspaceId: this.id,
        userId: null,
        comment: ""
      },
      typeOptions,
      members: {
        loading: false,
        options: []
      },
      loading: false,
      be_errors: []
    };
  },
  async mounted() {
    this.members.loading = true;

    try {
      const membersData = await getWorkspaceMembersList(this.id);
      const profiles = membersData.map(member => member.profile);

      this.members.options = getUserOptions(profiles);
    } catch (error) {
      console.error(error);
    }

    this.members.loading = false;
  },
  methods: {
    userName,
    //
    async onSubmit(e) {
      e.preventDefault();
      this.loading = true;

      try {
        const is_valid = await this.$validator.validateAll();

        if (is_valid) {
          const res = await createLeave(this.leave);

          if (res.errors.length) {
            throw messagesToRootError(res.errors);
          }

          this.$router.push({ name: "workspace-leaves" });
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
