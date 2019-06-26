<template>
  <v-layout column full-width>
    <h3>Add new workspace</h3>

    <v-form @submit="onAddSubmit">
      <v-layout column>
        <v-layout column>
          <v-flex xs12>
            <v-text-field
              label="Name"
              name="name"
              v-model.trim="name"
              v-validate="'required'"
              :error-messages="errors.collect('name')"
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              label="Description"
              v-model.trim="description"
              name="description"
              v-validate="'required|max:250'"
              :error-messages="errors.collect('description')"
              hint="example of helper text only on focus"
              counter="250"
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              label="Members"
              v-model.trim="members"
              name="members"
              v-validate="'members'"
              :error-messages="errors.collect('members')"
              hint="Separated with coma"
              persistent-hint
            ></v-text-field>
          </v-flex>
        </v-layout>

        <v-flex v-if="!!be_errors.length" xs12 mt-2>
          <v-alert :value="true" color="error" icon="warning" outline>{{
            be_errors[0].message
          }}</v-alert>
        </v-flex>

        <v-layout mt-4>
          <v-btn color="primary" type="submit">add workspace</v-btn>
          <v-btn flat @click="onCancel">cancel</v-btn>
        </v-layout>
      </v-layout>
    </v-form>
  </v-layout>
</template>

<script>
import { compact } from "lodash";
import { createWorkspace } from "../services/workspace.service";

export default {
  data: () => ({
    name: "",
    description: "",
    members: "",
    be_errors: []
  }),
  methods: {
    async onAddSubmit(e) {
      e.preventDefault();

      const isValid = await this.$validator.validateAll();

      if (isValid) {
        try {
          const { name, description, members } = this;
          const { id } = await createWorkspace({
            name,
            description,
            members: sanitizeMembers(members)
          });

          this.$router.push({ name: "workspace", params: { id } });
        } catch (error) {
          this.be_errors = error.response.errors;
        }
      }
    },
    onCancel() {
      this.$router.back();
    }
  },
  created() {
    this.$validator.extend("members", {
      getMessage() {
        return "Member email is not valid";
      },
      validate: value => {
        const emails = sanitizeMembers(value);
        return Promise.all(
          emails.map(email => this.$validator.verify(email, "email"))
        );
      }
    });
  }
};

function sanitizeMembers(members) {
  return compact(members.split(",").map(email => email.trim()));
}
</script>
