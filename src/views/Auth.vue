<template>
  <div>
    <h3>Auth page</h3>
    <pre><code>logged in: {{ is_logged_in }}</code></pre>
    <router-view></router-view>
  </div>
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
