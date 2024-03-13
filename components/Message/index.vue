<template>
  <div class="brick brick-message" id="form-message">
    <div class="wrap">
      <div class="pctitle">
        <h2 class="title" data-aos="fade-up">
          {{ $t("msg.notice") }}
        </h2>
        <div class="slogan" data-aos="fade-up" data-aos-delay="100">
          {{ $t("msg.notice-t") }}
        </div>
      </div>
      <div class="content">
        <div class="col col2 sm-col12" data-aos="fade-left" data-aos-delay="0">
          <input
            type="text"
            name="name"
            :placeholder="$t('msg.name') + ':'"
            maxlength="20"
          />
        </div>
        <div
          class="col col2 sm-col12"
          data-aos="fade-left"
          data-aos-delay="100"
        >
          <input
            type="text"
            name="mobile"
            :placeholder="$t('msg.mobile') + ':'"
            maxlength="20"
          />
        </div>
        <div
          class="col col2 sm-col12"
          data-aos="fade-left"
          data-aos-delay="200"
        >
          <input
            type="text"
            name="email"
            :placeholder="$t('msg.email') + ':'"
            maxlength="30"
          />
        </div>
        <div
          class="col col5 sm-col12"
          data-aos="fade-left"
          data-aos-delay="300"
        >
          <input
            type="text"
            maxlength="200"
            name="specification"
            :placeholder="$t('msg.msg') + ':'"
          />
        </div>
        <div
          class="col col1 sm-col12"
          data-aos="fade-left"
          data-aos-delay="400"
        >
          <div class="rbtn">
            <button type="button" class="btn-sub" @click="submitForm">
              <span>{{ $t("msg.submit") }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import { ShopConfigs } from "@/types";
import { isEmail } from "@/utils";
import { addMessage } from "@/service/api";
import { Message } from "element-ui";

// @ts-ignore
import {setFormData } from "@/assets/js/home";

@Component
export default class extends Vue {
  form = {
    goodsName: "",
    qty: "",
    unit: "",
    specification: "",
    name: "",
    email: "",
    mobile: "",
    address: "",
    sort: 0,
    status: 1
  };

  validateEmail = (rule: any, value: string, callback: any) => {
    if (value === "") {
      return callback(new Error("Please input the email."));
    } else if (!isEmail(value)) {
      return callback(new Error("E-mail format is not correct."));
    } else {
      return true;
    }
  };

  rules = {
    specification: [
      {
        required: true,
        message: "Please input the specification.",
        trigger: "blur"
      }
    ],
    email: [
      {
        required: true,
        validator: this.validateEmail,
        trigger: "blur"
      }
    ]
  };

  data() {
    const config: ShopConfigs = this.$store.state.app.webConfig;
    return {
      config
    };
  }

  alert(v:string){
      this.$alert(v, String(this.$t('msg.tip')),{
        confirmButtonText: 'OK',
      });
  }



  resetForm(){
     Object.assign(this.form,{
      goodsName: "",
      qty: "",
      unit: "",
      specification: "",
      name: "",
      email: "",
      mobile: "",
      address: ""
     })
  }

  async mounted() {}

  async checkForm(){
    setFormData(this.form)
    const {name,mobile,email,specification} = this.form
    if(name === ''){
             this.alert(String(this.$t('msg.name-t')))
        return false
    }

    // if(mobile === ''){
    //      this.alert('Please enter your phone.')
    //     return false
    // }


    // if(!/^1[0-9]{5,15}$/.test(mobile)){
    //      this.alert('Please enter your correct phone.')
    //     return false
    // }

   if(email === ''){
         this.alert(String(this.$t('msg.email-t')))
        return false
    }

    if(!isEmail(email)){
            this.alert(String(this.$t('msg.email-e-t')))
        return false
    }

    if(specification === ''){
         this.alert(String(this.$t('msg.message-t')))
      return false
    }

    return true
  }

  // 提交表单
  async submitForm() {
    const pass = await this.checkForm();
    if (!pass) return false;

    const result: any = await addMessage(this.form).then(
      (res: any) => res.data
    );

    if (result) {
      if (process.client) {
         const msg:string = String(this.$t('msg.submitSuccess'))
          this.$alert(msg,'',{
            confirmButtonText: 'OK',
            type:"success"
         });
      }
      this.resetForm()
    } else {
      if (process.client) {
         const msg:string = String(this.$t('msg.submitFail'))
        this.$alert(msg,'',{
            confirmButtonText: 'OK',
            type:"error"
         });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$themColor: #e56c00;

.brick-message {
  padding: 90px 0 100px 0;
  background: url(../../assets/images/maintain_bg.jpg) no-repeat center;
  -moz-background-size: cover;
  -webkit-background-size: cover;
  background-size: cover;

  textarea,
  input {
    display: block;
    padding: 0;
    margin: 0;
    font-family: "Microsoft YaHei", "Arial", arial;
    font-size: 14px;
    color: #333333;
    outline: none;
    -webkit-appearance: none;
  }
}
.brick-message .wrap {
  width: 1200px;
  margin: 0 auto;
}
.brick-message .pctitle .title{
      font-family: Impact;
  font-weight: bold;
}
.brick-message .pctitle .title,
.brick-message .pctitle .slogan {
  font-weight: normal;
  color: #fff;
  text-align: center;
}
.brick-message .pctitle .slogan {
  font-size: 16px;
  font-weight: bold;
}
.brick-message .content {
  display: flex;
  justify-content: center;
  margin: 60px 0 0 0;
  overflow: hidden;
  text-align: center;
  .home-form {
    display: flex;
  }
  .col5 {
    flex: 1;
  }
  .col:last-child {
    min-width: 110px;
  }
}
.brick-message .content .col {
  padding: 5px;
}
.brick-message .content textarea,
.brick-message .content input[type="text"] {
  width: 100%;
  padding: 18px 15px;
  line-height: 22px;
  color: #333;
  background: rgba(255, 255, 255, 0.9);
  border: solid 1px #e7e6e5;
}
.brick-message .content textarea::-webkit-input-placeholder,
.brick-message .content input[type="text"]::-webkit-input-placeholder {
  color: #999999;
}
.brick-message .content textarea:-moz-placeholder,
.brick-message .content input[type="text"]:-moz-placeholder {
  color: #999999;
}
.brick-message .content textarea::-moz-placeholder,
.brick-message .content input[type="text"]::-moz-placeholder {
  color: #999999;
}
.brick-message .content textarea:-ms-input-placeholder,
.brick-message .content input[type="text"]:-ms-input-placeholder {
  color: #999999;
}
.brick-message .content .rbtn {
  position: relative;
  height: 60px;
  background: #e56c00;
}
.brick-message .content .rbtn::after {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 0;
  height: 100%;
  content: " ";
  background: #c05c04;
  -webkit-transition-duration: 0.4s;
  -moz-transition-duration: 0.4s;
  -ms-transition-duration: 0.4s;
  -o-transition-duration: 0.4s;
  transition-duration: 0.4s;
}
.brick-message .content .rbtn:hover::after {
  width: 100%;
}
.brick-message .content .btn-sub {
  position: relative;
  z-index: 2;
  display: block;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  font-size: 14px;
  line-height: 22px;
  color: #fff;
  text-align: center;
  text-align: center;
  cursor: pointer;
  background: transparent;
  border: none;
  outline: none;
}
.home-form {
  width: 100%;
}

@media only screen and (max-width: 1200px) {
  .brick-message {
    .wrap {
      width: 100%;
      max-width: 610px;
      padding: 0 20px;
      margin: 0 auto;
      .content {
        flex-direction: column;
        width: 100%;
      }
    }
  }
  .col.sm-col12 {
    float: left;
    width: 100% !important;
  }
  .col.sm-col1 {
    width: 8.33333333%;
  }
  .col.sm-col2 {
    width: 16.66666667%;
  }
  .col.sm-col3 {
    width: 25%;
  }
  .col.sm-col4 {
    width: 33.33333333%;
  }
  .col.sm-col5 {
    width: 41.66666667%;
  }
  .col.sm-col6 {
    width: 50%;
  }
  .col.sm-col7 {
    width: 58.33333333%;
  }
  .col.sm-col8 {
    width: 66.66666667%;
  }
  .col.sm-col9 {
    width: 75%;
  }
  .col.sm-col10 {
    width: 83.33333333%;
  }
  .col.sm-col11 {
    width: 91.66666667%;
  }
  .rbtn::after {
    display: none;
  }
}
</style>
