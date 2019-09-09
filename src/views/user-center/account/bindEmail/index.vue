<template>
  <div class="personal user-center-main-area">
    <p class="title">绑定邮箱</p>
    <div class="alert">
      {{ isBind ? '您已经绑定了邮箱，请先解除绑定' : '您尚未绑定邮箱' }}
    </div>
    <div class="isbindMobile" v-if="isBind">
      已经绑定邮箱：
      <span class="mobile">{{ form.email.substring(0, 2) }}</span>
      <span class="mobile">*****</span>
      <span class="mobile">{{
        form.email.substring(form.email.indexOf('@'))
      }}</span>
    </div>
    <div class="phoneipt" v-if="!isBind">
      <div class="label">邮箱</div>
      <Input
        v-model="form.email"
        class="code"
        placeholder="请输入您的邮箱账号"
      ></Input>
    </div>
    <div class="form">
      <div class="label">验证码</div>
      <Input
        v-model="form.code"
        class="code"
        placeholder="请输入您的短信验证码"
      ></Input>
      <div class="getCode" @click="getCode">{{ codeText }}</div>
    </div>
    <div class="tils" v-if="isBind">
      *注意点击验证码获取后将系统将自动发送验证码短信至您的绑定手机上，请注意查收～
    </div>

    <div class="btn-common btn" @click="cancelBind" v-if="isBind">解绑</div>
    <div class="btn-common btn" @click="handlebind" v-if="!isBind">绑定</div>
  </div>
</template>

<script>
import { get_mail_code, bind_email } from '@/service/index';
import Loading from '@/components/loading/index';
import Input from '@/components/my-input/index';

export default {
  components: {
    Loading,
    Input,
  },
  data() {
    return {
      codeText: '获取验证码',
      timer: null,
      loading: true,
      isBind: false,
      form: {
        code: '',
        email: '',
      },
    };
  },
  computed: {
    user_info() {
      return this.$store.state.base.user_info;
    },
  },
  methods: {
    async getCode() {
      this.loading = true;
      let reg1 = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/;
      if (!reg1.test(this.form.email) || !this.form.email) {
        this.$Message.error('请输入正确邮箱账号');
        return false;
      }
      let s = 60;
      this.timer = setInterval(() => {
        s--;
        this.codeText = `${s}s`;
        if (s === 0) {
          clearInterval(this.timer);
          this.timer = null;
          this.codeText = '获取验证码';
        }
      }, 1000);

      const res = await get_mail_code(2, this.form.email);
      this.loading = false;
      if (res.status < 400) {
        this.$Message.success('验证码已发送至邮箱请查收!');
        this.form.validIdentity = res.data;
      }
    },
    async cancelBind() {
      this.loading = true;
      if (!this.form.validCode) {
        this.$Message.error('请输入短信息验证码!');
      }
      this.loading = true;
      const res = await bind_email(this.form);
      this.loading = false;
      if (res.status < 400) {
        this.$Message.success('解绑成功!');
        this.$store.dispatch('get_user_info');
      }
    },
    async handlebind() {
      if (!this.form.validCode) {
        this.$Message.error('请输入短信息验证码!');
      }
      this.loading = true;
      const res = await bind_email(this.form);
      this.loading = false;
      if (res.status < 400) {
        this.$Message.success('绑定成功!');
        this.$store.dispatch('get_user_info');
      }
    },
  },

  created() {
    // console.log(this.user_info);
    this.$set(this.form, 'email', this.user_info.email);
    if (this.form.email) {
      this.isBind = true;
    }
  },
};
</script>

<style lang="less" scoped>
.personal {
  .itle {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #ffffff;
  }
  .alert {
    padding: 0 10px;
    margin: 20px 0;
    width: 812px;
    height: 31px;
    background: #1c1c1c;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .isbindMobile {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 24px;
    .mobile {
      color: #fac000;
    }
  }
  .phoneipt {
    width: 100%;
    margin: 10px 0;
    display: flex;
    .label {
      line-height: 26px;
      color: #ffffff;
    }
    .code {
      width: 200px;
      margin: 0 10px;
    }
  }
  .form {
    width: 100%;
    margin: 30px 0 5px;
    display: flex;
    .label {
      line-height: 26px;
      color: #ffffff;
    }
    .code {
      width: 200px;
      margin: 0 10px;
    }
    .getCode {
      cursor: pointer;
      color: #ffffff;
      background: url(/image/sprite/sprite.png) -182px -795px no-repeat;
      width: 66px;
      height: 26px;
      line-height: 26px;
      text-align: center;
      display: inline-block;
      &:hover {
        background: url(/image/sprite/sprite.png) -524px -795px no-repeat;
      }
    }
  }
  .tils {
    width: 100%;
    padding-left: 50px;
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(164, 164, 164, 1);
    line-height: 26px;
  }
  .btn {
    margin-top: 30px;
  }
}
</style>
