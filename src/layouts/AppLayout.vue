<template>
  <v-app>
    <v-navigation-drawer fixed v-model="drawer" app>
      <v-layout column fill-height>
        <v-flex xs1>
          <v-list dense>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <router-link :to="{ name: 'home' }">Home</router-link>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Contact</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex xs1>
          <v-btn text @click="onLogout">
            Log out
            <v-icon right dark>exit_to_app</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-navigation-drawer>

    <v-app-bar color="indigo" dark fixed app>
      <!-- <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon> -->
      <v-toolbar-title>
        <router-link :to="{ name: 'home' }" class="toolbar-title-link"
          >Needoff admin</router-link
        >
      </v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container fluid fill-height>
        <transition-page>
          <router-view></router-view>
        </transition-page>
      </v-container>
    </v-content>

    <v-footer color="indigo" app>
      <span class="white--text pl-2">&copy; Altigee 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: () => ({
    drawer: null
  }),
  methods: {
    ...mapActions(["logoutUser"]),
    //
    onLogout(e) {
      e.preventDefault();
      this.logoutUser();
    }
  }
};
</script>

<style scoped>
.toolbar-title-link {
  text-decoration: none;
  color: white;
}
</style>
