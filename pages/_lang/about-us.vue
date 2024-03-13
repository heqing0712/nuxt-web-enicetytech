<template>
  <div class="body-container">
      <div class="banner" data-aos="background-media-text__animation" id="banner">
      <div class="background-media-text__image lazyload"   id="bk"  data-sizes="auto" :style="`background-image: url(${bnImgUrl});`"></div>
      <div class="background-media-text__inner">
        <div class="page-width">
          <div  class="background-media-text__aligner background-media-text--right"  >
            <div class="animation-cropper">
              <div class="animation-contents" v-html="model.scontent">

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="page-width">
      <div class="page-content" v-html="model.content"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { getPage } from "@/service/api";
import AOS from "aos";
import "@/styles/css/aos.css";
import $ from "jquery";

@Component({
  name: "contact-about"
})
export default class extends Vue {
  inAnimate: boolean = false;
  isLoad: boolean = false;

  async asyncData() {
    const model = await getPage({ identifier:'aboutus' }).then((res: any) => res.data);
    let bnImgUrl:string = ''
    let srcReg:any = /src=[\'\"]?([^\'\"]*)[\'\"]?/i
    model.scontent = model.scontent.replace(/<p>(\s?<img[^>]+>\s?)<\/p>\s?$/g,function(word:string,$1:string){
      const src:any = $1.match(srcReg)
      if(src[1]){
        bnImgUrl = src[1]
      }
       return ''
    })

    return {
      bnImgUrl,
      model
    };
  }
  mounted() {
    this.inAnimate = window.innerWidth > 1200;
    if (this.inAnimate) {
      AOS.init({
        easing: "ease-out-back",
        duration: 1000,
        disable: window.innerWidth < 1200
      });
      $("#bk").addClass("lazyloaded");
      setTimeout(() => {
        $("#banner").addClass("loaded");
      }, 500);
    } else {
      $("#bk").removeClass("lazyload");
    }
  }
}
</script>

<style lang="scss" >
.body-container{
.page-width {
  width: 1200px;
  margin: 0 auto;
  .background-media-text--right {
    float: right;
  }
  .page-content {
    padding: 50px 0;
  }
}
.banner {
  position: relative;
  width: 100%;
  height: 450px;
  overflow: hidden;
}

.background-media-text__image {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 0;
  width: 100%;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: cover;
}

.background-media-text__inner {
  position: absolute;
  z-index: 1;
  width: 100%;
}

.background-media-text__aligner {
  margin: 40px 20px;
}

.background-media-text__text {
  width: 500px;
  padding: 25px;
  text-align: left;
  background: white;
}

.background-media-text__text .btn {
  margin-top: 10px;
}

.animation-cropper {
  display: inline-flex;
  overflow: hidden;
}

.larger-text .subtitle {
  margin-bottom: 5px;
  font-family: "Helvetica", "Helvetica Neue", Arial, "Lucida Grande", sans-serif;
  font-size: 20px;
  line-height: 1.6;
  text-transform: uppercase;
  letter-spacing: -0.025em;
  letter-spacing: 0.2em;
}
.larger-text p {
  font-family: "Helvetica", "Helvetica Neue", Arial, "Lucida Grande", sans-serif;
  font-size: 18px;
  line-height: 1.6;
  letter-spacing: -0.025em;
  -webkit-font-smoothing: antialiased;
  -webkit-text-size-adjust: 100%;
  text-rendering: optimizeSpeed;
}

@media only screen and (max-width: 768px) {
  .banner {
    height: 300px;
  }
  .page-width {
    width: 100%;
    padding: 0 20px;
    .page-content {
      padding: 20px 0;
      ::v-deep h1 {
        margin-bottom: 20px;
        font-size: 28px;
      }
    }
  }

   .background-media-text__inner {
    display: none;
  }
}
}

</style>
