<template lang="pug">
v-app(:dark="darkMode")
  v-app-bar(app, color="primary", dark)
    v-app-bar-nav-icon(@click="drawer = !drawer")
    v-toolbar-title {{ title }}
    v-spacer

    v-btn(@click="showFeedbackmodal = true", text)
      span.mr-2 {{ $t('feedback') }}
      v-icon mdi-open-in-new
      FeedbackModal(v-if="showFeedbackmodal", v-model="showFeedbackmodal")

  v-main(:dark="darkMode")
    router-view
</template>

<i18n>
{
  "pt-BR": {
    "feedback": "Envie um comentário"
  },
  "en": {
    "feedback": "Got Feedback?"
  }
}
</i18n>

<script lang="ts">
import { Component, Vue, ProvideReactive, Watch } from "vue-property-decorator";
import FeedbackModal from "./components/FeedbackModal.vue";
import { LocalStorage } from "./plugins";
const darkMode: boolean =
  LocalStorage.getItem("dark-mode") ||
  window.matchMedia("(prefers-color-scheme: dark)").matches ||
  false;
const habilitarDarkMode: boolean =
  process.env.VUE_APP_DARK_MODE_ON === "true" ? true : false;
const drawer = LocalStorage.getItem("menu-drawer");

@Component({
  components: {
    FeedbackModal,
  },
})
export default class App extends Vue {
  title: string = process.env.VUE_APP_TITLE || "Picha!";
  showFeedbackmodal = false;
  drawer: boolean = typeof drawer !== "undefined" ? drawer : true;
  @ProvideReactive("darkMode") darkMode: boolean = habilitarDarkMode
    ? darkMode
    : false;

  @Watch("darkMode")
  onDarkModeChanged(value: boolean) {
    if (value) {
      this.$root.$el.classList.remove("theme--light");
      this.$root.$el.classList.add("theme--dark");
      document.bgColor = "#121212";
    } else {
      this.$root.$el.classList.remove("theme--dark");
      this.$root.$el.classList.add("theme--light");
      document.bgColor = "";
    }
    LocalStorage.setItem("dark-mode", value);
  }

  @Watch("drawer")
  onDrawerChanged(value: boolean) {
    LocalStorage.setItem("menu-drawer", value);
  }

  mounted() {
    this.onDarkModeChanged(this.darkMode);
  }
}
</script>
