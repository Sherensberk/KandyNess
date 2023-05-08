<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <!--  -->
    </v-navigation-drawer>
    <v-app-bar app>
      <v-app-bar-nav-icon
        class="purple--text"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="font-weight-light purple--text"
        >Kandy</v-toolbar-title
      >
      <v-toolbar-title class="red--text">ness</v-toolbar-title>
      <v-spacer></v-spacer>
      <avatar></avatar>
    </v-app-bar>
    <v-main>
      <!--  -->
      <RouterView></RouterView>
    </v-main>
  </v-app>
</template>

<script>
import { RouterView } from "vue-router";
import avatar from "@/components/avatar";

export default {
  data: () => ({ drawer: false }),
  components: { RouterView, avatar },
};
</script>
