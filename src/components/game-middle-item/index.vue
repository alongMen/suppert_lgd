<template>
  <div class="game-middle-item" :style="{ 'margin-right': (index + 1) % 2 === 0 ? '0px' : '20px' }">
    <img :src="data.logo" class="image" />

    <div class="info">
      <span class="name">{{data.name}}</span>

      <div class="button" @click="playGame">开始游戏</div>
    </div>
  </div>
</template>




<script>
import { play_game, like_game, unlike_game } from "@/service/index";
//cp sport
export default {
  props: {
    data: Object,
    index: Number
  },
  computed: {
    isLogin() {
      return this.$store.state.base.isLogin;
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
  }
};
</script>




<style lang="less">
.game-middle-item {
  width: 490px;
  height: 364px;
  border: 2px solid rgba(64, 64, 64, 1);

  margin-bottom: 23px;
  .image {
    width: 100%;
    height: calc(100% - 64px);
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
  .name {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
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