<template>
  <v-card class="mx-auto my-12" max-width="250" min-width="250">
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
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                :id="nameInput"
                label="Nome do produto"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                label="Categoria do produto"
                :id="catInput"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Descrição do produto*"
                :id="descInput"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field :id="imgInput" label="Imagem do produto">
              </v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <div class="text-center">
          <v-btn v-on:click="editCard" color="blue" elevation="2" width="120"
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
  data: () => ({}),
  methods: {
    deleteCard: function () {
      this.$emit("delete-card", this.index);
    },
    editCard: function () {
      this.$emit("edit-card", this.index);
    },
    openModal: function () {
      let modal = document.getElementById(this.id);
      modal.showModal();
    },
  },
};
</script>
