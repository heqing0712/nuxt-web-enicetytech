<template>
  <div class="body-container">
    <div class="pr-bn row" v-if="goodsClass && goodsClass.imgs">
      <center>
        <img
          :src="goodsClass.imgs"
          class="img-responsive"
          alt="Hoverboard Battery "
        />
      </center>
    </div>

    <div class="row">
      <div class="col-md-10 col-md-offset-1">
        <div class="pr-title">
          <span v-if="goodsClass">{{ goodsClass.name }}</span>
        </div>

        <div class="product-list">
          <div class="row" v-if="goodsList && goodsList.length">
            <div
              class="col-md-3 col-sm-4 col-xs-12"
              v-for="item in goodsList"
              :key="item.id"
            >
              <div class="pr-box">
                <ul class="list-unstyled">
                  <li>
                    <a :href="$p(`/product/${item.url}`)" :title="item.title"
                      ><img
                        :src="item.imgs"
                        :data-original="item.imgs"
                        class="img-responsive lazy"
                        :alt="item.title"
                        style="display: block;"
                    /></a>
                  </li>
                  <li>
                    <div class="pr-color text-center"></div>
                  </li>
                  <li>
                    <p>
                      <a :href="$p(`/product/${item.url}`)" :title="item.title">{{
                        item.title
                      }}</a>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="row" v-else>
            <div class="empty-tip">
              {{$t('product.NoData')}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<
<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import { getGoodsList } from "@/service/api";

@Component
export default class extends Vue {
  async asyncData({ params }: any) {
    let goodsClass: any;
    let goodsList: Array<any> = [];
    if (params.id) {
      const result: any = await getGoodsList({ goodsClassUrl: params.id }).then(
        (res: any) => res.data
      );
      if (result) {
        goodsList = result.goodsList;
        goodsClass = result.goodsClass;
      }
    }
         for(const d of goodsList){
      if(d.imgs && d.imgs.includes(',')){
        d.imgs = d.imgs.split(',')[0]
      }
    }

    return {
      goodsList,
      goodsClass
    };
  }
}
</script>
<style lang="scss" scoped>
.empty-tip {
  padding-bottom: 50px;
  font-size: 20px;
  color: #999;
  text-align: center;
}
</style>
