<template>
  <div class="game-tab">
    <div class="tab-item" v-for="(item, index) in data" :key="index" :class="{'active': item.value === id}" @click="click(item)">
      <i class="iconfont" :class="item.logo"></i>
      <span class="name">{{item.label}}</span>
    </div>
  </div>
</template>


<script>
const game_type = [
  { label: "真人视讯", value: 1, code: "live", logo: "icon-chouma" },
  { label: "电子游艺", value: 2, code: "slot", logo: "iconyouxi" },
  { label: "体育竞猜", value: 3, code: "sports", logo: "icontiyu1" },
  { label: "彩票游戏", value: 4, code: "lottery", logo: "iconcaipiao1" },
  { label: "超级捕鱼", value: 5, code: "fishing", logo: "icontubiao" },
  { label: "棋牌游戏", value: 6, code: "chess", logo: "icontuxing" }
];
export default {
  data() {
    return {
      data: game_type,
      id: 0,
    };
  },
  methods:{
    click(item){
      if(item.value === this.id){
        return;
      }
      this.$router.push('/game-center/game-list/' + item.value);
    }
  },
  watch:{
    '$route':{
      immediate:true,
      handler:function(to){
        const id = parseInt(to.params.id);
        this.id = id;
      }
    }
  }
};
</script>


<style lang="less" >
.game-tab {
  width: 100%;
  display: flex;

  height: 50px;

  .tab-item {
    flex: 1;
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    background: linear-gradient(
      180deg,
      rgba(55, 55, 55, 1),
      rgba(35, 34, 34, 1),
      rgba(0, 0, 0, 1)
    );
    border: 1px solid rgba(55, 55, 55, 1);
    // box-shadow: 0px 6px 7px 0px rgba(72, 72, 72, 0.48);
    user-select: none;
    cursor: pointer;

    .name {
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 600;
      color: rgba(166, 166, 166, 1);
      padding-left: 20px;
      
    }

    .iconfont {
      font-size: 30px;
    }
  }

  .active {
    background: linear-gradient(
      0deg,
      rgba(248, 252, 158, 1),
      rgba(211, 186, 61, 1),
      rgba(142, 98, 27, 1),
      rgba(248, 252, 158, 1)
    );
    border: 1px solid rgba(225, 195, 71, 1);
    .name{
      color: #fff;
      text-shadow:3px 3px 6px #000;
    }

    i::before{
      color: #fff;
    }
  }
}
</style>