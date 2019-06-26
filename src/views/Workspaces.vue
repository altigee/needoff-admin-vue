<template>
  <v-layout column full-width>
    <div v-if="loading">Loading...</div>
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
        <v-btn @click="onAddWorkspaceInitiate" outline color="primary"
          >Add workspace</v-btn
        >
      </v-flex>
    </v-layout>

    <ul>
      <li
        v-for="ws in workspaces"
        @click="onWorkspaceChoose(ws.id)"
        v-bind:key="ws.id"
      >
        <p>{{ ws.id }} - {{ ws.name }}</p>
        <p>{{ ws.description }}</p>
      </li>
    </ul>
  </v-layout>
</template>

<script>
import { getWorkspaces } from "../services/workspace.service";

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
    onWorkspaceChoose(id) {
      this.$router.push({ name: "workspace", params: { id } });
    },
    onAddWorkspaceInitiate() {
      this.$router.push({ name: "add_workspace" });
    }
  }
};
</script>
