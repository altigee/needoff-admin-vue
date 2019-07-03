<template>
  <v-card-text>
    <page-spinner v-if="loading" />

    <v-layout
      v-if="!loading"
      row
      justify-space-between
      align-center
      mb-4
      no-grow
    >
      <v-flex>
        <h3>{{ ws.name }}</h3>

        <div>{{ ws.description }}</div>
      </v-flex>

      <v-flex class="no-grow">
        <v-btn @click="onEditWorkspace" outline color="primary">
          <v-icon>edit</v-icon>Edit
        </v-btn>
      </v-flex>
    </v-layout>
  </v-card-text>
</template>

<script>
import { getWorkspace } from "../../services/workspace.service";

export default {
  props: ["id"],
  data() {
    return {
      loading: false,
      ws: {}
    };
  },
  async mounted() {
    this.loading = true;

    try {
      this.ws = await getWorkspace(this.id);
    } catch (error) {
      console.error(error);
    }

    this.loading = false;
  },
  methods: {
    onEditWorkspace() {
      console.log(this.id);
    }
  }
};
</script>
