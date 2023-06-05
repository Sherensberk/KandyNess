<template>
  <div>
    <div class="mx-4 mt-6">
      <span
        class="purple--text text--darken-2 font-weight-light"
        style="font-size: 25px"
      >
        Produtos
      </span>
    </div>
    <v-divider class="purple lighten-4"></v-divider>
    <v-container>
      <v-row justify="center">
        <v-col v-if="dono?.includes(loja)">
          <AddProduct :loja="loja"></AddProduct>
        </v-col>
        <v-col
          v-for="(product, index) in products || []"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <pcard
            :name="product.nome"
            :desc="product.descricao"
            :picture="`${loja}/${product.image}`"
            :category="product.categorias"
            :valor="product.valor"
            :owner="dono?.includes(loja)"
            @delete-card="deleteCard($event)"
            @edit-card="editCard($event)"
          ></pcard>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import pcard from "@/components/pcard";
import AddProduct from "@/components/CRUD/product/AddProduct.vue";
import ProductDataService from "@/services/ProductDataService";
import CatProdDataService from "@/services/CategoriaProdutos";
import { mapGetters } from "vuex";

export default {
  name: "myView",
  components: { pcard, AddProduct },
  data: () => ({
    loja: "",
    products: [],
  }),
  computed: {
    ...mapGetters({
      produtos: "getProdutos",
      dono: "Dono",
    }),
  },
  methods: {
    retrieveProducts(loja) {
      ProductDataService.getByLoja(loja || this.loja)
        .then((response) => {
          var products = response.data;
          var promises = [];

          products.forEach((element) => {
            var promise = CatProdDataService.get(element.nome)
              .then((categories) => {
                var categorias = categories.data.map((objeto) => {
                  return {
                    cod: objeto.cod,
                    nome: objeto.categoria,
                  };
                });
                element.categorias = categorias;
              })
              .catch((error) => {
                console.log(error);
              });

            promises.push(promise);
          });

          Promise.all(promises)
            .then(() => {
              this.products = products;
              console.log(this.products);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getCategories(product) {
      CatProdDataService.get(product).then((response) => {
        var categorias = response.data.map((objeto) => objeto.categoria);
        console.table(categorias);
        return categorias;
      });
    },
    deleteCard: function (index) {
      console.log(index);
      ProductDataService.delete(index)
        .then((response) => {
          console.log(response.data);
          this.retrieveProducts(this.loja);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    editCard: function (info) {
      var data = {
        descricao: info.description,
        valor: info.valor,
        image: info.image,
      };
      console.log(data, info);
      ProductDataService.update(info.id, data)
        .then((response) => {
          console.log(response.data);
          this.retrieveProducts(this.loja);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  created() {
    this.loja = this.$route.params.loja;
    if (this.loja == undefined) {
      window.clearInterval();
      this.$router.push({ name: "lojas" });
    }
    this.retrieveProducts(this.loja);
    window.setInterval(() => {
      console.log("Timingtrigger");
      this.retrieveProducts(this.loja);
    }, 5000);
  },
};
</script>
