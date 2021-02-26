<template lang="pug">
v-container(v-if="loaded")
  v-fade-transition(mode="out-in")
    v-row
      v-col.d-flex.child-flex(cols=4, v-for="photo in photos.all()")
        v-hover
          template(v-slot:default="{ hover }")
            v-card
              v-img.grey.lighten-2(
                :src="photo.image_url",
                :lazy-src="photo.image_url_big",
                height="225"
              )
                template(v-slot:placeholder)
                  v-row.fill-height.ma-0(align="center", justify="center")
                    v-progress-circular(indeterminate, color="grey lighten-5")
              v-card-title.photo-card-title(hover) {{ photo.title }}
              v-fade-transition
                v-overlay(v-if="hover", absolute, color="#036358")
                  v-btn {{ $t('more-info') }}
      v-col.text-center
        v-pagination(
          :dark="darkMode",
          v-model="page",
          :length="totalPages",
          @next="navigate(page, false)",
          @previous="navigate(page, true)",
          @input="navigate($event)"
        )
</template>

<style lang="scss" scoped>
.photo-card-title {
  max-height: 5.3rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>

<i18n>
{
  "en": {
    "more-info": "See more info"
  },
  "pt-BR": {
    "more-info": "Ver mais"
  }
}
</i18n>

<script lang="ts">
import { collect, Collection } from "collect.js";
import { Component, Vue, InjectReactive, Watch } from "vue-property-decorator";
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

  urlParams = new URLSearchParams(window.location.search);

  page =
    this.urlParams.has("page") && !isNaN(parseInt(this.urlParams.get("page")))
      ? parseInt(this.urlParams.get("page"))
      : 1;
  loaded = false;
  count = 0;
  //   currentPage?: Pagination<Photo>;
  photos: Collection<Photo> = collect();

  get totalPages(): number {
    return Math.floor(this.count / 9);
  }

  created() {
    this.navigate(this.page);
  }

  /**
   * Resgata determinada página
   * @param previous Flag de controle para resgatar pagina anterior
   */
  async navigate(demandedPage?: number, previous = true) {
    try {
      const page: number =
        demandedPage || (previous ? this.page - 1 : this.page + 1);
      const currentPage: Pagination<Photo> = await PhotoRepository.list({
        page,
      });
      console.log(currentPage);
      this.photos = currentPage.results;
      this.count = currentPage.count;
      //   if (this.currentPage) {
      //     if (previous && this.currentPage?.previous)
      //       this.currentPage = await PhotoRepository.previous(this.currentPage!);
      //     else if (this.currentPage?.next)
      //       this.currentPage = await PhotoRepository.next(this.currentPage!);
      //   } else if (page) this.currentPage = await PhotoRepository.list({ page });
      //   else this.currentPage = await PhotoRepository.list();
      //   this.photos = this.currentPage!.results;
      this.loaded = true;
      //   this.$forceUpdate();
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error(error);
    }
  }

  @Watch("page")
  onPageChanged(page: number) {
    this.urlParams = new URLSearchParams(window.location.search);
    this.urlParams.set("page", page.toString());

    // Atualiza parâmetros na URL
    window.history.replaceState(
      {},
      "",
      `${location.pathname}?${this.urlParams}`
    );
  }
}
</script>
