<template lang="pug">
    v-overlay(
        color=""
        :style="`background-image: url('${background}'); background-position: center; background-size: cover; margin: 0 !important;`"
    )
        v-container(
            fluid
        )
            v-row(
                align="start"
                justify="center"
                style="height: 40rem;"
            )
                v-col
                    v-img(
                        :src="logo"
                        position="top center"
                        height="45"
                        contain
                    )
                    v-col {{ errorMessage }}
                    v-col
                        router-link( to="/" ) Ir para página inicial
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component
export default class ErrorHandler extends Vue {
  @Prop(Number) readonly code: number = 404;

  get background(): string {
    return `${process.env.VUE_APP_BASE_URL || ""}/images/background_${
      this.code
    }.png`;
  }

  get logo(): string {
    return (
      (process.env.VUE_APP_BASE_URL || "") +
      "/images/logo/logo.svg"
    );
  }

  get errorMessage(): string {
    switch (this.code) {
      case 404:
        return "A página que você está procurando não foi encontrada.";
      case 403:
        return "Você não tem permissão para acessar esta página.";
      case 500:
        return "Ops, alguma coisa deu errado. Por favor, volte e tente novamente. \nCaso o problema persista, entre em contato com a nossa Equipe de Suporte.";
      default:
        return "A página que você está procurando não foi encontrada.";
    }
  }

  created() {
    // Redirect outside the app using plain old javascript
    console.log(this.code);
  }
}
</script>
