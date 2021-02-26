<template lang="pug">
v-row(v-if="loaded")
  v-col.d-flex.child-flex(cols=4, v-for="photo in currentPage.results")
    v-img.grey.lighten-2(
      :src="photo.image_url",
      :lazy-src="photo.image_url_big"
    )
      template(v-slot:placeholder)
        v-row.fill-height.ma-0(align="center", justify="center")
          v-progress-circular(indeterminate, color="grey lighten-5")
  v-col.text-center
    v-pagination(
      :dark="darkMode",
      v-model="page",
      :length="totalPages",
      @next="navigate($event, false)",
      @previous="navigate($event, true)",
      @input="navigate($event)"
    )
</template>

<script lang="ts">
import { Component, Vue, InjectReactive } from "vue-property-decorator";
import HelloWorld from "../components/HelloWorld.vue"; // @ is an alias to /src

import { Pagination, Photo } from "../models";
import { PhotoRepository } from "../repositories";

@Component({
  components: {
    HelloWorld,
  },
})
export default class PhotoList extends Vue {
  @InjectReactive("darkMode") readonly darkMode!: boolean;

  page = 1;
  loaded = false;
  currentPage?: Pagination<Photo>;

  get totalPages(): number {
    if (this.currentPage) return parseInt(this.currentPage!.count / 10);
    return 0;
  }

  created() {
    this.navigate();
  }

  /**
   * Resgata determinada página
   * @param previous Flag de controle para resgatar pagina anterior
   */
  async navigate(page?: number, previous = true) {
    try {
      if (this.currentPage) {
        if (previous && this.currentPage?.previous)
          this.currentPage = await PhotoRepository.previous(this.currentPage!);
        else if (this.currentPage?.next)
          this.currentPage = await PhotoRepository.next(this.currentPage!);
      } else if (page) this.currentPage = await PhotoRepository.list({ page });
      else this.currentPage = await PhotoRepository.list();
      console.log(this.currentPage);
      this.loaded = true;
    } catch (error) {
      console.error(error);
    }
  }
}
</script>
