<template>
  <v-card class="mx-auto my-12" max-width="250">
    <!-- Usar o require para srcs, passando o path em uma template string e o nome do arquivo em uma variável -->
    <v-img class="overflow-visible" height="200" :src="picture">
      <v-btn
        class="mt-n4 mr-n9"
        v-on:click="deleteCard"
        fab
        dark
        x-small
        color="red"
        absolute
        right
      >
        <v-icon dark> mdi-delete </v-icon>
      </v-btn>
      <v-btn class="mt-n4 mr-0" fab dark x-small color="blue" absolute right>
        <v-icon dark v-on:click="openModal"> mdi-pencil </v-icon>
      </v-btn>
    </v-img>

    <v-card-title>{{ name }}</v-card-title>

    <v-card-text>
      <v-row align="center" class="mx-0">
        <v-rating
          :value="4.5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ms-4">4.5 (413)</div>
      </v-row>
      <!--inicio do modal-->
      <dialog :id="id">
        <v-form @submit.prevent v-model="valid">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  :id="nameInput"
                  label="Nome do produto"
                  :rules="nameRules"
                  required="true"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  label="Categoria do produto"
                  :id="catInput"
                  :rules="categoryRules"
                  required="true"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Descrição do produto*"
                  :id="descInput"
                  :rules="descRules"
                  required="true"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field :id="imgInput" label="Imagem do produto">
                </v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <div class="text-center">
          <v-btn
            type="submit"
            v-on:click="editCard"
            color="blue"
            elevation="2"
            width="120"
            ><span style="color: white">Salvar</span></v-btn
          >
        </div>
      </dialog>
      <!--Fim do modal-->
      <div class="my-4 text-subtitle-1">{{ category }}</div>
      <div>
        <span> {{ desc }} </span>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: "pcard",
  props: {
    name: String,
    desc: String,
    picture: String,
    category: String,
    id: String,
    nameInput: String,
    catInput: String,
    descInput: String,
    imgInput: String,
  },
  data: () => ({
    valid: false,
    nameRules: [
      (v) => !!v || "O Nome é obrigatório",
      (v) => (v && v.length <= 30) || "O Nome deve ter menos de 30 caracteres",
      (v) => (v && v.length >= 5) || "O Nome deve ter mais de 5 caracteres",
      (v) => /^[a-zA-Z ]*$/.test(v) || "O Nome deve conter apenas letras",
      (v) => !/\s{2,}/.test(v) || "O Nome não pode conter espaços duplos",
    ],
    categoryRules: [
      (v) => !!v || "A Categoria é obrigatória",
      (v) =>
        (v && v.length <= 30) || "A Categoria deve ter menos de 30 caracteres",
      (v) =>
        (v && v.length >= 5) || "A Categoria deve ter mais de 5 caracteres",
      (v) => /^[a-zA-Z ]*$/.test(v) || "A Categoria deve conter apenas letras",
      (v) => !/\s{2,}/.test(v) || "A Categoria não pode conter espaços duplos",
    ],
    descRules: [
      (v) => !!v || "A Descrição é obrigatória",
      (v) =>
        (v && v.length <= 30) || "A Descrição deve ter menos de 30 caracteres",
      (v) =>
        (v && v.length >= 5) || "A Descrição deve ter mais de 5 caracteres",
      (v) => /^[a-zA-Z ]*$/.test(v) || "A Descrição deve conter apenas letras",
      (v) => !/\s{2,}/.test(v) || "A Descrição não pode conter espaços duplos",
    ],
  }),
  methods: {
    deleteCard: function () {
      this.$emit("delete-card", this.index);
    },
    editCard: function () {
      if (this.valid) {
        this.$emit("edit-card", this.index);
      } else {
        alert("Preencha os campos corretamente");
      }
      // this.$emit("edit-card", this.index);
    },
    openModal: function () {
      let modal = document.getElementById(this.id);
      modal.showModal();
    },
  },
};
</script>
