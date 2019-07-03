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
        <template v-for="(member, idx) in members">
          <v-list-tile v-bind:key="member.userId">
            <v-list-tile-avatar>
              <img
                :src="
                  `https://randomuser.me/api/portraits/men/${member.userId}.jpg`
                "
              />
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{
                userName(member.profile)
              }}</v-list-tile-title>
              <v-list-tile-sub-title>{{
                member.profile.email
              }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider
            v-if="idx + 1 !== members.length"
            v-bind:key="`${member.userId}-divider`"
          ></v-divider>
        </template>
      </v-list>
    </div>
  </v-card-text>
</template>

<script>
import { getWorkspaceMembers } from "../../services/workspace.service";
import { userName } from "../../utils/user.utils";

export default {
  props: ["id"],
  data() {
    return {
      loading: true,
      members: []
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
      //
    }
  }
};
</script>
