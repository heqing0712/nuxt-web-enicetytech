<template>
  <div class="body-container">
    <div class="crumb-box">
      <div class="container">
        <ol class="breadcrumb">
          <li><a href="/">Home</a></li>
          <li>
            <a :href="`/products/${goodsClass.url}`">{{ goodsClass.name }}</a>
          </li>
          <li class="active">{{ goods.title }}</li>
        </ol>
      </div>
    </div>

    <div class="container margin container-product">
      <div class="h-row clearfix list col-xs-12">
        <div class="col-md-5 text-center list-left">
          <div class="summry">
            <div id="preview">
              <div class="jqzoom" id="spec-n1">
                <img
                  v-if="goods.imgs && goods.imgs.length"
                  height="350"
                  :src="goods.imgs[0]"
                  :jqimg="goods.imgs[0]"
                  width="350"
                  alt=""
                />
              </div>
              <div id="spec-n5">
                <div class="control" id="spec-left"></div>
                <div id="spec-list">
                  <ul class="list-h" style="width: 62px; overflow: hidden">
                    <li v-for="(url, index) in goods.imgs" :key="index">
                      <img :src="url" />
                    </li>
                  </ul>
                </div>
                <div class="control" id="spec-right"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-7 list-r">
          <!-- title -->
          <div class="h-row">
            <h3>{{ goods.title }}</h3>
          </div>
          <div class="price-box">
            <span class="original-price" v-if="goods.originalPrice"
              >${{ goods.originalPrice }}</span
            >
            <span class="current-price">${{ goods.price }}</span>
          </div>
          <!-- end cart -->
          <!-- list info -->
          <div class="h-row">
            <div class="goods-description" v-html="goods.description"></div>
          </div>
          <!-- end list info -->
        </div>
      </div>
    </div>

    <div class="tabs-box">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="$t('FEATURES')" name="first">
          <div class="tab-content" v-html="goods.features"></div>
        </el-tab-pane>
        <el-tab-pane :label="$t('TECH SPECS')" name="second">
          <div class="tab-content" v-html="goods.spec"></div>
        </el-tab-pane>

        <el-tab-pane :label="$t('FAQ')" name="third">
          <div class="tab-content">
            <h3 class="tab-title">{{ $t("FAQS") }}</h3>
            <div class="tab-main">
              <el-collapse v-model="activeNames" accordion>
                <el-collapse-item
                  v-for="item in faqList"
                  :title="item.title"
                  :key="item.id"
                  :name="item.id"
                >
                  <div class="item-content" v-html="item.content"></div>
                </el-collapse-item>
              </el-collapse>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <message />
  </div>
</template>

<script lang="ts">
import message from "@/components/Message/index.vue";
import detail from "@/assets/js/detail";
import { Component, Vue, Prop } from "nuxt-property-decorator";
import { getGoodsClass, getGoodsx, getFaqList } from "@/service/api";
import "@/styles/product.scss";

@Component
export default class extends Vue {
  activeName = "first";
  faqList: Array<any> = [];
  activeNames: Array<string> = ["1"];

  async asyncData({ params }: any) {
    let goods: any = {};
    let goodsClass: any = {};

    if (params.id) {
      goods = await getGoodsx({ url: params.id }).then((res: any) => {
        return res.data;
      });

      if (goods && goods.categoryId) {
        goodsClass = await getGoodsClass({ id: goods.categoryId }).then(
          (res: any) => {
            return res.data;
          }
        );
      }

      if (goods.imgs) {
        goods.imgs = goods.imgs.split(",");
      }
    }

    return {
      goods,
      goodsClass,
    };
  }

  // validate({ params }: any) {
  //   // 必须是number类型
  //   return /^\d+$/.test(params.id);
  // }

  mounted() {
    detail();
    getFaqList().then((res: any) => {
      this.faqList = res.data;
    });
  }

  handleClick() {}
}
</script>

<style lang="scss" scoped>
.price-box {
  padding-bottom: 15px;
  margin-bottom: 15px;
  border-bottom: 1px solid #e56c00;
  span {
    display: inline-block;
    margin-right: 5px;
    font-size: 20px;
    color: #333;
  }
  .original-price {
    text-decoration: line-through;
  }
  .current-price {
  }
}
::v-deep .el-tabs__nav-wrap::after {
  display: none;
}
::v-deep .el-tabs__nav-scroll {
  background: #f9f9f9;

  .el-tabs__nav {
    display: flex;
    width: 100%;
  }
  .el-tabs__item {
    flex: 1;
    height: 48px;
    font-size: 22px;
    font-weight: bold;
    line-height: 48px;
    color: rgba(51, 51, 51, 1);
    text-align: center;
    &.is-active {
      font-weight: bold;
      color: rgba(255, 92, 38, 1);
    }
    @media only screen and (max-width: 767px) {
      font-size: 16px;
    }
  }
  .el-tabs__active-bar {
    display: none;
  }
}

.tabs-box {
  margin-top: 30px;
  ::v-deep .el-tabs__header {
    margin: 0;
  }
}
.tab-content {
  .tab-title {
    padding: 30px 0;
    font-weight: bold;
  }
  .tab-main {
    padding: 0 65px 65px 65px;
    @media only screen and (max-width: 767px) {
      padding: 0 30px 30px 30px;
    }
  }
  ::v-deep .el-collapse {
    border: none;
  }
  ::v-deep .el-collapse-item {
    margin-bottom: 5px;
    overflow: hidden;
    font-size: 16px;
    color: rgba(51, 51, 51, 1);
    background: #fff;
    border: 1px solid #ddd;
    border-bottom: none;
    border-radius: 4px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
    &.is-active {
      border: 1px solid #ddd;
    }
    .el-collapse-item__header {
      height: 41px;
      padding: 0 0 0 10px;
      font-size: 16px;
      line-height: 41px;
      background: #f9f9f9;
      border-bottom: 1px solid #ddd;
      border-radius: 4px 4px 0 0;
    }
    .el-collapse-item__wrap {
      border: none;
    }
    .el-collapse-item__content {
      padding: 10px;
      font-size: 16px;
    }
    .el-collapse-item__arrow {
      color: rgba(51, 51, 51, 1);
    }
  }
}
</style>
<style lang="scss">
@media only screen and (max-width: 767px) {
  .tab-content {
    h1 {
      font-size: 28px;
    }
    h2 {
      font-size: 24px;
    }
    .el-collapse-item {
      .el-collapse-item__header {
        height: auto !important;
        padding: 5px 5px 5px 10px !important;
        line-height: 1.5 !important;
      }
    }
  }
  .spec-tb {
    h4 {
      font-size: 14px;
    }
    .s-rows {
      width: calc(50% - 10px) !important;
      .s-col {
        flex-direction: column;
        > div {
          width: 100% !important;
          line-height: 1.75;
        }
      }
    }
  }
}
</style>
