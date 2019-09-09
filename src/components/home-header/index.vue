<template>
  <div class="home-header">
    <div class="top">
      <img src="/image/logo.png" alt class="logo" />
      <img src="/image/header-extra.png" alt class="logopic" />
      <div class="login-form">
        <div class="entrance">
          <span class="item" @click="routeTo('activity')">最新活动</span>
          <span class="line"></span>
          <span class="item active" @click="routeTo('user-center/task/mission')">每日任务</span>
          <span class="line"></span>
          <span class="item" @click="routeTo('game-center/game-list/1')">真人</span>
          <span class="line"></span>
          <span class="item" @click="routeTo('game-center/game-list/2')">电游</span>
          <span class="line"></span>
          <span class="item" @click="routeTo('game-center/game-list/3')">体育</span>
          <span class="line"></span>
          <span class="item" @click="routeTo('game-center/game-list/4')">彩票</span>
          <span class="line"></span>
          <span class="item" @click="routeTo('game-center/game-list/5')">捕鱼</span>
          <span class="line"></span>
          <span class="item" @click="routeTo('game-center/game-list/6')">棋牌</span>
        </div>
        <div class="logininfo">
          <div class="loginbox" v-if="!isLogin">
            <div class="loginitem">
              <div class="user-pic"></div>
              <input type="text" class="useript" placeholder="请输入用户名" v-model="form.userName" />
              <div class="logbtn" @click="login">{{loginbtn}}</div>
            </div>
            <div class="loginitem">
              <div class="pwd-pic"></div>
              <input type="password" class="useript" placeholder="请输入密码" v-model="form.password" />
              <div class="pwsd" @click="forgetpwd">忘记密码？</div>
            </div>
          </div>
          <div class="Personalinfo" v-if="isLogin">
            <img src="/image/avatar.png" alt class="avator" />
            <div>
              <p class="usernameinfo">{{ user_info.userName || 'Who?' }}</p>
              <p class="balanceinfo">
                <span class="danwei">¥</span>
                {{ user_info.amount || '0.00' }}
                <!-- <span
                  class="iconfont icon-shuaxin refresh"
                  :class="{'rotate':rotate==true}"
                  @click="refresh"
                ></span>-->
                <img
                  src="/image/refresh.png"
                  alt
                  class="refresh"
                  :class="{ rotate: rotate == true }"
                  @click="refresh"
                />
              </p>
            </div>
          </div>
          <div class="registerbtn" @click="reg" v-if="isRegister">{{ loginmsg }}</div>
        </div>
      </div>
    </div>

    <div class="tab-bar">
      <div
        class="tab"
        @click="routeTo(item.route)"
        v-for="(item, index) in tabList"
        :key="index"
        :class="{tabActive:item.route == active}"
      >{{ item.name }}</div>

      <div class="service" @click="toService">
        <div class="linebgpic"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { user_login } from "@/service/index";
export default {
  data() {
    return {
      form: {
        userName: "",
        password: ""
      },
      loginbtn:'登 录',
      rotate: false,
      tabList: [
        {
          name: "首页",
          route: "index"
        },
        {
          name: "游戏中心",
          route: "game-center"
        },
        {
          name: "个人中心",
          route: "user-center"
        },
        {
          name: "活动中心",
          route: "activity"
        },
        {
          name: "下载中心",
          route: "download"
        },
        {
          name: "在线客服",
          route: "agent-center"
        }
      ],
      active: "",
      tabActive:'tabActive1',
      loading: false
    };
  },
  computed: {
    serviceUrl() {
      return this.$store.state.base.site_info.serviceUrl;
    },
    site_info() {
      return this.$store.state.base.site_info;
    },
    isRegister() {
      let bool = false;
      if (
        this.site_info.isRegister ||
        this.site_info.isPhoneRegister ||
        this.site_info.isMailRegister
      ) {
        bool = true;
      }
      return bool;
    },
    isLogin() {
      return this.$store.state.base.isLogin;
    },
    loginmsg() {
      if (!this.isLogin) {
        return "立即注册";
      } else {
        return "退出登录";
      }
    },
    user_info() {
      return this.$store.state.base.user_info;
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler: function(to) {
        if (to.matched.length > 1) {
          const name = to.matched[1].name;
          this.active = name;
          if(name=='index'){
            this.tabActive='tabActive1'
          }else{
            this.tabActive='tabActive'
          }
        }
      }
    }
  },
  methods: {
    async login() {
      if (this.loading) {
        return;
      }
      if (!this.form.userName) {
        this.$Message.error("请输入用户名!");
        return;
      }
      if (!this.form.password) {
        this.$Message.error("请输入密码");
        return;
      }

      this.loading = true;
      this.loginbtn = '登录中...'
      const res = await user_login(this.form);
      this.loading = false;
      if (res.status < 400) {
        this.loginbtn = '登 录'
        this.$Message.success("登录成功!");
        localStorage.setItem("token", res.data.accessToken);
        this.$store.dispatch("get_user_info");
        this.$store.commit("set_login_status", true);
      }
    },
    toService() {
      window.open(this.serviceUrl, "_blank");
    },
    async refresh() {
      this.rotate = true;
      await this.$store.dispatch("get_user_info");
      this.rotate = false;
    },

    forgetpwd() {
      this.$router.push("/register/forget");
    },
    routeTo(path) {
      if (path === "user-center") {
        if (!this.isLogin) {
          this.$store.commit("set_login_modal_status", true);
          return;
        } else {
          const { href } = this.$router.resolve({ path: `/${path}` });
          window.open(href, "_blank");
          return;
        }
      }

      this.$router.push(`/${path}`);
    },
    reg() {
      if (this.isLogin) {
        //to do 退出登录
        this.$store.commit("set_login_status", false);
        localStorage.removeItem("token");
      } else {
        this.$router.push("/register");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.home-header {
  width: 100%;
  // height: 120px;

  .tab-bar {
    position: relative;
    margin-top: 10px;
    width: 100%;
    height: 40px;
    background: url("/image/user-center/menu-bg.png");
    display: flex;
    .tab {
      width: 165px;
      height: 50px;
      display: flex;
      align-items: initial;
      line-height: 40px;
      justify-content: center;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 600;
      color: rgba(164, 164, 164, 1);
      padding-bottom: 10px;
      user-select: none;
      cursor: pointer;
      overflow: visible;
      // &:hover {
      //   background-image: url('/image/user-center/tab-active.png');
      //   background-size: 164px 60px;
      //   background-repeat: no-repeat;
      //   background-position: center;
      //   line-height: 60px;
      //   color: #fff;
      //   transform: translateY(-10px);
      //   text-align: center;
      //   justify-content: center;
      // }
      &:first-child {
        width: 194px;
      }
      &:first-child.tabActive {
        background: url("/image/sprite/hometab.png") no-repeat !important;
        transform: translateX(-20px) translateY(-20px) !important;
        align-items: initial !important;
        height: 69px !important;
        line-height: 80px !important;
      }
    }

    .tabActive {
      background-image: url("/image/user-center/tab-active.png");
      text-align: center;
      background-size: 164px 60px;
      background-repeat: no-repeat;
      line-height: 60px;
      color: #fff;
      transform: translateY(-10px);
      background-position: center;
    }
    .tabActive1 {
      background: url("/image/sprite/hometab.png") no-repeat !important;
      transform: translateX(-20px) translateY(-20px) !important;
      align-items: initial !important;
      height: 69px !important;
      line-height: 80px !important;
      color: #fff
    }

    .service {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 600;
      color: rgba(164, 164, 164, 1);
      padding-bottom: 10px;
      user-select: none;
      cursor: pointer;
      overflow: visible;
      position: absolute;
      right: 0;
      bottom: -22px;
      width: 164px;
      height: 66px;
      background-image: url("/image/user-center/service-bg.png");
      background-repeat: no-repeat;
      transform: translateY(-10px);
      padding-left: 24px;
      padding-bottom: 0;
      .linebgpic {
        width: 104px;
        height: 30px;
        background: url("/image/sprite/sprite.png") -314px -795px no-repeat;
      }
      &:hover .linebgpic {
        background: url("/image/sprite/sprite.png") -419px -795px no-repeat;
      }
    }
  }

  .top {
    width: 1000px;
    display: flex;
    justify-content: space-between;
    .logopic {
      padding-top: 10px;
      height: 120px;
    }
    .login-form {
      .Personalinfo {
        padding: 10px;
        display: flex;
        .avator {
          display: block;
          width: 54px;
          height: 54px;
          border-radius: 100%;
          overflow: hidden;
          margin-right: 10px;
        }
        .usernameinfo {
          font-size: 20px;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 24px;
        }
        .balanceinfo {
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #fac000;
          line-height: 34px;
          .danwei {
            font-size: 12px;
            color: #fff;
            padding-right: 5px;
          }
          .refresh {
            &:hover {
              // color: #fff;
              opacity: 1;
            }
            opacity: 0.6;
            width: 18px;
            height: 18px;
            // color: rgb(161, 158, 158);
            vertical-align: middle;
            margin-left: 10px;
            cursor: pointer;
          }
          .rotate {
            animation: mymove 2s;
          }
          @keyframes mymove {
            to {
              transform: rotate(495deg);
              opacity: 1;
            }
          }
        }
      }
      .logininfo {
        padding: 10px;
        padding-right: 0;
        box-sizing: border-box;
        width: 400px;
        height: 80px;
        display: flex;
        justify-content: space-around;
        .registerbtn {
          cursor: pointer;
          margin-top: 10px;
          width: 130px;
          height: 60px;
          line-height: 60px;
          text-align: center;
          font-weight: 700;
          color: #fff;
          background: url("/image/sprite/sprite.png") -618px -607px no-repeat;
          &:hover {
            background: url("/image/sprite/sprite.png") -488px -607px no-repeat;
          }
        }
        .loginbox {
          flex: 1;
          margin-right: 10px;
          box-sizing: border-box;
          .loginitem {
            width: 100%;
            display: flex;
            margin-top: 10px;
            justify-content: space-around;
            .user-pic {
              margin-top: 5px;
              height: 26px;
              width: 17px;
              margin-right: 5px;
              background: url("/image/sprite/sprite.png") -928px -795px
                no-repeat;
            }
            .pwd-pic {
              margin-top: 5px;
              height: 26px;
              width: 17px;
              margin-right: 5px;
              background: url("/image/sprite/sprite.png") -862px -795px
                no-repeat;
            }
            .useript {
              color: #fff;
              outline: none;
              width: 150px;
              height: 26px;
              background: rgba(27, 27, 27, 1);
              border: 1px solid rgba(36, 36, 36, 1);
              border-radius: 4px;
              padding-left: 10px;
            }
            .logbtn {
              cursor: pointer;
              text-align: center;
              line-height: 26px;
              color: #fff;
              width: 66px;
              height: 26px;
              background: url("/image/sprite/sprite.png") -524px -795px
                no-repeat;
              &:hover {
                background: url("/image/sprite/sprite.png") -590px -795px
                  no-repeat;
              }
            }
            .pwsd {
              text-decoration: underline;
              width: 66px;
              height: 26px;
              text-align: center;
              line-height: 26px;
              color: #fff;
              cursor: pointer;
            }
          }
        }
      }
      .entrance {
        padding-top: 10px;
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        .item {
          padding: 0 10px;
          cursor: pointer;
          user-select: none;
          &:hover {
            color: #ffc000;
          }
        }
        .line {
          width: 1px;
          height: 10px;
          background: #a4a4a4;
          display: inline-block;
        }

        .active {
          color: #ffc000;
        }
      }
    }
  }
  .login-btn {
    width: 66px;
    height: 26px;
    background: linear-gradient(
      0deg,
      rgba(248, 252, 158, 1),
      rgba(211, 186, 61, 1),
      rgba(142, 98, 27, 1),
      rgba(248, 252, 158, 1)
    );
    border: 1px solid rgba(225, 195, 71, 1);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-weight: 600;
  }
  .logo {
    max-height: 120px;
  }
}
</style>
