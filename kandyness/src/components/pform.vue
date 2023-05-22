<template>
  <v-form @submit.prevent v-if="edit" v-model="valid">
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="formData.name"
          label="Nome do produto"
          :rules="nameRules"
          required
          :readonly="true"
          :disabled="true"
        ></v-text-field>
      </v-col>

      <!-- <v-col cols="12">
        <v-select
          v-model="formData.category"
          multiple
          label="Categoria do produto"
          :items="categories"
          item-text="nome"
          :item-value="(item) => item"
          :rules="categoryRules"
          required
          :disabled="true"
        ></v-select>
      </v-col> -->

      <v-col cols="12">
        <v-text-field
          v-model="formData.desc"
          label="Descrição do produto"
          :rules="descRules"
          required
        ></v-text-field>
      </v-col>

      <v-col cols="12">
        <v-text-field
          v-model="formData.image"
          label="Imagem do produto"
        ></v-text-field>
      </v-col>

      <v-col cols="12">
        <v-text-field
          v-model="formData.valor"
          label="Valor do produto"
          type="number"
          required
        ></v-text-field>
      </v-col>
    </v-row>

    <div class="text-center">
      <v-btn
        type="submit"
        @click="editCard"
        color="blue"
        elevation="2"
        width="120"
      >
        <span style="color: white">Salvar</span>
      </v-btn>
    </div>
    {{ valid }}
  </v-form>
</template>

<script>
import CategoriaDataService from "@/services/CategoriaDataService";
export default {
  name: "PForm",
  props: {
    name: String,
    desc: String,
    image: String,
    category: Array,
    valor: Number,
    edit: Boolean,
  },
  data() {
    return {
      formData: {},
      categories: [],
      valid: false,
      // categories: ["Bebidas", "Doces", "Salgados", "Outros"],
      nameRules: [
        (v) => !!v || "O Nome é obrigatório",
        (v) =>
          (v && v.length <= 30) || "O Nome deve ter menos de 30 caracteres",
        (v) => (v && v.length >= 4) || "O Nome deve ter mais de 4 caracteres",
        (v) => /^[a-zA-Z ]*$/.test(v) || "O Nome deve conter apenas letras",
        (v) => !/\s{2,}/.test(v) || "O Nome não pode conter espaços duplos",
      ],
      categoryRules: [
        (v) => !!v || "A Categoria é obrigatória",
        (v) => v.length > 0 || "Selecione pelo menos uma categoria",
      ],
      descRules: [
        (v) => !!v || "A Descrição é obrigatória",
        (v) =>
          (v && v.length <= 100) ||
          "A Descrição deve ter menos de 100 caracteres",
        (v) =>
          (v && v.length >= 5) || "A Descrição deve ter mais de 5 caracteres",
        (v) =>
          /^[a-zA-Z ]*$/.test(v) || "A Descrição deve conter apenas letras",
        (v) =>
          !/\s{2,}/.test(v) || "A Descrição não pode conter espaços duplos",
      ],
    };
  },
  methods: {
    editCard() {
      if (this.valid) {
        this.$emit("edit-card", {
          name: this.formData.name,
          category: this.formData.category,
          description: this.formData.desc,
          image: this.formData.image,
          valor: this.formData.valor,
        });
      }
    },
  },
  created() {
    CategoriaDataService.getAll().then((response) => {
      this.categories = response.data;
    });
    this.formData = {
      name: this.name,
      category: [],
      desc: this.desc,
      image: this.image,
      valor: this.valor,
    };
  },
};
</script>
