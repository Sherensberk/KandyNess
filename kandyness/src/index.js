import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    usuario: {},
    carrinho: [],
    lojas: [
      {
        id: 1,
        title: "Brigadeiro da Maria",
        img: "https://media.istockphoto.com/id/1130692246/photo/homemade-chocolate-brownies-shot-from-above.jpg?b=1&s=170667a&w=0&k=20&c=8U2istuVUS46qa7ivqRhwn2XHwIWwrxTvMbIS3OHR0k=",
        desc: "Doces e macios por dentro, com uma dose extra de carinho",
        tags: ["doces", "brigadeiro", "bolo"],
        price: "$",
        rating: 3.5,
        rating_votes: 45,
        times: ["10:15", "12:40"],
      },
      {
        id: 2,
        img: "https://www.sabornamesa.com.br/media/k2/items/cache/bd5b551e7d6b7885a6be84801d23aa11_XL.jpg",
        title: "Pé de Moleque Saboroso",
        desc: "Pé de moleque crocante e delicioso em várias opções de cobertura e recheio",
        tags: ["pé de moleque", "doces", "tradicional"],
        price: "$",
        rating: 4.0,
        rating_votes: 55,
        times: ["10:30", "15:00", "19:30"],
      },
      {
        id: 3,
        title: "Bolo Delícia",
        img: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-50773_12-39c611e.jpg?quality=90&resize=440,400",
        desc: "Bolos irresistíveis para todos os gostos e ocasiões para encomenda ou consumo imediato",
        tags: ["bolo", "doces", "sobremesas"],
        price: "$$",
        rating: 4.2,
        rating_votes: 68,
        times: ["09:00", "14:30", "18:45"],
      },
      {
        id: 4,
        title: "Bolo de Pote Delícia",
        img: "https://bolosparavender.com.br/wp-content/uploads/2021/05/recheios-cremosos-para-bolo-no-pote-1200x900.jpg",
        desc: "Bolos de pote deliciosos e práticos para saborear a qualquer momento",
        tags: ["bolo de pote", "doces", "sobremesas"],
        price: "$$",
        rating: 4.7,
        rating_votes: 120,
        times: ["11:30", "16:00", "20:00"],
      },
      {
        id: 5,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwXNVVCqiZKAWWGaRpzJaEA6zGa-NvKOvFIQ&usqp=CAU",
        title: "Bombom Gourmet",
        desc: "Bombons finos e requintados para apreciadores de chocolates",
        tags: ["bombom", "chocolates", "gourmet"],
        price: "$$$",
        rating: 4.3,
        rating_votes: 75,
        times: ["09:30", "13:00", "17:30"],
      },
      {
        id: 6,
        title: "Sorvete Refrescante",
        img: "https://www.papeldeparede.etc.br/fotos/wp-content/uploads/sorvete.jpg",
        desc: "Sorvetes cremosos e refrescantes para se deliciar em dias quentes",
        tags: ["sorvete", "gelados", "sobremesas"],
        price: "$",
        rating: 4.5,
        rating_votes: 90,
        times: ["10:30", "14:00", "18:00"],
      },
    ],
    produtos: [
      {
        name: "Cafe",
        desc: "Cafe de programador de java",
        picture:
          "https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG",
        category: ["Bebidas"],
      },
      {
        name: "Coxinha",
        desc: "Uma coxinha aonde o recheio possa talvez estar gelado",
        picture:
          "https://a-static.mlcdn.com.br/1500x1500/coxinha-de-frango-crossdog/crossdog/e6e95a5807f011ec87ac4201ac185013/17e319f6aafea2915fa2b2bf7e0a649a.jpeg",
        category: ["Salgados"],
      },
      {
        name: "Brownie",
        desc: "Brownie de chocolate velho de supermercado",
        picture: "https://images2.alphacoders.com/104/1040769.jpg",
        category: ["Doces"],
      },
    ],
  },
  getters: {
    getLojas: (state) => state.lojas,
    favLojas: (state) => state.lojas.slice(0, state.lojas.length / 2),
    getProdutos: (state) => state.produtos,
    getUsuario(state) {
      return state.usuario;
    },
    Dono(state) {
      return state.usuario.lojas;
    },
    getCarrinho(state) {
      return state.carrinho;
    },
    getTotalItens(state) {
      return state.carrinho.length;
    },
    getTotalItensPreco(state) {
      return state.carrinho.reduce((total, item) => {
        return total + item.valor;
      }, 0);
    },
  },
  mutations: {
    addLoja(state, loja) {
      state.lojas.push(loja);
    },
    editProduct(state, payload) {
      console.log("editProduct", payload);
      state.produtos[payload.index] = payload.value;
    },
    setUsuario(state, usuario) {
      state.usuario = usuario;
    },
    limparUsuario(state) {
      state.usuario = {};
      state.carrinho = [];
    },
    setLoja(state, lojas) {
      state.usuario.lojas = lojas;
    },
    adicionarAoCarrinho(state, item) {
      state.carrinho.push(item);
    },
    removerDoCarrinho(state, index) {
      const item = state.carrinho.indexOf(index);
      state.carrinho.splice(item, 1);
    },
  },
  actions: {
    addLoja({ commit }, loja) {
      commit("addLoja", loja);
    },
    editProduct({ commit }, payload) {
      // console.log(payload);
      commit("editProduct", payload);
    },
    setUsuario({ commit }, usuario) {
      commit("setUsuario", usuario);
    },
    limparUsuario({ commit }) {
      commit("limparUsuario");
    },
    setLoja({ commit }, lojas) {
      commit("setLoja", lojas);
    },
    adicionarAoCarrinho({ commit }, item) {
      commit("adicionarAoCarrinho", item);
    },
    removerDoCarrinho({ commit }, index) {
      commit("removerDoCarrinho", index);
    },
  },
  modules: {},
});
