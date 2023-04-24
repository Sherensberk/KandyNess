<template>
  <v-sheet class="mx-auto" elevation="0" max-width="90%">
    <v-slide-group
      v-model="model"
      class="pa-4"
      center-active="true"
      mobile-breakpoint="1"
      show-arrows
      v-for="item in topics"
      :key="item.name"
    >
      {{ item.name }}
      <v-slide-item
        v-for="n in item.cards"
        :key="n + item.cards"
        v-slot="{ active, toggle }"
      >
        <v-card
          :color="active ? 'primary' : 'grey lighten-1'"
          class="ma-4"
          height="200"
          width="200"
          @click="toggle"
        >
          <v-row class="fill-height" align="center" justify="center">
            <v-scale-transition>
              <v-icon
                v-if="active"
                color="white"
                size="48"
                v-text="'mdi-close-circle-outline'"
              ></v-icon>
            </v-scale-transition>
          </v-row>
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
</template>

<script>
export default {
  name: "PGLojas",
  data: () => ({
    slides: ["First", "Second", "Third", "Fourth", "Fifth"],
    topics: [
      { name: "Novas", cards: 5 },
      { name: "Favoritos", cards: 10 },
    ],
    model: null,
  }),
};
</script>
