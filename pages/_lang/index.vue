<template>
  <div
    class="body-container home-body-container"
    :class="{ 'in-animate': inAnimate }"
  >
    <div class="banner">
      <div
        id="carousel-example-generic"
        class="carousel slide both carousel-fade"
        data-ride="carousel"
      >
        <ol class="carousel-indicators">
          <li
            v-for="(item, index) in bannerList"
            :key="item.id"
            :data-target="`#${item.title}`"
            :data-slide-to="index"
            :class="index === 0 ? 'active' : ''"
          ></li>
        </ol>

        <div class="carousel-inner" role="listbox">
          <div
            class="item"
            :class="index === 0 ? 'active' : ''"
            v-for="(item, index) in bannerList"
            :key="item.id"
          >
            <a
              :title="item.title"
              :href="item.url"
              target="_blank"
              class="big-bn"
            >
              <img :src="item.imgs" style="width:100%" />
            </a>
          </div>
        </div>
        <a
          id="carleft"
          class="left carousel-control"
          href="#carousel-example-generic"
          role="button"
          data-slide="prev"
        >
          <span
            class="glyphicon glyphicon-chevron-left"
            aria-hidden="true"
          ></span>
          <span class="sr-only">Previous</span>
        </a>
        <a
          id="carright"
          class="right carousel-control"
          href="#carousel-example-generic"
          role="button"
          data-slide="next"
        >
          <span
            class="glyphicon glyphicon-chevron-right"
            aria-hidden="true"
          ></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>

    <div
      class="brick"
      :class="getClassName(item, index)"
      v-for="(item, index) in contentList"
      :key="item.id"
      v-html="item.content"
    ></div>
     <div class="brick">

    <div class="brick-best-sellers" v-if="goodsHotList && goodsHotList.length">
      <div class="wrap">
        <h2 class="sellers-title">
          {{$t('home.hotGoods')}}
        </h2>
        <div class="sellers-list">
          <div class="item" v-for="(item,index) in goodsHotList" :key="item.id">
            <a :href="$p(`/product/${item.url}`)" class="inner" data-aos="fade-left" :data-aos-delay="100*index"
              ><div class="item-img">
                <img
                  :src="item.imgs"
                  :title="item.title"
                  :alt="item.title"
                />
              </div>
              <div class="item-tit">
                {{item.title}}
              </div>
              <div class="item-price">
                <span class="s-price"> $ {{item.price}} </span>
              </div></a
            >
          </div>

        </div>
      </div>
    </div>
     </div>

    <message />
  </div>
</template>

<script lang="ts">
import home from "@/assets/js/home";
import message from "@/components/Message/index.vue";
import { Component, Vue, Prop } from "nuxt-property-decorator";
import { getBannerList, getHomeList, getGoodsList } from "@/service/api";
import AOS from "aos";
import "@/styles/css/aos.css";

@Component({
  components: {
    message
  },
  async asyncData({ app }) {
    const bannerList = await getBannerList().then((res: any) => res.data);
    const contentList = await getHomeList().then((res: any) => res.data);
    let goodsHotList: Array<any> = await getGoodsList({ hot: 1 }).then(
      (res: any) => res.data
    );
    if (goodsHotList.length > 4) {
       goodsHotList = goodsHotList.splice(0, 4);
    }
    for(const d of goodsHotList){
      if(d.imgs && d.imgs.includes(',')){
        d.imgs = d.imgs.split(',')[0]
      }
    }
    //debugger;
    return { bannerList, contentList, goodsHotList };
  }
})
export default class extends Vue {
  inAnimate = false;

  async data() {
    return {};
  }

  async mounted() {
    home();

    this.inAnimate = window.innerWidth > 1200;
    if (this.inAnimate) {
      AOS.init({
        easing: "ease-out-back",
        duration: 1000,
        disable: window.innerWidth < 1200
      });
    }
  }

  getClassName(item: any, index: number) {
    return `brick-${index + 1} brick-${item.identifier}`;
  }
}
</script>

<style lang="scss">
.home-body-container {
  min-height: 100px;
  background: #fff;

  .brick {
    .wrap {
      width: 1200px;
      margin: 0 auto;
    }
  }

  .sellers-title {
    padding: 50px 0;
    text-align: center;
    border-top: 3px solid #ddd;
  }
  .sellers-list {
    display: flex;
    padding: 10px 0;
    margin: 0 0px 50px 0px;
    background: rgba(0, 0, 0, 0.14);
    box-shadow: -1px 0px 44px 17px rgba(0, 0, 0, 0.14);
    .item {
      width:25%;
       min-height:416px;
      margin: 0 10px;
      transition-duration: 0.3s;
      transition-property: transform;
      a{
        height: 100%;
      }
      .inner {
        display: block;
        padding: 30px 20px;
        background: #fff;
      }
      &:hover {
        transform: scale(1.02);
      }
      &-img {
        img {
          width: 100%;
        }
      }
      &-tit {
        margin: 10px 0;
        font-size: 17px;
        text-align: center;
      }
      &-price {
        font-size: 17px;
        text-align: center;
      }
    }
  }

}

@media screen and (max-width: 1200px) {
  .body-container {
    .brick {
      .wrap {
        width: 100%;
        padding: 0px 20px;
      }
    }
  }
}

@media screen and (max-width: 767px) {
  .body-container {
    .brick {
      &-goods-hot {
        .goods-list {
          flex-wrap: wrap;
          .goods {
            flex: auto;
            width: 50%;

            &:nth-child(-n + 2) {
              margin-bottom: 10px;
              border-bottom: 1px solid #d4d4d4;
            }
            &:nth-last-child(-n + 2) {
              border-top: 1px solid #d4d4d4;
            }
          }
        }
      }
      &-company-about {
        .company-container {
          flex-wrap: wrap;
          padding: 10px 0px;
          .company-text {
            width: 100%;
          }
          .company-video {
            flex: auto;
            margin-left: 0;
          }
        }
      }
    }
    .goods-box {
      flex-direction: column;
      .goods-txt {
        padding-left: 0 !important;
      }
      margin-bottom: 20px;
    }
    .sellers-title {
      padding: 30px 0;
      font-size: 24px;
    }
    .sellers-list {
      flex-wrap: wrap;

      .item {
        flex: auto;
        width: 46%;
        margin-bottom: 20px;

        &:nth-last-child(-n+2) {
          margin-bottom: 0px;
        }
      }
    }
  }
}
</style>
