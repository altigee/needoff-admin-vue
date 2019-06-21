<template>
  <div>
    <form @submit="onLoginSubmit">
      <fieldset>
        <legend>Log In</legend>
        <input v-model="email" type="text" />
        <br />
        <input v-model="password" type="password" />
        <br />
        <br />
        <button type="submit">Log in</button>&nbsp;
        <button @click="onLogout">Log out</button>
      </fieldset>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { login } from "../services/auth.service";
import router from "../router";

export default {
  data() {
    return {
      email: "taras.kharuk@gmail.com",
      password: "12345"
    };
  },
  methods: {
    ...mapActions(["loginUser", "logoutUser"]),
    //
    async onLoginSubmit(e) {
      e.preventDefault();

      try {
        const resp = await login({
          email: this.email,
          password: this.password
        });

        this.loginUser(resp.login.accessToken);
        router.push("/");
      } catch (err) {
        console.error(err);
      }
    },

    onLogout(e) {
      e.preventDefault();
      this.logoutUser();
    }
  }
};
</script>
