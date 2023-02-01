import Vue from "vue";
import App from "./App.vue";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import VueSanitize from "vue-sanitize";
import store from "./store";

Vue.config.productionTip = false;

Vue.use(VueSweetalert2);
Vue.use(VueSanitize, VueSanitize.defaults);
new Vue({
  store,
  el: "#app",
  render: (h) => h(App),
});
