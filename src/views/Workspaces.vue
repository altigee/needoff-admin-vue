<template>
  <v-layout column full-width>
    <page-spinner v-if="loading" />

    <v-layout
      v-if="!loading"
      row
      wrap
      justify-space-between
      align-center
      mb-4
      no-grow
    >
      <v-flex grow>
        <h3>Workspaces</h3>
      </v-flex>

      <v-flex class="no-grow">
        <v-btn @click="onAddWorkspaceInitiate" outline color="primary">
          <v-icon>add</v-icon>Add workspace
        </v-btn>
      </v-flex>
    </v-layout>

    <v-card
      v-for="ws in workspaces"
      @click="onWorkspaceChoose(ws.id)"
      v-bind:key="ws.id"
      class="mb-2"
    >
      <v-card-title primary-title>
        <v-avatar
          size="36px"
          class="mr-2"
          :style="{ backgroundColor: colorFromWorkspaceId(ws.id) }"
          >{{ ws.name[0] }}</v-avatar
        >
        {{ ws.name }}
      </v-card-title>

      <v-card-text>{{ ws.description }}</v-card-text>
    </v-card>
  </v-layout>
</template>

<script>
import { getWorkspaces } from "../services/workspace.service";
import { colorFromWorkspaceId } from "../utils/misc.utils";

export default {
  data() {
    return {
      loading: false,
      workspaces: []
    };
  },
  async mounted() {
    this.loading = true;

    try {
      this.workspaces = await getWorkspaces();
    } catch (error) {
      console.error(error);
    }

    this.loading = false;
  },
  methods: {
    colorFromWorkspaceId,
    onWorkspaceChoose(id) {
      this.$router.push({ name: "workspace", params: { id } });
    },
    onAddWorkspaceInitiate() {
      this.$router.push({ name: "add_workspace" });
    }
  }
};
</script>
