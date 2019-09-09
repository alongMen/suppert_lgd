<template>
  <div class="game-banner" :style="{'background-image': `url(${bg})`}">
    <span class="iconfont icon" :class="icon"></span>
    <div style="width: 180px;margin-left:10px;">
      <p>
        <span class="title">{{title}}</span>
        <span class="sub">{{sub}}</span>
      </p>
      <p class="content">{{content}}</p>
    </div>
  </div>
</template>



<script>
export default {
  data() {
    return {
      bg_map: {
        1: "/image/game/live-bg.png",
        2: "/image/game/slot-bg.png",
        3: "/image/game/sport-bg.png",
        4: "/image/game/lottery-bg.png",
        5: "/image/game/fish-bg.png",
        6: "/image/game/chess-bg.png"
      },
      icon_map: {
        1: "icon-chouma",
        2: "iconyouxi",
        3: "icontiyu1",
        4: "iconcaipiao1",
        5: "icontubiao",
        6: "icontuxing"
      },
      title_map: {
        1: "真人视讯",
        2: "电子游艺",
        3: "体育竞猜",
        4: "彩票游戏",
        5: "捕鱼游戏",
        6: "棋牌游戏"
      },
      sub_map: {
        1: "/Live",
        2: "/Electronic games",
        3: "/Sport",
        4: "/Bingo game",
        5: "/Fishing game",
        6: "/Chess game"
      },
      content_map: {
        1: "紧张刺激真人视讯博彩，性感荷官在线发牌 玩法多多任君选择",
        2: "超多平台，超多种类的电子游戏，满足您的不同需求，精彩刺激，乐趣多多",
        3: "大平台统一开奖，赛事比分实时 更新，公平竞技快乐观赛",
        4: "以小博大，玩法多多，给您一夜致 富的空前游戏体验！",
        5: "最刺激紧张的捕鱼游戏，大鱼不 断，惊喜连连,炮炮暴击",
        6: "多种棋牌游戏任您挑选，玩法多 多百万玩家同台竞技"
      }
    };
  },
  computed: {
    bg() {
      const id = parseInt(this.$route.params.id);

      return this.bg_map[id];
    },
    icon() {
      const id = parseInt(this.$route.params.id);
      return this.icon_map[id];
    },
    title() {
      const id = parseInt(this.$route.params.id);
      return this.title_map[id];
    },
    sub() {
      const id = parseInt(this.$route.params.id);
      return this.sub_map[id];
    },
    content() {
      const id = parseInt(this.$route.params.id);
      return this.content_map[id];
    }
  }
};
</script>






<style lang="less" scoped>
.game-banner {
  width: 100%;
  height: 260px;
  display: flex;
  align-items: center;
  padding-left: 60px;
  margin-top: 10px;
  .icon {
    font-size: 46px;
    color: #f8fc9e;
    padding-bottom: 42px;
  }

  .title {
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
    line-height: 29px;
  }

  .sub {
    font-size: 14px;
    color: #fff;
  }

  .content{
    font-size:13px;
font-family:PingFang SC;
font-weight:400;
color:rgba(255,255,255,1);
line-height:22px;
  }
}
</style>