<template>
  <div>
    <v-sheet
      class="text--white"
      color="purple"
      elevation="1"
      height="100"
      width="100%"
      style="display: flex; align-items: center"
      ><h1 style="font-size: 50px; color: white; margin-left: 16px">
        Exemplo de loja
      </h1></v-sheet
    >
    <div style="margin-left: 16px; margin-top: 50px">
      <span style="color: #9c27b0; font-size: 25px; font-weight: 350">
        Produtos
      </span>
    </div>
    <v-divider class="purple lighten-4"></v-divider>
    <div
      style="
        margin-left: 16px;
        display: grid;
        grid-template-columns: repeat(5, 250px);
        grid-column-gap: 50px;
        grid-row-gap: 0px;
        justify-content: center;
      "
    >
      <pcard></pcard>
      <pcard></pcard>
      <pcard></pcard>
      <pcard></pcard>
      <pcard></pcard>
      <pcard></pcard>
      <pcard></pcard>
      <pcard></pcard>
      <pcard></pcard>
      <pcard></pcard>
      <pcard></pcard>
      <pcard></pcard>
    </div>
  </div>
</template>

<script>
import pcard from "@/components/pcard";
export default {
  name: "myView",
  components: { pcard },
};
</script>
