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
        align-items: center;
        flex-direction: column;
        padding: 10px;
        gap: 10px;
      "
    >
      <input type="text" placeholder="Nome do produto" />
      <input type="text" placeholder="Tipo de produto" />
      <input type="text" placeholder="Descrição do produto" />
    </div>
  </v-card>
</template>
<script>
export default {
  name: "addcard",
  data: () => ({}),
};
</script>
