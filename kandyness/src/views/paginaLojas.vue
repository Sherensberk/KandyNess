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
      <v-card class="mx-auto my-12" max-width="250" min-width="250">
        <div
          style="
            width: 100%;
            background-color: hsl(291, 64%, 42%);
            display: flex;
            justify-content: center;
            align-items: center;
            height: 50px;
          "
        >
          <span style="color: white; font-size: 20px">Adicionar produto</span>
        </div>
        <div
          style="
            display: flex;

            flex-direction: column;
            padding: 5px;
            gap: 10px;
          "
        >
          <div>
            <v-text-field
              color="#9c27b0"
              label="Nome do produto"
              hide-details="auto"
              id="nomeProduto"
            ></v-text-field>
          </div>
          <div>
            <v-text-field
              color="#9c27b0"
              label="Categoria do produto"
              hide-details="auto"
              id="categoriaProduto"
            ></v-text-field>
          </div>
          <div>
            <v-text-field
              color="#9c27b0"
              label="Descrição do produto"
              hide-details="auto"
              id="descProduto"
            ></v-text-field>
          </div>
          <div>
            <v-text-field
              color="#9c27b0"
              label="Imagem do produto"
              id="imgProduto"
              hide-details="auto"
            ></v-text-field>
          </div>
          <v-spacer></v-spacer>
          <div class="text-center">
            <v-btn
              v-on:click="addCard"
              id="addProduto"
              color="green"
              elevation="2"
              width="120"
              ><span style="color: white">Adicionar</span></v-btn
            >
          </div>
        </div> </v-card
      ><!--Form de add fim e inicio dos pcards-->
      <pcard
        v-for="(products, index) in products"
        :key="index"
        :name="products.name"
        :desc="products.desc"
        :picture="products.picture"
        :category="products.category"
        :id="index.toString()"
        :nameInput="'newName' + index.toString()"
        :catInput="'newCat' + index.toString()"
        :descInput="'newDesc' + index.toString()"
        :imgInput="'newImg' + index.toString()"
        @delete-card="deleteCard(index)"
        @edit-card="editCard(index)"
      ></pcard>
    </div>
  </div>
</template>

<script>
import pcard from "@/components/pcard";
export default {
  name: "myView",
  components: { pcard },
  data: () => ({
    products: [
      {
        name: "Cafe",
        desc: "Cafe de programador de java",
        picture:
          "https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG",
        category: "bebidas",
      },
      {
        name: "Coxinha",
        desc: "Uma coxinha aonde o recheio possa talvez estar gelado",
        picture:
          "https://a-static.mlcdn.com.br/1500x1500/coxinha-de-frango-crossdog/crossdog/e6e95a5807f011ec87ac4201ac185013/17e319f6aafea2915fa2b2bf7e0a649a.jpeg",
        category: "salgados",
      },
      {
        name: "Brownie",
        desc: "Brownie de chocolate velho de supermercado",
        picture: "https://images2.alphacoders.com/104/1040769.jpg",
        category: "sobremesas",
      },
    ],
  }),
  methods: {
    addCard: function () {
      let nome = document.getElementById("nomeProduto");
      let categoria = document.getElementById("categoriaProduto");
      let desc = document.getElementById("descProduto");
      let img = document.getElementById("imgProduto");

      this.products.push({
        name: nome.value,
        desc: desc.value,
        picture: img.value,
        category: categoria.value,
      });
      nome.value = "";
      desc.value = "";
      img.value = "";
      categoria.value = "";
    },
    deleteCard: function (index) {
      this.products.splice(index, 1);
    },
    editCard: function (index) {
      let nome = document.getElementById(`newName${index}`);
      let categoria = document.getElementById(`newCat${index}`);
      let desc = document.getElementById(`newDesc${index}`);
      let img = document.getElementById(`newImg${index}`);
      console.log(`newName${index}`);
      this.products[index].name = nome.value;
      this.products[index].category = categoria.value;
      this.products[index].desc = desc.value;
      this.products[index].picture = img.value;
      let modal = document.getElementById(index.toString());
      nome.value = "";
      categoria.value = "";
      desc.value = "";
      img.value = "";
      modal.close();
    },
  },
};
</script>
