<template>
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
      <form id="addCardForm" action="/" method="GET">
        <div>
          <v-text-field
            color="#9c27b0"
            label="Nome do produto"
            hide-details="auto"
            id="nomeProduto"
          ></v-text-field>
        </div>
        <div>
          <v-select
            v-model="selectedItem"
            :items="items"
            label="Categoria do produto"
            color="#9c27b0"
            hide-details="auto"
            id="categoriaProduto"
          ></v-select>
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
          <input
            style="
              width: 100px;
              margin-top: 20px;
              background-color: #9c27b0;
              color: white;
            "
            id="addProduto"
            type="submit"
            value="Adicionar"
          />
        </div>
      </form>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "AddForm",
  data: () => ({
    items: ["Salgados", "Doces", "Bebidas", "Frutas", "Verduras"],
    selectedItem: null,
  }),
  mounted() {
    this.formValidation();
  },
  methods: {
    formValidation: function () {
      const form = document.getElementById("addCardForm");
      const pName = document.getElementById("nomeProduto");
      const pDesc = document.getElementById("descProduto");
      const errorMessages = document.getElementById("errorMessages");
      form.addEventListener("submit", (e) => {
        let nameRegex = /[0-9!@#$%^&*()_+=[\]{};':",./<>?\\|`~\-]/g; //eslint-disable-line
        let descRegex = /[^\w\s]/g; //eslint-disable-line
        errorMessages.innerHTML = "";
        let errors = [];
        if (pName.value.length < 3) {
          errors.push("O nome precisa ter pelo menos 3 caracteres!");
        }
        if (nameRegex.test(pName.value)) {
          errors.push("O nome só pode conter letras!");
        }
        if (this.selectedItem == null) {
          errors.push("Selecione a categoria do produto!");
        }
        if (pDesc.value.length < 10) {
          errors.push("A descrição precisa conter pelo menos 10 Caracteres!");
        }
        if (descRegex.test(pDesc.value)) {
          errors.push("A descrição não pode conter caracteres especiais!");
        }
        if (errors.length > 0) {
          e.preventDefault();
          errors.forEach(
            (item) => (errorMessages.innerHTML += "- " + item + "<br>")
          );
        }
      });
    },
  },
};
</script>
