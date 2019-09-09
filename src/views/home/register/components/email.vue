<template>
  <div class="email-reg">
    <div class="title">邮箱注册</div>
    <div class="form">
      <Form :model="form" label-position="top" ref="form" :rules="rules">
        <FormItem label="登陆账号" prop="userName">
          <Input v-model="form.userName" placeholder="请输入登陆账号"></Input>
        </FormItem>
        <FormItem label="登录密码" prop="password">
          <Input
            v-model="form.password"
            placeholder="请输入登录密码"
            type="password"
          ></Input>
        </FormItem>
        <FormItem label="确认密码" prop="passwordConfirm">
          <Input
            v-model="form.passwordConfirm"
            placeholder="请输入确认密码"
            type="password"
          ></Input>
        </FormItem>
        <FormItem label="验证码" prop="validCode">
          <Input v-model="form.validCode" placeholder="请输入验证码">
            <span slot="append">
              <loading-button
                :text="btnTxt"
                :disabled="btnTxt !== '发送验证码'"
                @handleClick="getCode"
                padding="0 5px"
              ></loading-button>
            </span>
          </Input>
        </FormItem>
        <FormItem label="邀请码">
          <Input
            v-model="form.promotionCode"
            placeholder="请输入邀请码"
          ></Input>
        </FormItem>
      </Form>

      <PrimaryButton
        @onClick="ok()"
        :text="'确认提交'"
        :loading="btnLoading"
        :radius="true"
        style="width:150px;"
      />
    </div>
  </div>
</template>

<script>
import { Form, Input } from 'iview';
import LoadingButton from '@/components/loading-button/index';
import { get_mail_code, user_register, user_login } from '@/service/index';
import PrimaryButton from '@/components/primary-button/index';
export default {
  components: {
    Form: Form,
    LoadingButton,
    FormItem: Form.Item,
    Input: Input,
    PrimaryButton,
  },
  props: {
    promotionCode: String,
    promotionCodeShow: {
      default: () => false,
      type: Boolean,
    },
  },
  data() {
    const validRepwd = (rule, value, cb) => {
      if (this.form.password && value !== this.form.password) {
        cb(new Error('两次密码不相同'));
      } else {
        cb();
      }
    };
    const validPwd = (rule, value, cb) => {
      const rep = /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,20}$/;
      if (value && !rep.test(value)) {
        cb(new Error('密码为6到20位之间数字字母组合'));
      } else {
        cb();
      }
    };
    const validUsername = (rule, value, cb) => {
      const rep = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/;
      if (value && !rep.test(value)) {
        cb(new Error('请输入正确邮箱'));
      } else {
        cb();
      }
    };
    return {
      form: {
        validIdentity: '',
        registerType: 3,
      },
      imageBase64: '',
      btnLoading: false,
      promotion: '',
      timer: null,
      btnTxt: '发送验证码',
      rules: {
        userName: [
          { required: true, message: '必填项', trigger: 'blur' },
          { validator: validUsername, trigger: 'blur' },
        ],
        password: [
          { required: true, message: '必填项', trigger: 'blur' },
          { validator: validPwd, trigger: 'blur' },
        ],
        passwordConfirm: [
          { required: true, message: '必填项', trigger: 'blur' },
          { validator: validRepwd, trigger: 'blur' },
        ],
        validCode: [{ required: true, message: '必填项', trigger: 'blur' }],
      },
    };
  },
  methods: {
    async ok() {
      if (this.btnLoading) return;

      const valid = await this.$refs.form.validate();
      if (!valid) return;
      this.btnLoading = true;

      const res = await user_register(this.form);
      this.btnLoading = false;
      if (res.status < 400) {
        const param = {
          userName: this.form.userName,
          password: this.form.password,
        };
        const resLogin = await user_login(param);
        localStorage.setItem('token', resLogin.data.accessToken);
        this.$store.dispatch('get_user_info');
        this.$store.commit('set_login_status', true);
      }
    },
    async getCode() {
      let reg1 = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/;
      if (!reg1.test(this.form.userName) || !this.form.userName) {
        this.$Message.error('请输入正确邮箱!');

        return false;
      }

      let s = 60;
      this.btnTxt = s + 's';
      this.timer = setInterval(() => {
        s--;
        this.btnTxt = s + 's';
        if (s === 1) {
          this.btnTxt = '发送验证码';
          clearInterval(this.timer);
          this.timer = null;
        }
      }, 1000);

      const res = await get_mail_code(1, this.form.userName);
      if (res.status < 400) {
        this.$Message.success('邮箱已发送请查收!');
        this.form.validIdentity = res.data;
      }
    },
  },
  mounted() {},
};
</script>

<style lang="less">
.email-reg {
  margin: 22px 0 32px 25px;
  .title {
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
    line-height: 24px;
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
