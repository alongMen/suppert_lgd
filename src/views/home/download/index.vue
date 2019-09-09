<template
  ><div class="download">
    <div class="banner">
      <span class="iconfont iconxiazai"></span>
      <div class="info-text">
        <div class="title">
          下载中心<span class="promotion"> / DOWNLOAD</span>
        </div>
        <div class="content">
          下载移动端应用，随地随地享受快乐
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less">
.download {
  .banner {
    width: 1000px;
    height: 260px;
    background-image: url(/image/download.png);
  }
  .iconxiazai {
    top: 91px;
    left: 79px;
    position: relative;
    font-size: 51px !important;
    color: rgba(211, 186, 61, 1) !important;
  }
  .info-text {
    top: 19px;
    left: 143px;
    position: relative;
    width: 216px;
    height: 65px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    .title {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 206px;
      // height: 23px;
      font-size: 24px;
      font-family: PingFang SC;
      // font-weight: 600;
      color: rgba(255, 255, 255, 1);
      // line-height: 29px;
      .promotion {
        font-size: 14px;
      }
    }
    .content {
      width: 216px;
      height: 33px;
      font-size: 13px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 20px;
    }
  }
}
</style>
