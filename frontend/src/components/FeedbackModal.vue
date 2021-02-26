<template lang="pug">
Modal(color="primary", v-model="isOpen", :title="$t('feedback-title')")
  template(v-slot:footer="{ close }")
    v-btn(color="grey", dark, @click="close") {{ $t('close') }}
    v-spacer
    v-btn(color="success", dark, @click="confirmar") {{ $t('submit') }}
</template>

<i18n>
{
  "en": {
    "feedback-title": "We <3 feedback",
    "close": "Close",
    "submit": "Submit"
  },
  "pt-BR": {
    "feedback-title": "Nós amamos um feedback",
    "close": "Fechar",
    "submit": "Enviar"
  }
}
</i18n>

<script lang="ts">
import { Vue, Component, Model } from "vue-property-decorator";
import Modal from "./Modal.vue";

@Component({
  components: {
    Modal
  }
})
export default class FeedbackModal extends Vue {
  @Model("change", { type: Boolean }) readonly value!: boolean;
  get isOpen() {
    return this.value;
  }
  set isOpen(value: boolean) {
    this.$emit("change", value);
  }
}
</script>
