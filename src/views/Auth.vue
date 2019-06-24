<template>
  <router-view></router-view>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: mapState({
    token: state => state.access_token,
    is_logged_in: state => !!state.access_token
  })
};
</script>
