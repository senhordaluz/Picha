import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import { Ripple } from "vuetify/lib/directives";
import pt from "vuetify/src/locale/pt";
import "@fortawesome/fontawesome-free/css/all.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "@mdi/font/css/materialdesignicons.css";

Vue.use(Vuetify, {
  directives: {
    Ripple
  }
});

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: "#039be5",
        secondary: "#424242",
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107"
      }
    }
  },
  lang: {
    locales: { pt },
    current: "pt"
  },
  icons: {
    iconfont: "md" // default - only for display purposes
  }
});
