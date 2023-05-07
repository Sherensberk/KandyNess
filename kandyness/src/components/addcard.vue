<template>
  <v-card class="mx-auto my-12" max-width="250" min-width="250">
    <!-- Usar o require para srcs, passando o path em uma template string e o nome do arquivo em uma variável -->
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
      <div>
        <v-text-field
          color="#9c27b0"
          label="Nome do produto"
          hide-details="auto"
        ></v-text-field>
      </div>
      <div>
        <v-text-field
          color="#9c27b0"
          label="Categoria do produto"
          hide-details="auto"
        ></v-text-field>
      </div>
      <div>
        <v-text-field
          color="#9c27b0"
          label="Descrição do produto"
          hide-details="auto"
        ></v-text-field>
      </div>
      <div style="margin-top: 18px">
        <v-file-input
          color="#9c27b0"
          dense
          accept="image/*"
          label="Imagem do produto"
        ></v-file-input>
      </div>
      <v-spacer></v-spacer>
      <div class="text-center">
        <v-btn color="#9c27b0" elevation="2" width="120"
          ><span style="color: white">Adicionar</span></v-btn
        >
      </div>
    </div>
  </v-card>
</template>
<script>
export default {
  name: "addcard",
  data: () => ({}),
};
</script>
