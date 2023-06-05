<template>
  <div>
    <!--Form de add inicio-->
    <v-sheet
      class="text--white"
      color="purple"
      elevation="1"
      height="100"
      width="100%"
      style="display: flex; align-items: center"
      ><h1 style="font-size: 50px; color: white; margin-left: 16px"></h1
    ></v-sheet>
    <div style="margin-left: 16px; margin-top: 50px">
      <span style="color: #9c27b0; font-size: 25px; font-weight: 350">
        Produtos
      </span>
    </div>
    <v-divider class="purple lighten-4"></v-divider>
    <div
      style="
        margin-left: 16px;
        display: grid;
        grid-template-columns: repeat(5, 250px);
        grid-column-gap: 50px;
        grid-row-gap: 0px;
        justify-content: center;
      "
    >
      <AddProduct :loja="loja" v-if="dono?.includes(loja)"></AddProduct>
      <pcard
        v-for="(products, index) in products || []"
        :key="index"
        :name="products.nome"
        :desc="products.descricao"
        :picture="`${loja}/${products.image}`"
        :category="products.categorias"
        :valor="products.valor"
        :owner="dono?.includes(loja)"
        @delete-card="deleteCard($event)"
        @edit-card="editCard($event)"
      ></pcard>
    </div>
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
    // ...mapActions(["editProduct"]),
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
