<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="matricula">Matrícula:</label>
        <input type="text" id="matricula" v-model="matricula" required />
      </div>
      <div class="form-group">
        <label for="senha">Senha:</label>
        <input type="password" id="senha" v-model="senha" required />
      </div>
      <button type="submit">Entrar</button>
    </form>
    <div v-if="mensagemErro" class="erro">{{ mensagemErro }}</div>
  </div>
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
    };
  },
  methods: {
    async login() {
      try {
        // Chamada ao backend para autenticação do usuário
        UsersDataService.get(this.matricula).then((response) => {
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
            this.mensagemErro = "Senha incorreta";
          }
        });
      } catch (error) {
        console.error(error);
        // Tratar erros de comunicação com o backend
        this.mensagemErro = "Erro ao conectar ao servidor";
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
