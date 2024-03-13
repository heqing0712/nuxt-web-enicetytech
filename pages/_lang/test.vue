<template>
  <div class="body-container">
      <h1>{{$t('links.test')}}</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
@Component
export default class extends Vue {


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
    border: 1px solid #ddd;
  }
}
</style>
