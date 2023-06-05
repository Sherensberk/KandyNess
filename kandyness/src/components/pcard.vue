<template>
  <v-card class="mx-auto my-12" max-width="250">
    <!-- Usar o require para srcs, passando o path em uma template string e o nome do arquivo em uma variável -->
    <v-img class="overflow-visible" height="200" :src="getImageUrl(picture)">
      <v-btn
        v-if="owner"
        class="mt-n4 mr-n9"
        v-on:click="deleteCard(name)"
        fab
        dark
        x-small
        color="red"
        absolute
        right
      >
        <v-icon dark> mdi-delete </v-icon>
      </v-btn>
      <v-btn
        v-if="owner"
        class="mt-n4 mr-0"
        fab
        dark
        x-small
        color="blue"
        absolute
        right
      >
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
      <div class="my-4 text-subtitle-1">
        {{ category.map((objeto) => objeto.nome).join(" ,") }}
      </div>
      <div>
        <span> {{ desc }} </span>
      </div>
      <div class="ms-auto mt-4">
        <v-chip class="ma-0" dark>
          <span>R$ {{ valor.toFixed(2) }}</span>
        </v-chip>
      </div>
      <PForm
        :name="name"
        :desc="desc"
        :image="picture.split('/').pop()"
        :category="category"
        :edit="edit"
        :valor="valor"
        @edit-card="editCard($event)"
      ></PForm>
      <!--Fim do modal-->
    </v-card-text>
    <v-btn
      v-if="!owner"
      class="mt-n4"
      fab
      dark
      x-small
      color="green"
      absolute
      right
      @click="adicionarAoCarrinho(product)"
    >
      <v-icon dark>mdi-cart-plus</v-icon>
    </v-btn>
  </v-card>
</template>
<script>
import PForm from "@/components/pform.vue";
import { mapActions } from "vuex";
export default {
  name: "pcard",
  components: {
    PForm,
  },
  props: {
    name: {
      type: String,
      default: () => "Nome do produto",
    },
    desc: {
      type: String,
      default: () => "Descrição do produto",
    },
    picture: {
      type: String,
      default: () => "https://picsum.photos/200/300",
    },
    category: {
      type: Array,
      default: () => ["A", "B", "C"],
    },
    image: {
      type: String,
      default: () => "https://picsum.photos/200/300",
    },
    valor: {
      type: Number,
      default: () => 0,
    },
    owner: {
      type: Boolean,
      default: () => false,
    },
  },
  data: () => ({
    valid: false,
    edit: false,
  }),
  methods: {
    ...mapActions({
      removerItem: "removerItem",
      adicionarAoCarrinho: "adicionarAoCarrinho",
    }),
    getImageUrl(img) {
      try {
        return require(`@/assets/lojas/${img}`);
      } catch (e) {
        return require(`@/assets/error.png`);
      }
    },
    deleteCard: function (product) {
      this.$emit("delete-card", product);
    },
    editCard: function (value) {
      value.id = this.name;
      value.cat_id = this.category;
      this.$emit("edit-card", value);
      this.edit = !this.edit;
    },
    openModal: function () {
      this.edit = !this.edit;
    },
  },
  created() {
    this.product = {
      name: this.name,
      category: [],
      desc: this.desc,
      image: this.getImageUrl(this.picture),
      valor: this.valor,
    };
  },
};
</script>
