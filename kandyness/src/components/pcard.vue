<template>
  <v-card class="mx-auto my-12" max-width="250">
    <!-- Usar o require para srcs, passando o path em uma template string e o nome do arquivo em uma variável -->
    <v-img
      class="overflow-visible"
      height="200"
      :src="require(`@/assets/Images/${picture}`)"
    >
      <v-btn class="mt-n2 mr-n7" fab dark x-small color="purple" absolute right>
        <v-icon dark> mdi-delete </v-icon>
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
  },
  data: () => ({}),
};
</script>
