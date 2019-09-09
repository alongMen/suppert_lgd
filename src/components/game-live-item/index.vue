<template>
  <div class="game-live-item" :style="{'margin-right': (index + 1) % 3 === 0 ? '0px' : '32px'}">
    <img :src="data.logo" class="image" />

    <div class="info">
      <span class="name">{{data.name}}</span>

      <div class="button" @click="playGame">开始游戏</div>
    </div>

    <div class="canvas">
      <canvas :id="id" width="50" height="50"></canvas>
      <span class="collect" >
        <i class="iconfont iconshoucang" v-if="isCollect && isLogin" ></i>
        <i class="iconfont iconshoucang1" @click="collect" v-if="!isCollect"></i>
      </span>
    </div>
  </div>
</template>


<script>
import { play_game , like_game , unlike_game} from "@/service/index";
export default {
  props: {
    data: Object,
    index: Number
  },
  computed: {
    isLogin() {
      return this.$store.state.base.isLogin;
    },
    id() {
      return `canvas-${this.data.id}`;
    },
    isCollect(){
      const some = this.collected_game_list.some((v)=> v.gameId === this.data.id);
      return some;
    },
    collected_game_list(){
      return this.$store.state.game.collected_game_list;
    }
  },
  methods: {
    async playGame() {
      if (this.isLogin) {

        window.open(`/play-game/${this.data.id}/${this.data.gamePlatformId}`);
      } else {
        this.$store.commit("set_login_modal_status", true);
      }
    },
    collect(){

      if(this.isLogin){
        this.$Message.success('收藏成功！');
        like_game(this.data.id);
        this.$store.commit('collect_game' , {
          gameId: this.data.id,
          gameLogo: this.data.logo,
          gameName: this.data.name,
          gamePlatformId: this.data.gamePlatformId,
          gamePlatformName: this.data.gamePlatformName
        });
      }else{
        this.$store.commit('set_login_modal_status' , true);
      }
    },
    // uncollect(){
    //   unlike_game(this.data.id);
    //   this.$store.commit('cancel_game_collect' , this.data.id);
    // }
  },
  mounted() {
    this.$nextTick(() => {
      console.log(this.id);
      const bg = document.getElementById(this.id);
      console.log(bg);
      const ctx = bg.getContext("2d");
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(50, 0);
      ctx.lineTo(0, 50);
      ctx.fillStyle = "#323232";
      ctx.fill();
    });
  }
};
</script>




<style lang="less" scoped>
.game-live-item {
  width: 312px;
  height: 329px;
  background: #0f1218;
  margin-bottom: 20px;
  position: relative;
  .canvas {
    position: absolute;
    top: 0px;
    width: 50px;
    height: 50px;
    .collect {
      position: absolute;
      top: 4px;
      left: 4px;
      color: #fff;
      cursor: pointer;
    }
  }
  .image {
    // height: 467px;
    height: calc(100% - 64px);
    width: 100%;
  }
  .info {
    height: 64px;
    width: 100%;
    display: flex;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
    justify-content: space-between;
  }

  .button {
    width: 110px;
    height: 36px;
    background: rgba(28, 28, 28, 1);
    border: 1px solid;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.68),
      0px 6px 3px 0px rgba(0, 0, 0, 0.33), 0px -7px 8px 0px rgba(0, 0, 0, 1);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #a6a6a6;
    user-select: none;
    cursor: pointer;
    &:hover {
      background: #97621d;
      color: #fff;
    }
  }
}
</style>