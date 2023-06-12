<template>
  <v-app id="app">
    <v-app-bar app>
      <v-toolbar-title class="font-weight-light purple--text"
        >Kandy</v-toolbar-title
      >
      <v-toolbar-title class="red--text">ness</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="select">
        <!-- register loja -->
        <v-icon>mdi-store</v-icon>
      </v-btn>
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
      <register_loja
        :dialog-value.sync="dialogValue"
        @update:dialogValue="dialogValue = $event"
      ></register_loja>
    </v-main>
  </v-app>
</template>

<script>
import { RouterView } from "vue-router";
import avatar from "@/components/avatar";
import register_loja from "@/components/register_loja";

export default {
  data: () => ({ drawer: false, dialogValue: false }),
  methods: {
    select() {
      this.dialogValue = !this.dialogValue;
      console.log("select", this.dialogValue);
    },
  },
  components: { RouterView, avatar, register_loja },
};
</script>
