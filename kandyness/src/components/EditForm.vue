<template>
  <v-dialog v-model="dialog" persistent max-width="290">
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
        <form action="/" method="GET">
          <div>
            <v-text-field
              color="#9c27b0"
              label="Nome do produto"
              hide-details="auto"
            ></v-text-field>
          </div>
          <div>
            <v-select
              v-model="selectedItem"
              :items="items"
              label="Categoria do produto"
              color="#9c27b0"
              hide-details="auto"
            ></v-select>
          </div>
          <div>
            <v-text-field
              color="#9c27b0"
              label="Descrição do produto"
              hide-details="auto"
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
              @click="dialog = false"
            />
          </div>
          <div
            :id="errors"
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
  data: () => ({
    dialog: false,
  }),
};
</script>
