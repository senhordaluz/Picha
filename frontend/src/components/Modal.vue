<template lang="pug">
v-dialog(
  v-model="value",
  persistent,
  :fullscreen="fullscreen",
  :hide-overlay="fullscreen",
  :dark="darkMode",
  :max-width="maxWidth",
  v-resize="onResize"
)
  v-card(:dark="darkMode")
    v-card-title.headline(:class="color")
      slot(name="header", :title="title") {{ title }}
      slot(name="header.close", :showCloseButton="showCloseButton")
        v-btn(
          v-if="showCloseButton",
          dark,
          fab,
          icon,
          small,
          absolute,
          right,
          @click="close"
        )
          v-icon close
    v-card-text.pt-4.text-left(:style="modalStyle")
      slot
    v-card-actions
      slot(name="footer", :close="close")
        v-btn(color="danger", dark, @click="close") {{ $t('close') }}
</template>

<i18n>
{
  "en": {
    "close": "Close"
  },
  "pt-BR": {
    "close": "Fechar"
  }
}
</i18n>

<script lang="ts">
import {
  Vue,
  Component,
  Model,
  Emit,
  Prop,
  InjectReactive
} from "vue-property-decorator";
// eslint-disable-next-line no-unused-vars
import { BreakpointEnum } from "../enums";

@Component
export default class FeedbackModal extends Vue {
  @InjectReactive("darkMode") readonly darkMode!: boolean;

  @Model("change", { type: Boolean }) readonly value!: boolean;

  @Prop({ type: [String, Number], default: "600" }) maxWidth!: string | number;
  @Prop({ type: String, default: "primary" }) color?: string;
  @Prop({ type: Boolean, default: true }) showCloseButton!: boolean;
  @Prop({ type: Boolean, default: false }) forceMaxHeight!: boolean;
  @Prop({ type: Boolean, default: false }) disableMaxHeight!: boolean;
  @Prop(String) title?: string;
  @Prop({ type: Array, default: () => [BreakpointEnum.xs, BreakpointEnum.sm] })
  fullscreenBreakpoints!: Array<BreakpointEnum>;

  get fullscreen(): boolean {
    if (
      this.fullscreenBreakpoints.includes(
        (this as any).$vuetify.breakpoint.name as BreakpointEnum
      )
    )
      return true;
    return false;
  }

  get fullscreenOld() {
    switch ((this as any).$vuetify.breakpoint.name) {
      case "xs":
        return true;
      case "sm":
        return true;
      case "md":
        return false;
      case "lg":
        return false;
      case "xl":
        return false;
    }
    return false;
  }

  windowSize: { x: number; y: number } = {
    x: 0,
    y: 0
  };

  @Emit("change")
  close() {
    return false;
  }

  get modalStyle(): string {
    if (this.fullscreen || this.forceMaxHeight)
      return `height: ${this.maxHeight}px; max-height: ${this.maxHeight}px; overflow-y: auto;`;
    return `max-height: ${this.maxHeight}px; overflow-y: auto;`;
  }

  get maxHeight(): number {
    if (this.fullscreen) return this.windowSize.y - 110;
    return this.windowSize.y - 290;
  }

  onResize() {
    this.windowSize = { x: window.innerWidth, y: window.innerHeight };
  }

  mounted() {
    this.onResize();
  }
}
</script>
