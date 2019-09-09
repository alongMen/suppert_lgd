<template>
  <div class="forget-mail">
    <Form :model="form" label-position="top" ref="form" :rules="rules">
      <FormItem>
        <span class="title"
          >已绑定邮箱：<span class="tail">{{ check.eMail }}</span></span
        >
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
      <FormItem label="登录密码" prop="newPassword">
        <Input
          v-model="form.newPassword"
          placeholder="请输入登录密码"
          type="password"
        ></Input>
      </FormItem>
      <FormItem label="确认密码" prop="confirmPassword">
        <Input
          v-model="form.confirmPassword"
          placeholder="请输入确认密码"
          type="password"
        ></Input>
      </FormItem>
    </Form>
    <PrimaryButton
      @onClick="ok()"
      :text="'确认更改'"
      :loading="btnLoading"
      :radius="true"
      style="width:150px;"
    />
  </div>
</template>

<script>
import LoadingButton from '@/components/loading-button/index';
import { Form, Input } from 'iview';
import { get_mail_code, forget_pass_reset } from '@/service/index';
import PrimaryButton from '@/components/primary-button/index';
export default {
  components: {
    PrimaryButton,
    LoadingButton,
    Form: Form,
    FormItem: Form.Item,
    Input: Input,
  },
  props: {
    code: String,
    check: Object,
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
    return {
      btnTxt: '发送验证码',
      btnLoading: false,
      form: {},
      rules: {
        newPassword: [
          { required: true, message: '必填项', trigger: 'blur' },
          { validator: validPwd, trigger: 'blur' },
        ],
        confirmPassword: [
          { required: true, message: '必填项', trigger: 'blur' },
          { validator: validRepwd, trigger: 'blur' },
        ],
        validCode: [{ required: true, message: '必填项', trigger: 'blur' }],
      },
    };
  },
  methods: {
    async getCode() {
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

      const res = await get_mail_code(4, this.code);
      if (res.status < 400) {
        this.form.validIdentity = res.data;
        this.$Message.success('邮件已发送请查收!');
        // this.$tips({
        //   type: 'success',
        //   message: '邮件已发送请查收!'
        // });
      }
    },
    async ok() {
      const valid = await this.$refs.form.validate();
      if (!valid) return;
      this.btnLoading = true;
      const res = await forget_pass_reset(this.code, this.form);
      this.btnLoading = false;
      if (res.status < 400) {
        this.$Message.success('修改成功，请重新登陆!');

        // this.$router.push("/login");
      }
    },
  },
};
</script>

<style lang="less">
.forget-email {
  .title {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 24px;
    .tail {
      color: #fac000;
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
