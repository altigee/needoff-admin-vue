<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-if="!loading">
      <h3>Workspaces</h3>

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
    </div>
  </div>
</template>

<script>
import { getWorkspaces } from "../services/workspace.service";
import router from "../router";

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
      router.push({ name: "workspace", params: { id } });
    }
  }
};
</script>
