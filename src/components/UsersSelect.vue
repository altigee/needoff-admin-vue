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
      <v-list-item-avatar>
        <img
          :src="
            `https://randomuser.me/api/portraits/men/${data.item.value}.jpg`
          "
        />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>{{ data.item.text }}</v-list-item-title>
        <v-list-item-subtitle>{{ data.item.email }}</v-list-item-subtitle>
      </v-list-item-content>
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
