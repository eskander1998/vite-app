import Vuex from "vuex";
import Vue from "vue";
import comments from "./comments";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    comments,
  },
});
