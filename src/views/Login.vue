<template>
  <v-form @submit="onLoginSubmit">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md8>
          <v-card class="elevation-12">
            <v-toolbar dark>
              <v-toolbar-title>Login</v-toolbar-title>
            </v-toolbar>

            <v-card-text>
              <v-text-field
                prepend-icon="email"
                name="email"
                label="Email"
                v-model="email"
                v-validate="'required|email'"
                :error-messages="errors.collect('email')"
                type="text"
              ></v-text-field>

              <v-text-field
                prepend-icon="lock"
                name="password"
                label="Password"
                v-model="password"
                v-validate="'required'"
                :error-messages="errors.collect('password')"
                type="password"
              ></v-text-field>
            </v-card-text>

            <v-card-text v-if="be_errors.length">
              <v-alert :value="true" color="error" icon="warning" outline>{{
                be_errors[0].message
              }}</v-alert>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat @click="onLogout">Logout</v-btn>
              <v-btn color="primary" type="submit">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import { mapActions } from "vuex";
import { login } from "../services/auth.service";
import router from "../router";

export default {
  data() {
    return {
      email: "taras.kharuk@gmail.com",
      password: "1234",
      be_errors: []
    };
  },
  methods: {
    ...mapActions(["loginUser", "logoutUser"]),
    //
    async onLoginSubmit(e) {
      e.preventDefault();

      try {
        const is_valid = await this.$validator.validateAll();

        if (is_valid) {
          const resp = await login({
            email: this.email,
            password: this.password
          });

          this.loginUser(resp.login.accessToken);
          router.push("/");
        }
      } catch (err) {
        this.be_errors = err.response.errors;
        console.error(this.be_errors);
      }
    },

    onLogout(e) {
      e.preventDefault();
      this.logoutUser();
    }
  }
};
</script>

<style lang="scss" scoped>
form {
  height: 100%;
}
</style>
