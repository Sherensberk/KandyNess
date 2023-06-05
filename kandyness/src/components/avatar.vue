<template>
  <v-menu v-if="user" bottom min-width="200px" rounded offset-y>
    <template v-slot:activator="{ on }">
      <v-btn icon x-large v-on="on">
        <v-avatar color="purple" size="42">
          <span class="white--text text-h5">{{ user.initials }}</span>
        </v-avatar>
      </v-btn>
    </template>
    <v-card>
      <v-list-item-content class="justify-center">
        <div class="mx-auto text-center">
          <v-avatar color="purple">
            <span class="white--text text-h5">{{ user.initials }}</span>
          </v-avatar>
          <h3>{{ user.fullName }}</h3>
          <p class="text-caption mt-1">
            {{ user.email }}
          </p>
          <v-divider class="my-3"></v-divider>
          <v-btn depressed rounded text @click="disconnect">Sair</v-btn>
        </div>
      </v-list-item-content>
    </v-card>
  </v-menu>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "avatar",
  // ...
  computed: {
    ...mapGetters(["getUsuario"]),
    user() {
      const usuario = this.getUsuario;
      if (Object.keys(usuario).length == 0) return null;
      return {
        //first 2 letter form nome
        initials: usuario.nome[0] + usuario.nome[1],
        fullName: usuario.nome,
        email: usuario.nome + "@gmail.com",
      };
    },
  },
  methods: {
    disconnect() {
      // Limpe o usuário do store (utilize a ação correspondente do Vuex)
      this.$store.dispatch("limparUsuario");

      // Redirecione para a página de login
      this.$router.push("/login");
    },
  },
};
</script>
