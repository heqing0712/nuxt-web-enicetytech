<template>
  <div class="body-container">
    <div class="pr-bn row">
      <center>
        <div class="content" v-if="banner" v-html="banner"> </div>
      </center>
    </div>
 <div class="row">
   <div class="col-md-10 col-md-offset-1">
      <div class="pr-title">
        <span>OEM/ODM Case</span>
      </div>

      <div class="product-list">
        <div class="col-md-3 col-sm-4 col-xs-12" v-for="item in caseList" :key="item.id">
          <div class="pr-box">
            <ul class="list-unstyled">
              <li>
                <a :href="`/cases/${item.url}`" :title="item.title">
                <img :src="item.imgs" :data-original="item.imgs" class="img-responsive lazy" :alt="item.title" style="display: block;" />
                 </a>
              </li>
              <li>
                <div class="pr-color text-center"></div>
              </li>
              <li>
                <p>
                  <a :href="`/cases/${item.url}`" :title="item.title">{{item.title}}  </a>
                </p>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
 </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import { getCaseList ,getCaseBanner } from "@/service/api";
@Component({
  components: {}
})
export default class extends Vue {
  async asyncData() {
    const caseList: any = await getCaseList().then((res: any) => res.data);
    caseList.forEach((d:any)=>{
      if(d.imgs){
      d.imgs = d.imgs.split(',')[0]
      }
    })

    const banner:any = await getCaseBanner().then((res: any) => res.data)
    return { caseList,banner };
  }
}
</script>
<style lang="scss" scoped>
.product-list{
  overflow: hidden;
}
</style>
