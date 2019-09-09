<template>
  <transition name="message-fade">
    <div class="login-modal" v-if="value">
      <div class="modal-content">
        <div class="close" @click="close">
          <span class="iconfont iconxiaochazi"></span>
        </div>

        <div class="left">
          <p class="title">请先登录</p>
          <p class="sub-title">
            即刻登陆真人娱乐城、体育菠菜、彩票游戏、电子游艺平面
          </p>

          <div class="input-wrap">
            <input
              v-model="username"
              type="text"
              class="input"
              @focus="focus(1)"
              @blur="blur(1)"
              placeholder="请输入账号"
              maxlength="24"
            />

            <div class="pre" ref="ref1">
              <i class="iconfont iconzhanghao"></i>
            </div>
          </div>

          <div class="input-wrap">
            <input
              v-model="password"
              type="password"
              class="input"
              @focus="focus(2)"
              @blur="blur(2)"
              placeholder="请输入密码"
              maxlength="24"
            />

            <div class="pre" ref="ref2">
              <i class="iconfont iconmima"></i>
            </div>
          </div>

          <div class="login-button" @click="login">
            立即登录
            <span class="loading" v-if="loading">
              <vue-loading
                type="bars"
                color="#fff"
                :size="{ width: '15px', height: '15px' }"
              ></vue-loading>
            </span>
          </div>

          <p class="forget" @click="forgetpwd">忘记密码</p>
        </div>

        <div class="right">
          <img src="/image/logo.png" alt />
          <p class="text">尚未成为会员，现在立刻注册</p>

          <div class="reg-btn" @click="routeTo('/register')">免费注册</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { VueLoading } from 'vue-loading-template';
import { user_login } from '@/service/index';
export default {
  components: {
    VueLoading,
  },
  props: {
    value: Boolean,
  },
  data() {
    return {
      username: '',
      password: '',
      loading: false,
    };
  },
  methods: {
    forgetpwd() {
      this.$router.push('/register/forget');
      this.close();
    },
    close() {
      this.$emit('input', false);
    },

    routeTo(path) {
      this.$emit('input', false);
      this.$router.push(path);
    },

    focus(i) {
      const ref = this.$refs[`ref${i}`];

      ref.className = 'pre active';
    },
    blur(i) {
      const ref = this.$refs[`ref${i}`];

      ref.className = 'pre ';
    },
    async login() {
      if (this.loading) {
        return;
      }
      if (!this.username) {
        this.$Message.error('请输入用户名!');
        return;
      }
      if (!this.password) {
        this.$Message.error('请输入密码');
        return;
      }
      const params = {
        userName: this.username,
        password: this.password,
      };
      this.loading = true;
      const res = await user_login(params);
      this.loading = false;
      if (res.status < 400) {
        this.$Message.success('登录成功!');
        localStorage.setItem('token', res.data.accessToken);
        this.$store.commit('set_login_status', true);
        this.$store.dispatch('get_user_info');
        this.$emit('input', false);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.login-modal {
  position: fixed;
  z-index: 200;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 1;
  background: rgba(0, 0, 0, 0.7);

  .modal-content {
    width: 820px;
    height: 500px;
    margin: 0 auto;
    margin-top: 140px;
    background: #fff;
    border-radius: 6px;
    display: flex;
    position: relative;
    .close {
      position: absolute;
      right: 0;
      top: 0;
      width: 29px;
      height: 29px;
      background: #fff;
      border-radius: 0px 6px 0px 0px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      &:hover {
        background: #fac000;
        color: #fff;
      }
    }

    .left {
      width: 411px;
      height: 100%;
      padding-left: 24px;
      padding-top: 70px;
      padding-right: 30px;
      .title {
        font-size: 36px;
        font-family: PingFang SC;
        font-weight: 600;
        color: rgba(0, 0, 0, 1);
        line-height: 29px;
      }

      .sub-title {
        padding-top: 15px;
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        line-height: 29px;
      }

      .input-wrap {
        margin-top: 24px;
        position: relative;
        overflow: hidden;
      }

      .input {
        border-radius: 6px;
        outline: none;
        border: 2px solid rgba(194, 194, 194, 1);
        height: 37px;
        width: 100%;
        padding-left: 50px;
        font-size: 14px;
        &:focus {
          border-color: #97621d;
        }
      }
      .pre {
        position: absolute;
        top: 2px;
        left: 2px;
        width: 40px;
        height: 33px;
        background: #eeeeee;
        border-radius: 6px 0 0 6px;
        text-align: center;
        line-height: 33px;
        color: #919191;
        transition: all 0.2s;
      }
      .active {
        background: #97621d;
        color: #fff;
        border-radius: 0px;
      }

      .login-button {
        width: 300px;
        height: 46px;
        background: #97621d;
        border-radius: 6px;
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        display: flex;
        align-items: center;
        justify-content: center;
        user-select: none;
        margin: 0 auto;
        margin-top: 100px;
        cursor: pointer;
        position: relative;
        .loading {
          position: absolute;
          top: 9px;
          right: 72px;
        }
        &:hover {
          background: #b07221;
        }
      }

      .forget {
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 600;
        text-decoration: underline;
        color: rgba(128, 128, 128, 1);
        line-height: 29px;
        cursor: pointer;
        user-select: none;
        text-align: center;
        margin-top: 20px;
        &:hover {
          color: #000000;
        }
      }
    }

    .right {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      background: linear-gradient(
        180deg,
        rgba(57, 34, 5, 1),
        rgba(24, 14, 1, 1)
      );

      .text {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 29px;
        margin-top: 20px;
      }

      .reg-btn {
        width: 125px;
        height: 36px;
        border: 1px solid rgba(255, 255, 255, 1);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        user-select: none;
        cursor: pointer;
        margin-top: 20px;
        &:hover {
          background: #97621d;
        }
      }
    }
  }
}
</style>
