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
      <div class="my-4 text-subtitle-1">{{ category.join(", ") }}</div>
      <div>
        <span> {{ desc }} </span>
      </div>
      <PForm
        :name="name"
        :desc="desc"
        :picture="picture"
        :category="category"
        :id="id"
        :edit="edit"
        @edit-card="editCard($event)"
      ></PForm>
      <!--Fim do modal-->
    </v-card-text>
  </v-card>
</template>
<script>
import PForm from "@/components/pform.vue";
export default {
  name: "pcard",
  components: {
    PForm,
  },
  props: {
    name: String,
    desc: String,
    picture: String,
    category: Array,
    id: String,
    nameInput: String,
    catInput: String,
    descInput: String,
    imgInput: String,
  },
  data: () => ({
    valid: false,
    edit: false,
  }),
  methods: {
    deleteCard: function () {
      this.$emit("delete-card", this.index);
    },
    editCard: function (value) {
      this.$emit("edit-card", { index: this.id, value: value });
      this.edit = !this.edit;
    },
    openModal: function () {
      this.edit = !this.edit;
    },
  },
};
</script>
