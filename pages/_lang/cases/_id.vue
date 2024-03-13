<template>
  <div class="body-container">
    <div class="crumb-box">
      <div class="container">
        <ol class="breadcrumb">
          <li><a href="/">Home</a></li>
          <li>
            <a href="/cases/OEM-ODM-Case">OEM-ODM-Case</a>
          </li>
          <li class="active">{{ casex.title }}</li>
        </ol>
      </div>
    </div>

    <div class="container margin container-product">
      <div class="row clearfix list col-xs-12">
        <div class="col-md-5 text-center list-left">
          <div class="summry">
            <div id="preview">
              <div class="jqzoom" id="spec-n1">
                <img
                  v-if="casex.imgs && casex.imgs.length"
                  height="350"
                  :src="casex.imgs[0]"
                  :jqimg="casex.imgs[0]"
                  width="350"
                  alt=""
                />
              </div>
              <div id="spec-n5">
                <div class="control" id="spec-left"></div>
                <div id="spec-list">
                  <ul class="list-h" style="width: 62px; overflow: hidden;">
                    <li v-for="(url, index) in casex.imgs" :key="index">
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
          <div class="row">
            <h3>{{ casex.title }}</h3>
          </div>
          <div class="price-box">
            <span class="original-price" v-if="casex.originalPrice"
              >${{ casex.originalPrice }}</span
            >
            <span class="current-price">${{ casex.price }}</span>
          </div>
          <!-- end cart -->
          <!-- list info -->
          <div class="row">
            <div class="case-description" v-html="casex.description"></div>
          </div>
          <!-- end list info -->
        </div>
      </div>
    </div>
    <message />

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
        label="FEATURES"
        name="first"
        v-html="casex.features"
      ></el-tab-pane>
      <el-tab-pane
        label="TECH SPECS"
        name="second"
        v-html="casex.spec"
      ></el-tab-pane>
      <el-tab-pane
        label="FAQ & REVIEWS"
        name="third"
        v-html="casex.faq"
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">

import message from "@/components/Message/index.vue";
import detail from "@/assets/js/detail";
import { Component, Vue, Prop } from "nuxt-property-decorator";
import {  getCasex } from "@/service/api";

@Component
export default class extends Vue {
  activeName = "first";

  async asyncData({ params }: any) {
    let casex: any = {}
    // let caseClass:any={}

    if (params.id) {
       casex = await getCasex({ url: params.id }).then((res: any) => {
        return res.data;
      });

        if (casex.imgs) {
          casex.imgs = casex.imgs.split(",");
        }

    }


    return {
      casex
      // caseClass
    };
  }

  validate({ params }:any) {
    // 必须是number类型
    return /^\d+$/.test(params.id);
  }

  mounted() {
    detail();
  }

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
  }
  .el-tabs__active-bar {
    display: none;
  }
}
</style>
