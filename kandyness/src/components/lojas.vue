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
        <router-link
          :to="{ name: 'loja', params: { loja: n.nome } }"
          class="card-link"
        >
          <CardLg
            class="mr-3"
            :title="n.nome"
            :desc="n.descricao"
            :img="`${n.image}`"
            :price="getRandomItem(['$', '$$', '$$$'])"
            :rating="getRandomItem([1, 2.5, 3.2, 4.6, 4.3, 5])"
            :rating_votes="getRandomItem([23, 45, 67, 89, 101])"
            :times="
              getRandomItem([
                ['10:00', '22:00'],
                ['12:20', '13:32'],
                ['08:00', '18:00'],
                ['09:00', '20:00'],
                ['10:00', '22:00'],
              ])
            "
          />
        </router-link>
      </div>
    </v-slide-group>
  </v-sheet>
</template>

<script>
import CardLg from "@/components/card_lg.vue";
import LojasDataService from "@/services/LojasDataService";
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
    getRandomItem(array) {
      if (array.length === 0) {
        return null;
      }

      const randomIndex = Math.floor(Math.random() * array.length);
      return array[randomIndex];
    },
    retrieveLojas() {
      LojasDataService.getAll()
        .then((response) => {
          this.lojas = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    group(key) {
      if (key == "Novas") {
        return this.lojas || [];
      }
      return this.favLojas;
    },
  },
  mounted() {
    this.retrieveLojas();
  },
  data: () => ({
    slides: ["First", "Second", "Third", "Fourth", "Fifth"],
    topics: [{ name: "Novas" }, { name: "Favoritos" }],
    model: null,
    lojas: [],
  }),
};
</script>
<style scoped>
.card-link {
  text-decoration: none;
}
</style>
