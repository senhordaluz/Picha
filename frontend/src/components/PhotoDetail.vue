<template lang="pug">
Modal(color="primary", v-model="isOpen", :title="photo.checkWhiteSpace ? photo.title : $t('no-title')")
  span.text-center.text-body-1(v-html="photo.description")
</template>

<i18n>
{
  "en": {
    "no-title": "Untitled"
  },
  "pt-BR": {
    "no-title": "Sem título"
  }
}
</i18n>

<script lang="ts">
import { Vue, Component, Model, Prop } from "vue-property-decorator";
import { Photo } from "../models";
import Modal from "./Modal.vue";

@Component({
  components: {
    Modal,
  },
})
export default class PhotoDetail extends Vue {
  @Model("change", { type: Boolean }) readonly value!: boolean;
  get isOpen() {
    return this.value;
  }
  set isOpen(value: boolean) {
    this.$emit("change", value);
  }

  @Prop(Object) photo!: Photo;
}
</script>
