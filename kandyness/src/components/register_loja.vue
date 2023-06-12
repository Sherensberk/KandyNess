<template>
  <v-dialog
    v-if="Object.keys(getUsuario).length > 0"
    v-model="dialogLocalValue"
    @input="updateDialogValue"
    max-width="600px"
    min-width="360px"
  >
    <div>
      <v-tabs
        show-arrows
        background-color="deep-purple accent-4"
        icons-and-text
        dark
        grow
      >
        <v-tabs-slider color="purple darken-4"></v-tabs-slider>
        <v-tab v-for="i in [0]" :key="i">
          <!-- <v-icon large>{{ i.icon }}</v-icon> -->
          <div class="caption py-3">Adicionar Loja</div>
        </v-tab>
        <v-tab-item>
          <v-card class="px-4">
            <v-card-text>
              <v-form ref="registerForm" v-model="valid" lazy-validation>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="nome"
                      :rules="[rules.required]"
                      label="Nome"
                      maxlength="20"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="descricao"
                      :rules="[rules.min]"
                      label="Descrição"
                      maxlength="500"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <div class="image-input">
                      <v-file-input
                        v-model="imageUrl"
                        :rules="[(v) => !!v || 'Imagem é obrigatória']"
                        label="Imagem"
                        required
                        accept="image/*"
                      ></v-file-input>
                    </div>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
                    <v-btn
                      x-large
                      block
                      :disabled="!valid"
                      color="success"
                      @click="register"
                      >Registrar</v-btn
                    >
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </div>
  </v-dialog>
</template>

<script>
import LojasDataService from "@/services/LojasDataService";
import { mapGetters } from "vuex";

export default {
  name: "register_loja",
  props: ["dialogValue"],
  data() {
    return {
      dialogLocalValue: this.dialogValue,
      nome: "",
      descricao: "",
      imageUrl: "",
      valid: false,
      verify: "",
      rules: {
        required: (value) => !!value || "Obrigatório.",
        min: (v) => (v && v.length >= 8) || "Minimo de 8 characters",
      },
    };
  },
  computed: {
    ...mapGetters(["getUsuario"]),
  },
  watch: {
    dialogValue(newValue) {
      this.dialogLocalValue = newValue;
    },
  },
  methods: {
    updateDialogValue() {
      this.$emit("update:dialogValue", this.dialogLocalValue);
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    register() {
      if (this.$refs.registerForm.validate()) {
        LojasDataService.create({
          nome: this.nome,
          descricao: this.descricao,
          image: this.imageUrl.name,
          dono: this.getUsuario.matricula,
        }).then((response) => {
          console.log(response.data);
          //   this.$emit("close");
        });
      }
    },
  },
};
</script>
<style>
.header {
  background-color: hsl(291, 64%, 42%);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  color: white;
  font-size: 20px;
}

.image-input {
  margin-top: 10px;
}

.image-input__preview {
  margin-top: 10px;
  width: 200px;
  height: 200px;
  border: 1px solid #e0e0e0;
  overflow: hidden;
}

.image-input__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.text-center {
  margin-top: 20px;
}
</style>
