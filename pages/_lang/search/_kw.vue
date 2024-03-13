<template>
  <div class="body-container">
    <div class="crumb-box">
      <div class="container">
        <ol class="breadcrumb">
          <li>
            <a :href="$p('/')">{{ $t("links.home") }}</a>
          </li>
          <li class="active">{{ kw }}</li>
        </ol>
      </div>
    </div>
    <div
      class="container search-pr"
      v-if="goodsList.length"
      style="min-height: 200px;"
    >
      <template v-for="(item, index) in goodsList">
        <div class="col-md-3 col-sm-6 col-xs-12" :key="index">
          <div class="pr-box">
            <ul class="list-unstyled">
              <li>
                <a
                  :href="`/product/${item.id}`"
                  target="_blank"
                  :title="item.title"
                >
                  <img :src="item.imgs" class="img-responsive" />
                </a>
              </li>
              <li>
                <p>
                  <a
                    :href="`/product/${item.id}`"
                    target="_blank"
                    :title="item.title"
                    v-html="item.titleHtml"
                  >
                  </a>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </template>
    </div>

    <div class="container search-pr padding-tb" v-else>
      <div class="search-tip" v-if="isEn">
        <h2>
          Your search - "<font color="red">{{ kw }}</font
          >" - did not return any results.
        </h2>
        <h3>Suggestions:</h3>
        <div>
          1. Make sure all words are spelled correctly.<br />2. Try different
          keywords.<br />3. Try more general keywords.<br />4. Try fewer
          keywords.<br />
        </div>
      </div>
    <div class="search-tip" v-else>
        <h2>
          您的搜索- "<font color="red">{{ kw }}</font
          >" - 没有返回任何结果.
        </h2>
        <h3>建议:</h3>
        <div>
          1. 确保关键词输入正确。<br />
          2. 尝试不同的关键词。<br />
          3. 尝试更一般的关键字。<br />
          4. 尝试更少的关键字。<br />
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import detail from "@/assets/js/detail";
import { Component, Vue, Prop } from "nuxt-property-decorator";
import { getGoodsList } from "@/service/api";

@Component
export default class extends Vue {
  async asyncData({ params }: any) {
    const kw: string = params.kw;
    let goodsList: Array<any> = [];
    if (params.kw) {
      goodsList = await getGoodsList({ title: params.kw }).then(
        (res: any) => res.data
      );

      if (goodsList) {
        goodsList.forEach((d: any) => {
          d.titleHtml = d.title.replace(kw, `<font class="red">${kw}</font>`);
        });
      }
    }

    return {
      kw,
      goodsList
    };
  }

  get isEn() {
    return this.$store.state.app.locale === 'en';
  }


}
</script>

<style lang="scss" scoped></style>
