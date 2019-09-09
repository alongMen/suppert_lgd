<template>
  <div class="forget-pwd">
    <div class="header">
      <span class="title">{{ title }}</span>
      <a
        href="javascript:void(0)"
        class="service"
        @click="toService()"
        v-if="showA"
        >无法找回密码？联系客服</a
      >
    </div>

    <div class="form">
      <div v-if="step === 1">
        <Form :model="form" label-position="top" ref="form" :rules="rules">
          <FormItem label="登陆账号" prop="userName">
            <Input v-model="form.userName" placeholder="请输入登陆账号"></Input>
          </FormItem>
          <FormItem label="验证码" prop="validCode">
            <Input v-model="form.validCode" placeholder="请输入验证码">
              <span slot="append"
                ><img
                  :src="'data:text/javascript;base64,' + imageBase64"
                  @click="get_image_captcha"
                  style="height:40px"
              /></span>
            </Input>
          </FormItem>
        </Form>

        <PrimaryButton
          @onClick="ok()"
          :text="'下一步'"
          :loading="btnLoading"
          :radius="true"
          style="width:150px;"
        />
      </div>
      <select-form
        v-if="step === 2"
        :check="check"
        @toService="toService"
        @setShowA="setShowA"
        @setStep="setStep"
        @setTitle="setTitle"
      />
      <phone :code="code" v-if="step === 3" :check="check" />
      <email :code="code" v-if="step === 4" :check="check" />
    </div>
  </div>
</template>

<script>
import { Form, Input } from 'iview';
import SelectForm from './select';
import Phone from './phone';
import Email from './email';
import PrimaryButton from '@/components/primary-button/index';
import { get_image_captcha, forget_pass } from '@/service/index';
export default {
  components: {
    PrimaryButton,
    Email,
    Phone,
    SelectForm,
    Form: Form,
    FormItem: Form.Item,
    Input: Input,
  },
  computed: {
    serviceUrl() {
      return this.$store.state.base.site_info.serviceUrl;
    },
  },
  data() {
    return {
      step: 1,
      title: '选择找回方式',
      code: '',
      check: {},
      form: {
        validIdentity: '',
      },
      imageBase64: '',
      showA: true,
      btnLoading: false,
      rules: {
        userName: [{ required: true, message: '必填项', trigger: 'blur' }],
        validCode: [{ required: true, message: '必填项', trigger: 'blur' }],
      },
    };
  },
  methods: {
    toService() {
      window.open(this.serviceUrl, '_blank');
    },
    setShowA(bool) {
      this.showA = bool;
    },
    setStep(step) {
      this.step = step;
    },
    setTitle(title) {
      this.title = title;
    },
    async ok() {
      if (this.btnLoading) return;

      const valid = await this.$refs.form.validate();
      if (!valid) return;
      this.btnLoading = true;

      const res = await forget_pass(this.form);
      this.btnLoading = false;
      if (res.status < 400) {
        this.step = 2;
        this.title = '选择找回方式';
        this.code = res.data.code;
        this.check = res.data;
      }
    },
    async get_image_captcha() {
      const res = await get_image_captcha(4);
      if (res.status < 400) {
        this.imageBase64 = res.data.code;
        this.form.validIdentity = res.data.no;
      }
    },
  },
  mounted() {
    this.get_image_captcha();
  },
};
</script>

<style lang="less">
.forget-pwd {
  margin: 22px 0 32px 25px;
  .header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .title {
      font-size: 20px;
      font-family: PingFang SC;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
      line-height: 24px;
    }
    .service {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      text-decoration: underline;
      color: rgba(164, 164, 164, 1);
      line-height: 29px;
      margin-left: 21px;
    }
  }

  .form {
    margin: 42px 0 0 1px;
    .ivu-form-item-label {
      float: none;
      display: inline-block;
      padding: 0 0 10px 0;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 24px;
    }
    .ivu-input-wrapper {
      width: 360px;
    }
    .ivu-input {
      height: 40px;
      background: rgba(27, 27, 27, 1);
      border: 1px solid rgba(48, 48, 48, 1);
      box-shadow: 0px 1px 0px 0px rgba(26, 26, 26, 1);
      border-radius: 4px;
    }
    .ivu-input-group-append {
      padding: 0;
      border: 0px;
      background-color: rgba(27, 27, 27, 1);
    }
  }
}
</style>
