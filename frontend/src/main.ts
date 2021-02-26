import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import i18n from "./i18n";
import moment from "moment-timezone";

moment.tz.setDefault(process.env.VUE_APP_TIMEZONE || "-3");

switch (process.env.NODE_ENV) {
  case "local":
  case "docker":
  case "development":
    Vue.config.productionTip = false;
    Vue.config.devtools = true;
    Vue.config.performance = true;
    Vue.config.silent = false;
    break;
  default:
    Vue.config.productionTip = false;
    Vue.config.devtools = false;
    Vue.config.performance = false;
    Vue.config.silent = true;
    break;
}

Vue.use(require("vue-moment"), { moment });

new Vue({
  name: process.env.VUE_APP_TITLE,
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount("#app");
