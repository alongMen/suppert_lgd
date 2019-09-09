<template>
  <div class="personal user-center-main-area">
    <p class="title">登录密码</p>
    <div class="alert">设置登录密码</div>
    <Form :model="form" :label-width="80" ref="form" :rules="rules" style="width:300px;margin:30px 0;">
        <FormItem label="原登录密码">
            <Input v-model="form.oldPassword" type="password" placeholder="请输入当前登录密码"></Input>
        </FormItem>
        <FormItem label="新登录密码">
            <Input v-model="form.newPassword" type="password" placeholder="请输入新密码"></Input>
        </FormItem>
        <FormItem label="新密码确认">
            <Input v-model="form.confirmPassword" type="password" placeholder="请确认新密码"></Input>
        </FormItem>
    </Form>

    <div class="btn-common" @click="saveLoginpass">保存</div>
  </div>
</template>

<script>
import { change_login_password } from "@/service/index";
import Loading from "@/components/loading/index";
import Input from "@/components/my-input/index";

export default {
  components: {
    Loading,Input
  },
  data() {
    return {
      loading: true,
      form:{},
      rules: {
        oldPassword: [{ required: true, message: '请填写原始密码', trigger: 'blur' }],
        newPassword: [{ required: true, message: '请填写新密码', trigger: 'blur' }],
        confirmPassword: [{ required: true, message: '请填写新密码', trigger: 'blur' }]
      },
    };
  },
  computed:{
    user_info() {
      return this.$store.state.base.user_info;
    },
  },
  methods: {
    async saveLoginpass(){
      if(!this.form.oldPassword || this.form.oldPassword.length == 0){
        this.$Message.error('请输入当前登录密码！')
        return false
      }
      if(!this.form.newPassword || this.form.newPassword.length == 0){
        this.$Message.error('请输入新登录密码！')
        return false
      }
      if(this.form.confirmPassword !== this.form.newPassword){
        this.$Message.error('两次密码不一致！')
        return false
      }
      this.loading = true
      const res = await change_login_password(this.form);
      this.loading = false

      if(res.status<400){
        this.$Message.success('保存成功！')
        this.$store.dispatch('get_user_info');
      }
    },
  },
  created() {

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
}
</style>