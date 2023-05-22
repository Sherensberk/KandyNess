<template>
  <v-card class="mx-auto my-12" max-width="400">
    <div class="header">
      <span class="header__text">Adicionar produto</span>
    </div>
    <v-form @submit.prevent v-model="valid">
      <v-text-field
        v-model="product.nome"
        :rules="[(v) => !!v || 'Nome é obrigatório']"
        label="Nome"
        required
      ></v-text-field>
      <v-text-field
        v-model="product.descricao"
        :rules="[(v) => !!v || 'Descrição é obrigatória']"
        label="Descrição"
        required
      ></v-text-field>
      <v-select
        v-model="categories"
        :items="items"
        attach
        chips
        label="Categorias"
        item-text="nome"
        item-value="cod"
        multiple
      ></v-select>
      <v-text-field
        v-model="product.valor"
        :rules="[(v) => !!v || 'Valor é obrigatório']"
        label="Valor"
        type="number"
        required
      ></v-text-field>
      <div class="image-input">
        <v-file-input
          v-model="imageUrl"
          :rules="[(v) => !!v || 'Imagem é obrigatória']"
          label="Imagem"
          required
          accept="image/*"
        ></v-file-input>
      </div>
      <div class="text-center">
        <v-btn
          type="submit"
          @click="saveProduct"
          color="blue"
          elevation="2"
          width="120"
        >
          <span style="color: white">Salvar</span>
        </v-btn>
      </div>
    </v-form>
  </v-card>
</template>
<script>
import ProductDataService from "@/services/ProductDataService";
import CategoriaDataService from "@/services/CategoriaDataService";

export default {
  name: "AddProduct",
  props: {
    loja: String,
    default: () => "Bricks Brownies",
  },
  data() {
    return {
      valid: false,
      product: {
        nome: "",
        image: "",
        descricao: "",
        valor: 0.0,
      },
      categories: [],
      submitted: false,
      items: [],
      value: [],
      imageUrl: null,
    };
  },
  methods: {
    saveProduct() {
      if (this.valid) {
        var data = {
          loja: this.loja,
          ...this.product,
          image: this.imageUrl.name,
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
        this.product = {
          nome: "",
          image: "",
          descricao: "",
          valor: 0.0,
        };
        console.log(this.imageUrl);
      }
    },

    newProduct() {
      this.submitted = false;
      this.product = {};
    },
    onFileChange(event) {
      const file = event.target.files[0];
      this.imageUrl = URL.createObjectURL(file);
      console.log(this.imageUrl);
      // Você pode fazer algo com o arquivo, como enviá-lo para o servidor
    },
  },
  mounted() {
    CategoriaDataService.getAll().then((response) => {
      this.items = response.data;
      console.log("Sas", response.data);
    });
  },
};
</script>

<style>
.header {
  background-color: hsl(291, 64%, 42%);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  color: white;
  font-size: 20px;
}

.image-input {
  margin-top: 10px;
}

.image-input__preview {
  margin-top: 10px;
  width: 200px;
  height: 200px;
  border: 1px solid #e0e0e0;
  overflow: hidden;
}

.image-input__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.text-center {
  margin-top: 20px;
}
</style>
