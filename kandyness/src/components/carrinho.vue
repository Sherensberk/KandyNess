<template>
  <div class="carrinho">
    <h2 class="text-center">Carrinho de Compras</h2>

    <v-container v-if="itens.length === 0" class="mt-6">
      <v-row justify="center">
        <v-col cols="12" class="text-center">
          <p>O carrinho está vazio.</p>
        </v-col>
      </v-row>
    </v-container>

    <v-data-table
      v-else
      :items="itens"
      :headers="headers"
      :items-per-page="6"
      class="elevation-1"
    >
      <template v-slot:[`item.image`]="{ item }">
        <v-img
          :src="item.image"
          :alt="item.name"
          height="80"
          width="80"
        ></v-img>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn color="red" dark @click="removerItem(item)">Remover</v-btn>
      </template>
      <template v-slot:no-data>
        <v-row justify="center">
          <v-col cols="12" class="text-center">
            <p>O carrinho está vazio.</p>
          </v-col>
        </v-row>
      </template>
    </v-data-table>

    <v-container v-if="itens.length > 0" class="mt-6">
      <v-row justify="center">
        <v-col cols="12" sm="6" md="4" lg="3">
          <v-card>
            <v-card-text class="text-center">
              <div>Total de Itens: {{ totalItens }}</div>
              <div>Total: R$ {{ totalPreco.toFixed(2) }}</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <!-- Voltar para lojas "Continar comprando" -->
    <router-link to="/lojas" class="mt-6" style="text-decoration: none">
      <v-btn color="primary" dark block>Continuar comprando</v-btn>
    </router-link>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  name: "CarrinhoDeCompras",
  computed: {
    ...mapState({
      itens: "carrinho",
    }),
    ...mapGetters({
      totalItens: "getTotalItens",
      totalPreco: "getTotalItensPreco",
    }),
  },
  methods: {
    ...mapMutations({
      removerItem: "removerDoCarrinho",
    }),
  },
  data() {
    return {
      headers: [
        { text: "Imagem", value: "image" },
        { text: "Nome", value: "name" },
        { text: "Descrição", value: "desc" },
        { text: "Valor", value: "valor" },
        { text: "Ações", value: "actions" },
      ],
    };
  },
};
</script>

<style scoped>
.carrinho {
  margin-top: 20px;
}

.text-center {
  text-align: center;
}

.elevation-1 {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.v-data-table__actions {
  white-space: nowrap;
}
</style>
