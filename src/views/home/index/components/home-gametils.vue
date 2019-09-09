<template>
  <div class="home-tils">
    <div class="tils_item">
      <div class="title">视讯直播</div>
      <div class="tils_pic">
        <img src="/image/home-live.png" alt />
      </div>
      <div class="tilsinfo">真人百家乐，骰宝龙虎斗等多种视讯游戏，全球玩家同台竞技。</div>
      <router-link to="/game-center/game-list/1" tag="div" class="btn-common enterbtn">立即进入</router-link>
    </div>
    <div class="tils_item">
      <div class="title">体育赛事</div>
      <div class="tils_pic">
        <img src="/image/home-sports.png" alt />
      </div>
      <div class="tilsinfo">
        业界滚球专家为您
        提供最丰富齐全的
        体育赛事，最高水
        位，最佳赔率，为
        您创造最大价值。
      </div>
      <router-link to="/game-center/game-list/3" tag="div" class="btn-common enterbtn">立即进入</router-link>
    </div>
    <div class="tils_item">
      <div class="title">电子游戏</div>
      <div class="tils_pic">
        <img src="/image/home-el.png" alt />
      </div>
      <div class="tilsinfo">
        上百款老虎机，电
        动扑克，大型电玩，
        桌上游戏，以丰富
        的视觉，声光效果
        带给您绝佳的娱乐。
      </div>
      <router-link to="/game-center/game-list/2" tag="div" class="btn-common enterbtn">立即进入</router-link>
    </div>
    <div class="tils_item">
      <div class="title">彩票游戏</div>
      <div class="tils_pic">
        <img src="/image/home-cp.png" alt />
      </div>
      <div class="tilsinfo">
        所有赛果依据官
        方开奖结果。以
        小博大，玩法多
        多，给您一夜致
        富的空前游戏
        体验！
      </div>
      <router-link to="/game-center/game-list/4" tag="div" class="btn-common enterbtn">立即进入</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeTils",
  data() {
      return{

      }
  }
};
</script>

<style lang="less" scoped>
.home-tils {
  width: 1000px;
  height: 340px;
  background: url("/image/tilsbgc.png") no-repeat;
  background-size: 100% 100%;
  background-position: center;
  position: relative;
  .tils_item {
    width: 22%;
    position: absolute;
    left: 10px;
    top: 80px;
    &:nth-child(2) {
      left: 265px;
      top: 100px;
    }
    &:nth-child(3) {
      left: 518px;
      top: 80px;
    }
    &:nth-child(4) {
      left: 745px;
      top: 80px;
    }
    .title {
      width: 102px;
      text-align: center;
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
      line-height: 29px;
      background: linear-gradient(
        0deg,
        rgba(248, 252, 158, 1) 0.4150390625%,
        rgba(158, 134, 12, 1) 25.87890625%,
        rgba(248, 252, 158, 1) 56.5673828125%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .tilsinfo {
      width: 110px;
      color: #fff;
      font-size: 13px;
      line-height: 21px;
    }
    .enterbtn {
      margin-top: 12px;
    }
    .tils_pic {
      position: absolute;
      left: 112px;
      top: 10px;
      width: 128px;
      height: 115px;
      &:nth-child(2) {
        top: 30px;
      }
      &:nth-child(3) {
        top: 40px;
      }
      &:nth-child(4) {
        top: 30px;
      }
      img {
        // display: block;
        // width: 100%;
        // height: 100%;
      }
    }
  }
}
</style>