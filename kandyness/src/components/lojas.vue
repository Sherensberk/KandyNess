<template>
  <v-sheet class="mx-auto" elevation="0" max-width="90%">
    <v-slide-group
      class="pa-4"
      center-active="true"
      mobile-breakpoint="1"
      show-arrows
      v-for="item in topics"
      :key="item.name"
    >
      <!-- topic title  -->
      <div class="text-h5 font-weight-bold mb-4" :key="item.name">
        {{ item.name }}
      </div>
      <div v-for="n in group(item.name)" :key="n.title">
        <CardLg
          class="mr-3"
          :title="n.title"
          :desc="n.desc"
          :img="n.img"
          :price="n.price"
          :rating="n.rating"
          :rating_votes="n.rating_votes"
          :tags="n.tags.join(', ')"
          :times="n.times"
        />
      </div>
    </v-slide-group>
  </v-sheet>
</template>

<script>
import CardLg from "@/components/card_lg.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    CardLg,
  },
  name: "PGLojas",
  computed: {
    ...mapGetters(["getLojas"]),
    ...mapGetters(["favLojas"]),
  },
  methods: {
    group(key) {
      if (key == "Novas") {
        return this.getLojas;
      }
      return this.favLojas;
    },
  },
  data: () => ({
    slides: ["First", "Second", "Third", "Fourth", "Fifth"],
    topics: [{ name: "Novas" }, { name: "Favoritos" }],
    model: null,
  }),
};
</script>
w
