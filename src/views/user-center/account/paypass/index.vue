<template>
  <div class="personal user-center-main-area">
    <p class="title">支付密码</p>
    <div class="alert">设置支付密码</div>
    <Form
      :model="form"
      :label-width="90"
      ref="form"
      :rules="rules"
      style="width:300px;margin:30px 0;"
    >
      <FormItem label="原支付密码">
        <Input v-model="form.oldPayPassword" type="password" placeholder="原支付密码"></Input>
      </FormItem>
      <FormItem label="新支付密码">
        <Input v-model="form.newPayPassword" type="password" placeholder="请输入新密码"></Input>
      </FormItem>
      <FormItem label="确认支付密码">
        <Input v-model="form.confirmPayPassword" type="password" placeholder="请确认新密码"></Input>
      </FormItem>
    </Form>

    <p class="tils">忘记密码？点击此处咨询客服</p>

    <div class="btn-common" @click="saveLoginpass">保存</div>
  </div>
</template>

<script>
import { set_pay_password, change_pay_password } from "@/service/index";
import Loading from "@/components/loading/index";
import Input from "@/components/my-input/index";
import { setTimeout } from 'timers';

export default {
  components: {
    Loading,
    Input
  },
  data() {
    const validRepwd = (rule, value, cb) => {
      if (this.data.newPayPassword && value !== this.data.newPayPassword) {
        cb(new Error("两次密码不相同"));
      } else {
        cb();
      }
    };
    const validcode = (rule, value, cb) => {
      const rep = /^\d{6}$/;
      if (value && !rep.test(value)) {
        cb(new Error("验证码为6位纯数字"));
      } else {
        cb();
      }
    };
    const validPwd = (rule, value, cb) => {
      const rep = /^\d{6}$/;
      if (value && !rep.test(value)) {
        cb(new Error("密码为6位纯数字"));
      } else {
        cb();
      }
    };
    return {
      loading: true,
      form: {},
      isPayPassword: false,
      rules: {
        oldPayPassword: [
          { required: true, message: "请填写原始密码", trigger: "blur" },
          { validator: validPwd, trigger: "blur" }
        ],
        newPayPassword: [
          { required: true, message: "请填写新密码", trigger: "blur" },
          { validator: validPwd, trigger: "blur" }
        ],
        confirmPayPassword: [
          { validator: validRepwd, trigger: "blur" },
          { required: true, message: "请验证新密码", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    user_info() {
      return this.$store.state.base.user_info;
    }
  },
  methods: {
    async saveLoginpass() {
      // const valid = await this.$refs.form.validate();
      // if (!valid) return;
      this.loading = true;
      if (this.isPayPassword) {
        const res = await change_pay_password(this.form);
        this.loading = false;
        if (res.status < 400) {
          this.$Message.success("修改成功!");
        }
      } else {
        const res = await set_pay_password(this.form);
        this.loading = false;
        if (res.status < 400) {
          this.$Message.success("设置成功!");
          this.$store.dispatch("get_user_info");
        }
      }
    }
  },
  created() {
    // console.log(this.user_info)
    setTimeout(()=>{
      this.isPayPassword = this.user_info.isPayPassword
    },10)
    
  }
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
  .tils {
    cursor: pointer;
    font-size: 13px;
    font-family: PingFang SC;
    font-weight: 400;
    text-decoration: underline;
    color: rgba(128, 128, 128, 1);
    line-height: 34px;
    &:hover {
      color: #ffffff;
    }
  }
}
</style>