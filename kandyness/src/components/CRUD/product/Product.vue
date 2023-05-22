<template>
  <div v-if="currentProduct" class="edit-form py-3">
    <p class="headline">Editar Produto</p>

    <v-form ref="form" lazy-validation>
      <v-text-field
        v-model="currentProduct.nome"
        :rules="[(v) => !!v || 'Nome é obrigatório']"
        label="Nome"
        required
      ></v-text-field>

      <v-text-field
        v-model="currentProduct.valor"
        :rules="[(v) => !!v || 'Valor é obrigatório']"
        label="Valor"
        number
        required
      ></v-text-field>

      <v-divider class="my-5"></v-divider>

      <v-btn color="error" small class="mr-2" @click="deleteProduct">
        Remover
      </v-btn>

      <v-btn color="success" small @click="updateProduct"> Atualizar </v-btn>
    </v-form>

    <p class="mt-3">{{ message }}</p>
  </div>

  <div v-else>
    <p>Selecione um Produto</p>
  </div>
</template>

<script>
import ProductDataService from "@/services/ProductDataService";

export default {
  name: "product",
  data() {
    return {
      currentProduct: null,
      message: "",
    };
  },
  methods: {
    getProduct(id) {
      ProductDataService.get(id)
        .then((response) => {
          this.currentProduct = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateProduct() {
      ProductDataService.update(this.currentProduct.id, this.currentProduct)
        .then((response) => {
          console.log(response.data);
          this.message = "O produto foi atualizado com sucesso!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteProduct() {
      ProductDataService.delete(this.currentProduct.id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "products" });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getProduct(this.$route.params.id);
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
