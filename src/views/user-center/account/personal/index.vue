<template>
  <div class="personal user-center-main-area">
    <p class="title">个人资料</p>
    <div class="alert">修改个人资料</div>
    <!-- <div class="avators">
      <div class="avatorbox">
        <img src="/image/avatar.png" alt class="avator" />
      </div>
      <div class="avatorbox">
        <div class="btnup">上传</div>
      </div>
    </div> -->
    <Form :model="form" :label-width="50" style="width:300px;margin:30px 0;">
      <FormItem label="昵称">
        <Input v-model="form.nickName" placeholder="请输入您的昵称"></Input>
      </FormItem>
      <FormItem label="微信">
        <Input v-model="form.weiXin" placeholder="请输入您的微信"></Input>
      </FormItem>
      <FormItem label="QQ">
        <Input v-model="form.qq" placeholder="请输入您的QQ"></Input>
      </FormItem>
    </Form>

    <div class="btn-common" @click="savePersonal">保存</div>
  </div>
</template>

<script>
import { change_member_profile } from '@/service/index';
import Loading from '@/components/loading/index';
import Input from '@/components/my-input/index';

export default {
  components: {
    Loading,
    Input,
  },
  data() {
    return {
      loading: true,
      form: {},
    };
  },
  computed: {
    user_info() {
      return this.$store.state.base.user_info;
    },
  },
  methods: {
    async savePersonal() {
      const res = await change_member_profile(this.form);
      if (res.status < 400) {
        this.$Message.success('保存成功！');
        this.$store.dispatch('get_user_info');
      }
    },
  },
  created() {
    this.$set(this.form, 'nickName', this.user_info.nickName);
    this.$set(this.form, 'weiXin', this.user_info.weiXin);
    this.$set(this.form, 'qq', this.user_info.qq);
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
  .avators {
    display: flex;
    .avatorbox {
      position: relative;
      width: 90px;
      height: 90px;
      margin-right: 10px;
      background: url('/image/defaultbg.png') no-repeat;
      background-position: center;
      background-size: 50px 50px;
      background-color: rgba(0, 0, 0, 1);
      border-radius: 50%;
      overflow: hidden;
      .avator {
        display: block;
        width: 100%;
        height: 100%;
      }
      .btnup {
        cursor: pointer;
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 27px;
        line-height: 27px;
        text-align: center;
        color: #ccc;
        font-size: 12px;
        background-color: #3b3b3b;
      }
    }
  }
}
</style>
