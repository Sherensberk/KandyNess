<template>
  <v-app id="app">
    <v-app-bar app>
      <v-toolbar-title class="font-weight-light purple--text"
        >Kandy</v-toolbar-title
      >
      <v-toolbar-title class="red--text">ness</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- Icone do carrinhao de compras, que vai para carrinho  -->
      <router-link to="/carrinho">
        <v-btn icon>
          <v-icon>mdi-cart</v-icon>
        </v-btn>
      </router-link>
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
