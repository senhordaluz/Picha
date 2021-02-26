<template lang="pug">
  PhotoList
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PhotoList from "../components/PhotoList.vue";

@Component({
  components: {
    PhotoList
  }
})
export default class Home extends Vue {}
</script>
