<template>
  <div class="login mt-6">
    <!-- <h2>Login</h2> -->
    <!-- <form @submit.prevent="login">
      <div class="form-group">
        <label for="matricula">Matrícula:</label>
        <input type="text" id="matricula" v-model="matricula" required />
      </div>
      <div class="form-group">
        <label for="senha">Senha:</label>
        <input type="password" id="senha" v-model="senha" required />
      </div>
      <button type="submit">Entrar</button>
    </form> -->
    <div v-if="mensagemErro" class="erro">{{ mensagemErro }}</div>
    <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px">
      <div>
        <v-tabs
          v-model="tab"
          show-arrows
          background-color="deep-purple accent-4"
          icons-and-text
          dark
          grow
        >
          <v-tabs-slider color="purple darken-4"></v-tabs-slider>
          <v-tab v-for="i in tabs" :key="i">
            <v-icon large>{{ i.icon }}</v-icon>
            <div class="caption py-1">{{ i.name }}</div>
          </v-tab>
          <v-tab-item>
            <v-card class="px-4">
              <v-card-text>
                <v-form ref="loginForm" v-model="valid" lazy-validation>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="matricula"
                        :rules="[rules.limit, rules.required]"
                        label="Matricula"
                        required
                        type="number"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="senha"
                        :append-icon="show1 ? 'eye' : 'eye-off'"
                        :rules="[rules.required]"
                        :type="show1 ? 'text' : 'password'"
                        name="input-10-1"
                        label="Senha"
                        counter
                        @click:append="show1 = !show1"
                      ></v-text-field>
                    </v-col>
                    <v-col class="d-flex" cols="12" sm="6" xsm="12"> </v-col>
                    <v-spacer></v-spacer>
                    <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                      <v-btn
                        x-large
                        block
                        :disabled="!valid"
                        color="success"
                        @click="login"
                      >
                        Login
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-card>
          </v-tab-item>
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
                        v-model="cpf"
                        :rules="[rules.cpf_V]"
                        label="CPF"
                        maxlength="11"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="matricula"
                        :rules="[rules.required, rules.limit]"
                        label="Matricula"
                        required
                        type="number"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="password"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, rules.min]"
                        :type="show1 ? 'text' : 'password'"
                        name="input-10-1"
                        label="Senha"
                        counter
                        @click:append="show1 = !show1"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        block
                        v-model="verify"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, passwordMatch]"
                        :type="show1 ? 'text' : 'Senha'"
                        name="input-10-1"
                        label="Confirme a senha"
                        counter
                        @click:append="show1 = !show1"
                      ></v-text-field>
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
  </div>

  <!-- <div id="app"> -->
  <!-- <v-app> -->

  <!-- </v-app> -->
  <!-- </div> -->
</template>

<script>
import UsersDataService from "@/services/UsersDataService";
import LojasDataService from "@/services/LojasDataService";
export default {
  data() {
    return {
      matricula: "",
      senha: "",
      mensagemErro: "",
      dialog: true,
      tab: 0,
      tabs: [
        { name: "Login", icon: "mdi-account" },
        { name: "Registrar", icon: "mdi-account-outline" },
      ],
      valid: true,

      nome: "",
      lastName: "",
      email: "",
      password: "",
      verify: "",
      show1: false,
      rules: {
        required: (value) => !!value || "Obrigatório.",
        min: (v) => (v && v.length >= 8) || "Minimo de 8 characters",
        limit: (v) => (v && v.length == 8) || "8 Caracteres",
        cpf_V: (cpf) => {
          cpf = cpf.replace(/[^\d]/g, "");
          if (
            cpf.length !== 11 ||
            cpf == "00000000000" ||
            cpf == "11111111111" ||
            cpf == "22222222222" ||
            cpf == "33333333333" ||
            cpf == "44444444444" ||
            cpf == "55555555555" ||
            cpf == "66666666666" ||
            cpf == "77777777777" ||
            cpf == "88888888888" ||
            cpf == "99999999999"
          ) {
            return "CPF Inválido";
          }

          const numbers = cpf.split("").map(Number);
          const [a, b, c, d, e, f, g, h, i, j, k] = numbers;

          const sum1 =
            (a * 10 +
              b * 9 +
              c * 8 +
              d * 7 +
              e * 6 +
              f * 5 +
              g * 4 +
              h * 3 +
              i * 2) %
            11;
          const dv1 = sum1 < 2 ? 0 : 11 - sum1;

          if (j !== dv1) {
            return "CPF Inválido";
          }

          const sum2 =
            (a * 11 +
              b * 10 +
              c * 9 +
              d * 8 +
              e * 7 +
              f * 6 +
              g * 5 +
              h * 4 +
              i * 3 +
              j * 2) %
            11;
          const dv2 = sum2 < 2 ? 0 : 11 - sum2;

          return k === dv2 || "CPF Inválido";
        },
      },
    };
  },
  computed: {
    passwordMatch() {
      return () => this.password === this.verify || "Password must match";
    },
  },
  methods: {
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    async register() {
      if (this.$refs.registerForm.validate()) {
        UsersDataService.create({
          matricula: this.matricula,
          nome: this.nome,
          cpf: this.cpf,
          senha: this.password,
        }).then((response) => {
          console.log(response.data);
          this.tab = 0;
        });
      }
    },
    async login() {
      if (this.$refs.loginForm.validate()) {
        try {
          // Chamada ao backend para autenticação do usuário
          UsersDataService.get(this.matricula)
            .then((response) => {
              console.log(response.data);
              if (response.data.senha == this.senha) {
                this.$store.commit("setUsuario", response.data);
                LojasDataService.byUserID(response.data.matricula).then(
                  (response) => {
                    if (response.data.length > 0)
                      this.$store.commit("setLoja", response.data);
                  }
                );

                this.$router.push("/lojas");
              } else {
                this.mensagemErro = "Usuario ou senha incorretos";
              }
            })
            .catch(() => {
              this.mensagemErro = "Usuario ou senha incorretos";
            });
        } catch (error) {
          this.mensagemErro = "Erro ao conectar ao servidor";
        }
      }
    },
  },
};
</script>

<style scoped>
.login {
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
}

.login h2 {
  text-align: center;
}

.form-group {
  margin-bottom: 10px;
}

label {
  display: block;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 5px;
}

button[type="submit"] {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
}

.erro {
  color: red;
  margin-top: 10px;
  text-align: center;
}
</style>
