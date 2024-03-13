<template>
  <div class="row-message">
    <div class="col-box">
      <div class="form-title">
        {{$t('msg.inquire')}}:
      </div>
      <div class="form-content">
        <div class="form-inner">
          <el-form ref="form" :rules="rules" :model="form">
            <div class="form-left">
              <div class="form-brick brick-one">
                <el-form-item
                  class="item-goods"
                 :label="$t('msg.productName')"
                  :maxlength="100"
                >
                  <el-input v-model="form.goodsName"></el-input>
                </el-form-item>
                <el-form-item :label="$t('msg.qty')" prop="qty" :maxlength="20">
                  <el-input
                    type="number"
                    v-model="form.qty"
                    m
                    minlength="1"
                    class="ipt-number"
                  ></el-input>
                </el-form-item>
                <el-form-item :label="$t('msg.unit')" prop="unit" :maxlength="20">
                  <el-input v-model="form.unit"></el-input>
                </el-form-item>
              </div>
              <div class="form-brick brick-area">
                <el-form-item :label="$t('msg.specification')" prop="specification">
                  <el-input
                    type="textarea"
                    class="ipt-area"
                    v-model="form.specification"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="form-right">
              <div class="contact-tit">
                     {{ $t('msg.contactInfomation')}}：
              </div>

             <div class="form-brick-ne ">
                 <el-form-item :label="$t('msg.name')" prop="name" :inline="true" class="item-name">
                <el-input v-model="form.name" :maxlength="20"></el-input>
              </el-form-item>
              <el-form-item :label="$t('msg.email')" prop="email">
                <el-input v-model="form.email"></el-input>
              </el-form-item>
             </div>
              <el-form-item :label="$t('msg.mobile')" prop="mobile" class="item-mobile">
                <el-input v-model="form.mobile" :maxlength="20"></el-input>
              </el-form-item>
              <el-form-item :label="$t('msg.address')" prop="address" class="item-address">
                <el-input v-model="form.address" :maxlength="200"></el-input>
              </el-form-item>
            </div>
          </el-form>
          <div class="form-action">
            <el-button type="warning" class="form-submit" @click="submitForm">
              {{$t('msg.submit')}}
            </el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="col-box col-about">
      <div class="company-content">
        <div class="company-notice">
          <h3>
           {{ $t('msg.notice')}}
          </h3>
          <div class="c-content">
            <div v-html="config.notice"></div>
          </div>
        </div>
        <div class="company-contact">
          <h3>
           {{ $t('msg.contactInfomation')}}
          </h3>
          <div class="c-content">
            <div v-html="config.contact"></div>
            <p class="where-buy">
              <el-button class="btn-buy" type="warning">
                {{$t("msg.where")}} ?
              </el-button>
            </p>
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

@Component({
  components: {}
})
export default class extends Vue {
  form = {
    goodsName: "",
    qty: "",
    unit: "",
    Specification: "",
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

  async mounted() {}

  // 提交表单
  async submitForm() {
    let pass: any = true;

    (this.$refs["form"] as any).validate((valid: boolean) => {
      pass = valid;
      if (!valid) {
        return false;
      }
    });

    if (!pass) return false;

    const result: any = await addMessage(this.form).then(
      (res: any) => res.data
    );



    if (result) {
      if (process.client) {
        this.$message({
          type: "success",
          message: "提交成功！"
        });
      }
      (this.$refs["form"] as any).resetFields();
    } else {
        if (process.client) {
        this.$message({
          type: "error",
          message: "提交失败！"
        });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$themColor: #e56c00;
.row-message {
  display: flex;
  justify-content: space-between;
  min-height: 100px;
  padding: 25px 120px 40px 120px;
  background: #fff;
  .col-box {
    flex: 1;
  }

  .form-submit {
    background-color: $themColor;
    border-color: $themColor;
    &:hover {
      background-color: #e56b00be;
      border-color: #e56b00be;
    }
  }
  .where-buy {
    text-align: center;
    .btn-buy {
      cursor: auto;
      background-color: $themColor;
      border-color: $themColor;
    }
  }
  .form-title {
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: bold;
    color: #606266;
  }
  .brick-area {

    ::v-deep .el-form-item {
      margin-bottom: 0;
    }
  }

  .form-content {
    .form-inner {
      display: flex;
    }
    .form-action {
      align-self: flex-end;
      width: 140px;
      padding-bottom:20px;
      margin-top:0;
      text-align: right;
    }
    .el-form {
      display: flex;
      flex: 1;
      justify-content: space-between;
    }

    .brick-one {
      display: flex;
      .el-form-item {
        flex: 1;
        margin-right: 30px;

        &:first-child {
          flex: auto;
          width: 20%;
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }
    ::v-deep .el-form-item {
      margin-bottom: 20px;

      &.item-mobile {
        margin-bottom: 10px;
      }


    }
    .form-left {
      width: 55%;
      margin-right: 50px;
      ::v-deep .el-textarea__inner {
        height: 139px;
      }
    }
    .form-right {
      .contact-tit {

        font-weight: bold;
      line-height: 32px;
        color: #606266;
      }
      .el-form-item {
        display: flex;
        .ipt-area {
          ::v-deep .el-textarea__inner {
            height: 150px;
          }
        }
        &.item-address {
          flex-direction: column;
        }

        ::v-deep .el-form-item__label {
          width: 70px;
          text-align: left;
        }
      }
    }
  }
  .company-content {
    padding-left: 10%;
    h3 {
      font-size: 20px;
      color: $themColor;
    }
  }
}

.ipt-number ::v-deep .el-input__inner {
  padding-right: 0;
}
@media screen and (max-width: 1200px) {
  .row-message {
    padding: 20px 20px;

    .form-content {
      .form-left {
        width: 60%;
        margin-right: 20px;
      }
      .form-right {
      }
      .form-action {
        width: 100px;


      }
    }
    .col-about {
      display: none;
    }
  }
}
@media screen and (max-width: 750px) {
  .form-content {
    .form-inner{
     flex-direction: column;
     .form-action{
       align-self:flex-start;
       width:100%;
       text-align: left;
       .el-button{
         width:100%
       }
     }
    }
   .el-form {
      display: flex;
      flex: 1;
      flex-direction: column;

      .form-left{
        width:100%;
        margin-bottom:0px;
          ::v-deep .el-textarea__inner {
          height: 100px;
          }
      }
      .form-right {
        .contact-tit {
          font-weight: bold;
        }
      }
      .el-form-item{
          flex-direction: column;
      }
      .form-brick-ne{
          display: flex;
           .el-form-item{
             flex:1;
             &:first-child{
               margin-right:10px;
             }
            &:last-child{
               margin-left:10px;
             }
           }
      }
      ::v-deep .el-form-item__label{
        display: block;
        width:100%;
        text-align: left;
      }
    }
  }
}
</style>
