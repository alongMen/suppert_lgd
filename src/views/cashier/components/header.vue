<template>
  <div class="cashier-head">
    <div class="head-left">
      <!-- <div class="logo" :style="{'background-image': `url(${logo})`}">

      </div> -->
      <img :src="siteInfo.logo" width="140" height="40">
      <span class="title-text">收银台</span>
    </div>

    <div class="help-wrap">
      <span class="help-text pointer">联系客服</span>
      <span class="help-text" style="padding:0 10px">|</span>
      <span class="help-text pointer">支付帮助</span>
    </div>
  </div>
</template>


<script>
export default {
  data(){
    return{
      logo: localStorage.getItem('logo'),
    }
  },
  computed: {
    siteInfo() {
      return this.$store.state.base.site_info;
    }
  },
}
</script>


<style lang="less">
.cashier-head {
  display: flex;
  padding: 10px 0;
  justify-content: space-between;
  .head-left {
    display: flex;
  }
  .logo {
    width: 139px;
    height: 43px;
    background-repeat: no-repeat;
    background-size: contain;
  }
  .title-text {
    font-family: PingFangSC-Medium;
    font-size: 18px;
    color: #333333;
    align-self: flex-end;
    margin-left: 30px;
  }
  .help-wrap {
    display: flex;
    user-select: none;
    align-self: flex-end;
    .help-text {
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #333333;
    }
  }
}
</style>
