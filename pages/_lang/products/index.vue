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
          <span>PRODUCTS</span>
        </div>
        <div class="pr-menu">
          <ul class="list-inline text-center">
            <li v-for="item in goodsClassList" :key="item.id">
              <nuxt-link class="ui-radius" :to="$p(`/products/`+(item.url ))">
               {{item.name}}
              </nuxt-link>
            </li>

          </ul>
        </div>

        <div class="product-list">
          <template v-for="item in goodsClassList" >
            <div class="product-brick"   :key="item.id" v-if="item.goodsList.length">
                 <div class="pr-submenu text-center">
            <h2>{{item.name}}</h2>
            <p></p>
          </div>
          <div class="row">
            <div class="col-md-3 col-sm-4 col-xs-12" v-for="goods in item.goodsList" :key="goods.id">
              <div class="pr-box" v-if="goods">
                <ul class="list-unstyled">
                  <li>
                    <nuxt-link
                      :to="$p('/product/'+goods.url)"
                      :title="goods.title">
                      <img
                        :src="goods.imgs"
                        :data-original="goods.imgs"
                        class="img-responsive lazy"
                        :alt="goods.title"
                        style="display: block;"/>
                        </nuxt-link>
                  </li>
                  <li>
                    <div class="pr-color text-center"></div>
                  </li>
                  <li>
                    <p>
                      <nuxt-link
                      :to="$p('/product/'+goods.url)"
                        :title="goods.title">{{goods.title}}
                    </nuxt-link>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { getGoodsClassList,getGoodsList,getProductBanner} from "@/service/api";

@Component
export default class extends Vue {
  async asyncData() {
    const banner:any = await getProductBanner().then((res: any) => res.data)
    const goodsClassListx:any = await getGoodsClassList().then((res:any)=> res.data);
    const goodsList:any =await getGoodsList().then((res:any)=> res.data);
    const pids:Array<number> = [];
    for(const d of goodsClassListx){
      if(d.pid && !pids.includes(d.id)){
         pids.push(d.pid)
      }
    }
    const goodsClassList = goodsClassListx.filter((d:any)=>!pids.includes(d.id))
    goodsClassList.forEach((d:any)=>{
      d.goodsList  = goodsList.filter((g:any)=> g.categoryId===d.id)
    })

     for(const d of goodsList){
      if(d.imgs && d.imgs.includes(',')){
        d.imgs = d.imgs.split(',')[0]
      }
    }
    return { banner,goodsClassList ,goodsList};
  }

}
</script>
