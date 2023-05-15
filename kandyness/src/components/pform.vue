<template>
  <v-form @submit.prevent :id="id" v-if="edit" v-model="valid">
    <v-row>
      <v-col cols="12">
        <v-text-field
          :value="name"
          v-model="Name"
          label="Nome do produto"
          :rules="nameRules"
          required
        ></v-text-field>
      </v-col>

      <v-col cols="12">
        <v-select
          :value="category"
          v-model="Category"
          multiple
          label="Categoria do produto"
          :items="categories.concat(category)"
          :rules="categoryRules"
          required
        ></v-select>
      </v-col>

      <v-col cols="12">
        <v-text-field
          value="desc"
          v-model="Description"
          label="Descrição do produto"
          :rules="descRules"
          required
        ></v-text-field>
      </v-col>

      <v-col cols="12">
        <v-text-field :value="image" label="Imagem do produto"></v-text-field>
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
export default {
  name: "PForm",
  props: {
    name: String,
    desc: String,
    image: String,
    category: Array,
    id: String,
    edit: Boolean,
  },
  data() {
    return {
      Name: "",
      Category: [],
      Description: "",
      Image: "",
      valid: false,
      categories: ["Bebidas", "Doces", "Salgados", "Outros"],
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
      console.log(this.Name);
      if (this.valid) {
        // Form is valid, emit an event or perform the necessary actions
        // For example, you can emit an event like this:
        this.$emit("edit-card", {
          name: this.Name,
          category: this.Category,
          description: this.Description,
          image: this.image,
        });
      }
    },
  },
};
</script>
