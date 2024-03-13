<template>
  <div class="body-container">
     <div class="wrap" v-if="model" v-html="model.content"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { getPage } from "@/service/api";

@Component({
   name: 'oem-odm-guide'
})
export default class extends Vue{
  async asyncData() {
     const  model  = await getPage({identifier: "oem"}).then((res: any) => res.data);
    return {
       model
    }
  }
}
</script>

<style lang="scss" scoped>
.body-container {

  h1 {
    padding: 30px;
  }
  .div {
    height: 20px;
    padding: 20px;
    margin: 10px;
    border:1px solid #ddd;
  }
}
</style>
