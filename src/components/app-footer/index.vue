<template>
  <div class="app-footer view-area-width">
    <img src="/image/logo.png" alt class="logo" />
    <div class="footerinfo">
      <router-link to="/" tag="div" class="item">
        <p class="englishp">about us</p>
        <p>关于我们</p>
      </router-link>
      <span>|</span>
      <router-link to="/" tag="div" class="item">
        <p class="englishp">contact us</p>
        <p>联系我们</p>
      </router-link>
      <span>|</span>
      <router-link to="/" tag="div" class="item">
        <p class="englishp">privacy Policy</p>
        <p>隐私政策</p>
      </router-link>
      <span>|</span>
      <router-link to="/" tag="div" class="item">
        <p class="englishp">for problem</p>
        <p>常见问题</p>
      </router-link>
      <span>|</span>
      <router-link to="/" tag="div" class="item">
        <p class="englishp">rule clause</p>
        <p>规则条款</p>
      </router-link>
      <span>|</span>
      <router-link to="/" tag="div" class="item">
        <p class="englishp">join us</p>
        <p>合营加盟</p>
      </router-link>
    </div>
    <div class="copyright">Copyright 2018-2020 LGD. All Rights Reserved .</div>
  </div>
</template>





<style lang="less" scoped>
.app-footer {
  height: 320px;
  text-align: center;
  padding-top: 30px;
  border-top: 1px solid #808080;
  background: url("/image/footer-bg.png") no-repeat;
  background-size: 100% 100%;
  background-position: center;
  box-sizing: border-box;
  .copyright {
    border-top: 1px solid #808080;
    width: 100%;
    text-align: center;
    margin-top: 30px;
    line-height: 60px;
    font-size: 13px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(128, 128, 128, 1);
  }
  .footerinfo {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    text-align: center;
    color: #808080;
    vertical-align: middle;
    .item {
      width: 120px;
      font-size: 14px;
      .englishp {
        font-size: 11px;
      }
      &:hover {
        cursor: pointer;
        color: #ceb71e;
      }
    }
    span {
      line-height: 40px;
    }
  }
}
</style>