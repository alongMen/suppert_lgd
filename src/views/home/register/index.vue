<template>
  <div class="register">
    <div class="tabs">
      <div
        class="tab"
        :class="step === 1 ? 'active' : ''"
        v-if="siteInfo.isRegister"
        @click="select('/register/commen')"
      >
        普通注册
      </div>
      <div
        class="tab"
        style="margin-top:16px;"
        :class="step === 2 ? 'active' : ''"
        v-if="siteInfo.isPhoneRegister"
        @click="select('/register/phone')"
      >
        手机注册
      </div>
      <div
        class="tab"
        style="margin-top:16px;"
        :class="step === 3 ? 'active' : ''"
        v-if="siteInfo.isMailRegister"
        @click="select('/register/email')"
      >
        邮箱注册
      </div>
      <div
        class="tab"
        style="margin-top:16px;"
        :class="step === 4 ? 'active' : ''"
        @click="select('/register/forget')"
      >
        找回密码
      </div>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      step: 1,
      promotionCode: '',
      promotionCodeShow: false,
    };
  },
  methods: {
    select(path) {
      this.$router.push(path);
    },
    getUrlParam(paraName) {
      var url = document.location.toString();
      var arrObj = url.split('?');

      if (arrObj.length > 1) {
        var arrPara = arrObj[1].split('&');
        var arr;

        for (var i = 0; i < arrPara.length; i++) {
          arr = arrPara[i].split('=');

          if (arr != null && arr[0] == paraName) {
            return arr[1];
          }
        }
        return '';
      } else {
        return '';
      }
    },
  },
  computed: {
    siteInfo() {
      return this.$store.state.base.site_info;
    },
  },
  async mounted() {
    // this.promotionCode = this.getUrlParam('promotionCode');
    // if (!this.promotionCode) {
    //   this.promotionCodeShow = true;
    // }
    await this.$store.dispatch('get_site_info');
  },
  watch: {
    $route: {
      immediate: true,
      handler: function(to) {
        if (to.path === '/register/commen') {
          this.step = 1;
        } else if (to.path === '/register/phone') {
          this.step = 2;
        } else if (to.path === '/register/email') {
          this.step = 3;
        } else if (to.path === '/register/forget') {
          this.step = 4;
        } else if (to.path === '/register') {
          if (this.siteInfo.isRegister) {
            this.$router.push('/register/commen');
          } else if (this.siteInfo.isPhoneRegister) {
            this.$router.push('/register/phone');
          } else if (this.siteInfo.isMailRegister) {
            this.$router.push('/register/email');
          } else {
            if (localStorage.token) {
              this.$router.push('/index');
            }
          }
        }
      },
    },
  },
};
</script>

<style lang="less">
.register {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  .tabs {
    width: 130px;
    height: 100%;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    .tab {
      cursor: pointer;
      width: 120px;
      height: 42px;
      background: linear-gradient(
        -10deg,
        rgba(3, 0, 0, 1),
        rgba(38, 38, 38, 1)
      );
      border-image: linear-gradient(
          -60deg,
          rgba(114, 114, 114, 1),
          rgba(209, 198, 198, 1),
          rgba(114, 114, 114, 1),
          rgba(209, 198, 198, 1)
        )
        1 1;
      box-shadow: 0px 5px 16px 0px rgba(255, 255, 255, 0.56);
      border-radius: 21px;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .active {
      font-weight: 600;

      background: linear-gradient(
        -10deg,
        rgba(3, 0, 0, 1),
        rgba(38, 38, 38, 1)
      );
      border-image: linear-gradient(
          -60deg,
          rgba(114, 114, 114, 1),
          rgba(209, 198, 198, 1),
          rgba(114, 114, 114, 1),
          rgba(209, 198, 198, 1)
        )
        1 1;
      box-shadow: 0px 5px 16px 0px rgba(244, 200, 65, 1);
      border-radius: 21px;
    }
  }

  .content {
    margin: 20px 0 24px 31px;
    min-height: 343px;
    width: 841px;
    background: #212121;
    border: 1px solid rgba(43, 42, 42, 1);
    border-radius: 4px;
  }
}
</style>
