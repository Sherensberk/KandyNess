<template>
  <div class="submit-form mt-3 mx-auto">
    <p class="headline">Adicionar Produto</p>

    <div v-if="!submitted">
      <v-form ref="form" lazy-validation>
        <v-text-field
          v-model="product.loja"
          :rules="[(v) => !!v || 'Nome da Loja é obrigatório']"
          label="Loja"
          required
        ></v-text-field>

        <v-text-field
          v-model="product.nome"
          :rules="[(v) => !!v || 'Nome é obrigatório']"
          label="Nome"
          required
        ></v-text-field>
        <v-text-field
          v-model="product.valor"
          :rules="[(v) => !!v || 'Valor é obrigatório']"
          label="Valor"
          required
        ></v-text-field>
      </v-form>

      <v-btn color="primary" class="mt-3" @click="saveProduct">Submit</v-btn>
    </div>

    <div v-else>
      <v-card class="mx-auto">
        <v-card-title> Enviado com sucesso! </v-card-title>

        <v-card-subtitle>
          Pressione o botão para Adicionar um novo Produto.
        </v-card-subtitle>

        <v-card-actions>
          <v-btn color="success" @click="newProduct">Add</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import ProductDataService from "@/services/ProductDataService";

export default {
  name: "add-product",
  data() {
    return {
      product: {
        id: null,
        loja: "",
        nome: "",
        valor: 0.0,
      },
      submitted: false,
    };
  },
  methods: {
    saveProduct() {
      var data = {
        loja: this.product.loja,
        nome: this.product.nome,
        valor: this.product.valor,
      };

      ProductDataService.create(data)
        .then((response) => {
          this.product.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newProduct() {
      this.submitted = false;
      this.product = {};
    },
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
}
</style>
