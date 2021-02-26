<template lang="pug">
Modal(color="primary", v-model="isOpen", :title="$t('feedback-title')")
  template(v-slot:footer="{ close }")
    v-btn(color="grey", dark, @click="close") {{ $t('close') }}
    v-spacer
    v-btn(color="success", dark, @click="submit") {{ $t('submit') }}
  v-form(ref="form", @submit="submit", :action="action", method="POST")
    v-container
      v-row
        v-col(cols=12)
          v-text-field(
            v-model="email",
            :rules="rules.email",
            :label="$t('e-mail')",
            required
          )
        v-col(cols=12)
          v-textarea(
            v-model="message",
            :rules="rules.message",
            :label="$t('message')",
            required
          )
</template>

<i18n>
{
  "en": {
    "feedback-title": "We <3 feedback",
    "e-mail": "E-mail",
    "message": "Mensage",
    "rules": {
        "email": {
            "required": "E-mail is required",
            "valid": "E-mail must be valid"
        },
        "message": {
            "required": "Message is required"
        }
    },
    "close": "Close",
    "submit": "Submit"
  },
  "pt-BR": {
    "feedback-title": "Nós amamos um feedback",
    "e-mail": "E-mail",
    "message": "Mensagem",
    "rules": {
        "email": {
            "required": "E-mail obrigatório",
            "valid": "Insira um e-mail válido"
        },
        "message": {
            "required": "Insira uma mensagem"
        }
    },
    "close": "Fechar",
    "submit": "Enviar"
  }
}
</i18n>

<script lang="ts">
import { Vue, Component, Model, Ref } from "vue-property-decorator";
import Modal from "./Modal.vue";
import AbstractService from "../services/AbstractService";

@Component({
  components: {
    Modal,
  },
})
export default class FeedbackModal extends Vue {
  @Model("change", { type: Boolean }) readonly value!: boolean;
  get isOpen() {
    return this.value;
  }
  set isOpen(value: boolean) {
    this.$emit("change", value);
  }

  @Ref("form") vForm!: Vue;

  action: string = process.env.VUE_APP_FEEDBACKFORM_URL || "/feedback/";

  rules = {
    email: [
      (v:any) => !!v || (this as any).$t("rules.email.required"),
      (v:any) => /.+@.+/.test(v) || (this as any).$t("rules.email.valid"),
    ],
    message: [(v:any) => !!v || (this as any).$t("rules.message.required")],
  };

  email = "";
  message = "";

  async submit(event?: Event | MouseEvent) {
    event?.preventDefault();
    console.log(event);
    console.log("Valid form: ", (this.vForm as any).validate());
    AbstractService.post("feedback", {
      email: this.email,
      message: this.message,
    }).then((result) => console.log(result));

    (this.vForm.$el as HTMLFormElement).submit();
  }
}
</script>
