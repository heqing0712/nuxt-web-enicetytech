<template>
  <div class="footer-box">
    <div class="wrap"  v-html="webConfig.footer"></div>
    <div id="gotop" style="display: none;"></div>
  </div>
</template>

 <script lang="ts">

import { Component, Prop,Inject,Vue} from "nuxt-property-decorator";
@Component
export default class extends Vue {

  @Prop({})
  webConfig:any



}
 </script>
