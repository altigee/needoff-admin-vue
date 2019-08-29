<template>
  <v-form @submit="onRegisterSubmit">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md8>
          <v-card class="elevation-12">
            <v-toolbar dark>
              <v-toolbar-title>Register</v-toolbar-title>
            </v-toolbar>

            <v-card-text>
              <v-layout>
                <v-flex>
                  <v-text-field
                    prepend-icon="account_circle"
                    name="userData.firstName"
                    label="Given name"
                    v-model.trim="userData.firstName"
                    v-validate="'required'"
                    :error-messages="errors.collect('userData.firstName')"
                    type="text"
                  ></v-text-field>
                </v-flex>

                <v-flex ml-2>
                  <v-text-field
                    name="userData.lastName"
                    label="Family name"
                    v-model.trim="userData.lastName"
                    v-validate="'required'"
                    :error-messages="errors.collect('userData.lastName')"
                    type="text"
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-text-field
                prepend-icon="email"
                name="email"
                label="Email"
                v-model.trim="email"
                v-validate="'required|email'"
                :error-messages="errors.collect('email')"
                type="text"
              ></v-text-field>

              <v-text-field
                prepend-icon="lock"
                name="password"
                label="Password"
                v-model.trim="password"
                v-validate="'required'"
                :error-messages="errors.collect('password')"
                type="password"
              ></v-text-field>
            </v-card-text>

            <v-card-text v-if="be_errors.length">
              <v-alert :value="true" color="error" icon="warning" outlined>{{
                be_errors[0].message
              }}</v-alert>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text :to="{ name: 'login' }">Back to Login</v-btn>
              <v-btn color="primary" type="submit">Register</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import { mapActions } from "vuex";
import { register } from "../services/auth.service";

export default {
  data() {
    return {
      email: "taras.kharuk2@gmail.com",
      password: "12345",
      userData: {
        firstName: " Torson ",
        lastName: "Khork"
      },
      be_errors: []
    };
  },
  methods: {
    ...mapActions(["loginUser", "logoutUser"]),
    //
    async onRegisterSubmit(e) {
      e.preventDefault();

      const is_valid = await this.$validator.validateAll();

      if (is_valid) {
        try {
          const resp = await register({
            email: this.email,
            userData: this.userData,
            password: this.password
          });

          this.loginUser(resp.accessToken);
        } catch (err) {
          this.be_errors = err.response.errors;
        }
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
