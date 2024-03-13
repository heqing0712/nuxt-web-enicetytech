<template>
  <div class="app-layout">
    <app-header :webConfig="webConfig" :langList="langList" />
    <Nuxt />
    <app-footer :webConfig="webConfig" />
  </div>
</template>
<script>
import Vue from "vue";
import Component from "nuxt-class-component";
import AppHeader from "./Header.vue";
import AppFooter from "./Footer.vue";
import { getWebConfig, getGoodsClassList, getLangList } from "@/service/api";
import { initApp } from "@/assets/js/app";
export default
@Component({
  components: {
    AppHeader,
    AppFooter,
  },
  props: {
    env: String,
  },
})
class Base extends Vue {
  webConfig = {};
  langList = [];

  async getWebConfig() {
    this.webConfig = await getWebConfig().then((res) => {
      return res.data;
    });
  }

  async getLangList() {
    const list = await getLangList().then((res) => {
      return res.data.map((d) => {
        return {
          title: d.nameEn,
          value: d.name,
          lang: d.name,
          name: d.name,
          url: d.url,
        };
      });
    });

    if (list && list.length) {
      this.langList = list;
    }
  }

  head() {
    const { title, keyword, description } = this.webConfig;
    return {
      title: title,
      meta: [
        { hid: "description", name: "description", content: description },
        { hid: "keywords", name: "keywords", content: keyword },
      ],
    };
  }

  async fetch() {
    await this.getWebConfig();
    await this.getLangList();
  }

  mounted() {
    initApp();
  }
}
</script>
<style></style>
