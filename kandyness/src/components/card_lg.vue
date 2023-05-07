<template>
  <v-card :loading="loading" class="mx-auto my-12" max-width="374">
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>
    <v-img height="250" :src="img"></v-img>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      <v-row align="center" class="mx-0">
        <v-rating
          :value="rating"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>
        <div class="grey--text ms-4">{{ rating }} ({{ rating_votes }})</div>
      </v-row>
      <div class="my-4 text-subtitle-1">{{ price }} • {{ tags }}</div>
      <div>
        {{ desc }}
      </div>
    </v-card-text>
    <v-divider class="mx-4"></v-divider>
    <v-card-title> Horários </v-card-title>

    <v-card-text>
      <v-chip-group
        v-model="selection"
        active-class="deep-purple accent-4 white--text"
        column
      >
        <v-chip v-for="tag in times" :key="tag.id">
          {{ tag }}
        </v-chip>
      </v-chip-group>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: "CardLg",
  data: () => ({
    selection: [],
    loading: false,
  }),
  props: {
    overline: String,
    title: String,
    desc: String,
    img: {
      type: String,
      default: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
    },
    link: String,
    button: String,
    tags: {
      type: String,
      default: "Italian, Cafe",
    },
    price: {
      type: String,
      default: "$$",
    },
    rating: {
      type: Number,
      default: 4.5,
    },
    rating_votes: {
      type: Number,
      default: 100,
    },
    times: {
      type: Array,
      default: () => ["09:20", "09:40"],
    },
  },
};
</script>
