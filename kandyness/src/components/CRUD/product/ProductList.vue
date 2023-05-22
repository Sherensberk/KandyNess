<template>
  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="12" md="8">
      <v-text-field v-model="nome" label="Buscar por Nome"></v-text-field>
    </v-col>

    <v-col cols="12" md="4">
      <v-btn small @click="searchTitle"> Search </v-btn> </v-col
    >w

    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>Products</v-card-title>

        <v-data-table
          :headers="headers"
          :items="products"
          disable-pagination
          :hide-default-footer="true"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editProduct(item.id)"
              >mdi-pencil</v-icon
            >
            <v-icon small @click="deleteProduct(item.id)">mdi-delete</v-icon>
          </template>
        </v-data-table>

        <v-card-actions v-if="products.length > 0">
          <v-btn small color="error" @click="removeAllProducts">
            Remove All
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import ProductDataService from "@/services/ProductDataService";
export default {
  name: "products-list",
  data() {
    return {
      products: [],
      nome: "",
      headers: [
        { text: "Nome", align: "start", sortable: false, value: "nome" },
        { text: "Valor", value: "valor", sortable: false },
      ],
    };
  },
  methods: {
    retrieveProducts() {
      ProductDataService.getAll()
        .then((response) => {
          this.products = response.data.map(this.getDisplayProduct);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveProducts();
    },

    removeAllProducts() {
      ProductDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    searchTitle() {
      ProductDataService.findById(this.id)
        .then((response) => {
          this.products = response.data.map(this.getDisplayProduct);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    editProduct(id) {
      this.$router.push({ name: "product-details", params: { id: id } });
    },

    deleteProduct(id) {
      ProductDataService.delete(id)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getDisplayProduct(product) {
      return {
        id: product.id,
        nome:
          product.nome.length > 30
            ? product.nome.substr(0, 30) + "..."
            : product.nome,
        valor:
          product.valor.length > 30
            ? product.valor.substr(0, 30) + "..."
            : product.valor,
      };
    },
  },
  mounted() {
    this.retrieveProducts();
  },
};
</script>

<style>
.list {
  max-width: 750px;
}
</style>
