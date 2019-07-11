<template>
  <v-select
    :label="label"
    :items="options"
    :value="value"
    @input="onInput"
    :error-messages="errorMessages"
  >
    <template slot="selection" slot-scope="data">
      <v-flex class="no-grow">
        <v-avatar size="24px">
          <img
            :src="
              `https://randomuser.me/api/portraits/men/${data.item.value}.jpg`
            "
          />
        </v-avatar>
      </v-flex>
      <v-flex class="ml-1">{{ data.item.text }}</v-flex>
    </template>

    <template slot="item" slot-scope="data">
      <v-list-tile-avatar>
        <img
          :src="
            `https://randomuser.me/api/portraits/men/${data.item.value}.jpg`
          "
        />
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title>{{ data.item.text }}</v-list-tile-title>
        <v-list-tile-sub-title>{{ data.item.email }}</v-list-tile-sub-title>
      </v-list-tile-content>
    </template>
  </v-select>
</template>

<script>
export default {
  props: ["label", "options", "name", "value", "errorMessages"],
  methods: {
    onInput(value) {
      this.$emit("input", value);
    }
  }
};
</script>
