<template>
  <v-dialog v-model="dialog" persistent max-width="290" @input="load">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="mt-n4 mr-0"
        fab
        dark
        x-small
        color="blue"
        absolute
        right
        v-bind="attrs"
        v-on="on"
      >
        <v-icon dark> mdi-pencil </v-icon>
      </v-btn>
    </template>
    <div style="background-color: white">
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
        <span style="color: white; font-size: 20px">Editar produto</span>
      </div>
      <div
        style="
          display: flex;

          flex-direction: column;
          padding: 5px;
          gap: 10px;
        "
      >
        <form :id="editForm" action="/" method="GET">
          <div>
            <v-text-field
              color="#9c27b0"
              label="Nome do produto"
              hide-details="auto"
              :id="editName"
            ></v-text-field>
          </div>
          <div>
            <v-select
              v-model="selectedItem"
              :items="items"
              label="Categoria do produto"
              color="#9c27b0"
              hide-details="auto"
              :id="editCat"
            ></v-select>
          </div>
          <div>
            <v-text-field
              color="#9c27b0"
              label="Descrição do produto"
              hide-details="auto"
              :id="editDesc"
            ></v-text-field>
          </div>
          <div>
            <v-text-field
              color="#9c27b0"
              label="Imagem do produto"
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
              type="submit"
              value="Salvar"
              :id="saveEdit"
            />
          </div>
          <div
            :id="errorDiv"
            style="
              margin-top: 90px;
              margin-bottom: 48px;
              color: red;
              width: 250px;
              font-size: 15px;
              background-color: white;
            "
          ></div>
        </form>
      </div>
    </div>
  </v-dialog>
</template>

<script>
export default {
  name: "EditForm",
  props: {
    editForm: String,
    editName: String,
    editCat: String,
    editDesc: String,
    saveEdit: String,
    errorDiv: String,
  },
  data: () => ({
    dialog: false,
    items: ["Salgados", "Doces", "Bebidas", "Frutas", "Verduras"],
    selectedItem: null,
  }),
  methods: {
    load: function () {
      setTimeout(this.formValidation, 50); //lol kkkkkk
    },
    formValidation: function () {
      console.log(document.getElementById(this.editForm));
      const form = document.getElementById(this.editForm);
      const pName = document.getElementById(this.editName);
      const pDesc = document.getElementById(this.editDesc);
      const errorMessages = document.getElementById(this.errorDiv);
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
