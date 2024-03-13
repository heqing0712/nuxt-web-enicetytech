<template>
  <header
    class="header header--fixed hide-from-print animated slideDown headroom--top"
    id="header"
  >
    <div class="wrap">
      <div class="header-l"></div>

      <div class="container">
        <nav class="navbar navbar-default" role="navigation">
          <div class="navbar-header">
            <button
              type="button"
              class="navbar-toggle"
              data-toggle="collapse"
              data-target="#example-navbar-collapse"
            >
              <span class="sr-only">Switching navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <div class="logo">
              <a :href="$p('/')"
                ><img
                  class="img-responsive"
                  :src="cf.logo"
                  :alt="cf.name"
                  :title="cf.name"
              /></a>
            </div>
          </div>
          <div class="nav-right-box">
            <div class="search-icn">
              <a href="javascript:void(0);" @click="toggleSearch"
                ><i class="menu-icn-search"></i
                ><span>{{ $t("links.search") }}</span></a
              >
            </div>
            <div class="top-tel cf">
              <div class="s-icon fl"></div>
              <div class="s-txt fl">
                <div class="s-h">{{ $t("links.hotLine") }}</div>
                <div class="s-t">+{{ cf.mobile }}</div>
              </div>
            </div>
          </div>

          <div class="collapse navbar-collapse" id="example-navbar-collapse">
            <div class="nav-triangle-up"></div>
            <ul class="nav navbar-nav">
              <li>
                <a :href="$p('/')"
                  ><i class="menu-icn menu-icn-home"></i
                  ><span>{{ $t("links.home") }}</span></a
                >
              </li>
              <li>
                <a class="dropdown-toggle" :href="$p('/products')">
                  <i class="menu-icn menu-icn-pr"></i>
                  <span>{{ $t("links.products") }}</span>
                </a>

                <ul class="dropdown-menu menu-pr" role="menu">
                  <div class="triangle-up"></div>

                  <li
                    v-for="item in cf.goodsClassList"
                    :key="item.id"
                    :class="{ more: item.children }"
                  >
                    <a
                      :href="
                        item.children
                          ? 'javascript:;'
                          : $p(`/products/` + item.url)
                      "
                      ><div class="left">{{ item.name }}</div></a
                    >
                    <ul
                      class="dropdown-menu-s"
                      role="menu"
                      v-if="item.children"
                    >
                      <li v-for="itemx in item.children" :key="itemx.id">
                        <a :href="$p(`/products/` + itemx.url)"
                          ><div class="left">{{ itemx.name }}</div></a
                        >
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>

              <li>
                <a :href="$p('/application')"
                  ><i class="menu-icn menu-icn-login"></i
                  ><span>{{ $t("links.application") }}</span></a
                >

                <ul class="dropdown-menu menu-pr" role="menu" v-if="false">
                  <div class="triangle-up"></div>
                  <li>
                    <a :href="$p('/OEM-ODM-Guide')"
                      ><div class="left">{{ $t("links.guide") }}</div></a
                    >
                  </li>
                  <li>
                    <a :href="$p('/cases/OEM-ODM-Case')"
                      ><div class="left">{{ $t("links.case") }}</div></a
                    >
                  </li>
                </ul>
              </li>

              <li>
                <a :href="$p('/about-us')"
                  ><i class="menu-icn menu-icn-about"></i
                  ><span>{{ $t("links.about") }}</span></a
                >
              </li>
              <li>
                <a :href="$p('/contact')"
                  ><i class="menu-icn menu-icn-buy"></i
                  ><span>{{ $t("links.contact") }}</span></a
                >
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div class="header-r">
        <div class="lang-switch">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              {{ lang.title }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <template>
              <el-dropdown-menu class="dropdown-menu-x">
                <el-dropdown-item
                  :key="item.name"
                  :command="item.name"
                  v-for="item in langList"
                >
                  <div class="el-dropdown-link el-dropdown-link-x">
                    <a
                      :href="getUrl(item)"
                      class="dropdown-link"
                      :title="item.title"
                    >
                      <span class="tit">{{ item.title }} </span>
                    </a>
                  </div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div class="nav-right-box">
          <div class="search-icn">
            <a @click="toggleSearch"
              ><i class="menu-icn-search"></i
              ><span>{{ $t("links.search") }}</span></a
            >
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="header-bg"></div> -->

    <div class="search-box" v-show="showSearch">
      <div class="container">
        <div class="search-box-info">
          <input
            v-model="kw"
            type="text"
            class="form-control"
            id="txtSearchM"
            name="txtSearchM"
            :placeholder="$t('msg.search-p')"
          />
          <button type="submit" class="btn bg-orange" @click="toSearch">
            {{ $t("links.search") }}
          </button>
          <button type="button" class="search-close" @click="toggleSearch">
            X
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { ShopConfigs } from "@/types";
import { Component, Vue, Prop, Inject } from "nuxt-property-decorator";
import { getGoodsClassList } from "@/service/api";

@Component
export default class extends Vue {
  @Prop({})
  webConfig: any;

  @Prop([])
  langList: any;

  goodsClassList: Array<any> = [];
  lang: any = this.getDefaultLang();
  showSearch: boolean = false;
  kw: string = "";

  get cf(): any {
    const goodsClassList: Array<any> = this.goodsClassList;
    const { name, title, logo, mobile } = this.webConfig;
    for (const d of goodsClassList) {
      if (d.pid === 0) {
        const children: Array<any> = goodsClassList.filter(
          (s: any) => s.pid === d.id
        );
        if (children && children.length) {
          d.children = children;
          d.childrenShow = false;
        }
      }
    }

    for (let i = 0; i < goodsClassList.length; i++) {
      if (goodsClassList[i].pid) {
        goodsClassList.splice(i--, 1);
      }
    }

    return {
      name,
      title,
      mobile,
      logo,
      goodsClassList,
    };
  }
  getDefaultLang() {
    return (
      this.langList.find((d: any) => {
        return d.value === this.locale;
      }) || this.langList[0]
    );
  }

  async getGoodsClassList() {
    this.goodsClassList = await getGoodsClassList().then((res) => res.data);
  }

  async fetch() {
    await this.getGoodsClassList();
  }

  get locale() {
    return this.$store.state.app.locale;
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
  }

  handleCommand(c: string) {
    for (const d of this.langList) {
      if (d.name === c) {
        this.lang = d;
        break;
      }
    }
  }

  toSearch() {
    const path: string = this.$p(`/search/${this.kw}`);
    this.$router.push(path);
  }
  getUrl(item: any) {
    const { lang } = item;
    let fullPath = this.$route.fullPath;
    return item.url + fullPath;
  }
}
</script>

<style lang="scss" scoped>
.header {
  .wrap {
    display: flex;
    height: 60px;
    .header-l {
      flex: 1;
      background: #e56c00;
    }
    .header-r {
      flex: 1;

      .lang-switch {
        float: right;

        padding-right: 50px;
        line-height: 60px;
        color: #fff;
      }
      .lang-switch a:link,
      .lang-switch a:active,
      .lang-switch a:visited {
        color: #fff !important;
      }
      .lang-switch a:hover {
        color: #fff;
        text-decoration: underline;
      }

      .nav-right-box {
        display: none;
        float: none;
      }
    }
  }
}
.dropdown-menu-s {
  position: absolute;
  top: -8px;
  left: 100%;
  z-index: 1000;
  display: none;
  min-width: 210px;
  padding: 5px 5px;
  margin: 2px 0 0 -1px;
  font-size: 14px;
  text-align: left;
  list-style: none;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.2);
  li {
    padding-left: 20px;
    a {
      color: rgb(51, 51, 51);
    }
  }
}
.dropdown-menu li {
  position: relative;
  a {
    height: 36px;
    &:hover {
      color: #e56c00;
    }
  }
  &.more {
    > a .left:after {
      content: " »";
    }
    &:hover {
      .dropdown-menu-s {
        display: block;
      }
    }
  }
}
.dropdown-menu-x {
  margin-top: 0px;
  border-radius: 0;
  box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.2);
}

.el-dropdown-link {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #fff;
  outline: none;

  &-x {
    padding: 10px 0;
  }
  img {
    width: 32px;
  }
  .flag {
    margin-right: 10px;
  }
  .tit {
    color: #333;
  }
}
.search-icn a {
  display: block;
}

@media (max-width: 1200px) {
  .header {
    .wrap {
      .container {
        .search-icn {
          display: none;
        }
      }

      .header-r {
        display: flex;
        .lang-switch {
          padding-right: 10px;
          background: #e56c00;
        }
        .nav-right-box {
          display: block;
        }
      }
    }
  }
}
</style>
