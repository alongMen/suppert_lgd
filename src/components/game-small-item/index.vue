<template>
  <div
    class="game-small-item"
    :style="{ 'margin-right': (index + 1) % 5 === 0 ? '0px' : '20px' }"
  >
    <img :src="data.logo" class="image" />

    <div class="mask">
      <div class="top">
        <div class="button" @click="playGame">开始游戏</div>
      </div>

      <div class="info">
        <span class="name">{{ data.name }}</span>

        <div class="bar">
          <span class="platform-name">{{ data.gamePlatformName }}</span>
          <i
            class="iconfont iconshoucang"
            v-if="isCollect && isLogin && !Colletion"
          ></i>
          <i
            class="iconfont iconshoucang1"
            @click="collect"
            v-if="!isCollect && !Colletion"
          ></i>
          <i
            class="iconfont iconlajitong"
            @click="cancel_collect"
            v-if="Colletion"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { play_game, like_game, unlike_game } from '@/service/index';
export default {
  props: {
    index: Number,
    data: Object,
    Colletion: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isLogin() {
      return this.$store.state.base.isLogin;
    },
    isCollect() {
      const some = this.collected_game_list.some(
        v => v.gameId === this.data.id,
      );
      return some;
    },
    collected_game_list() {
      return this.$store.state.game.collected_game_list;
    },
  },
  methods: {
    async playGame() {
      if (this.isLogin) {
        if (this.Colletion) {
          window.open(
            `/play-game/${this.data.gameId}/${this.data.gamePlatformId}`,
          );
        } else {
          window.open(`/play-game/${this.data.id}/${this.data.gamePlatformId}`);
        }

        // const page = window.open("/play-game");
        // const res = await play_game(this.data.id);
        // if (res.status < 400) {
        //   page.location.href = res.data;
        // }
      } else {
        this.$store.commit('set_login_modal_status', true);
      }
    },
    async cancel_collect() {
      this.$store.commit('cancel_game_collect', this.data.gameId);
      const res = await unlike_game(this.data.id);
      if (res.status < 400) {
        this.$Message.success('取消收藏成功');
        this.$store.dispatch('get_collected_game_list');
      }
    },
    collect() {
      if (this.isLogin) {
        this.$Message.success('收藏成功！');
        like_game(this.data.id);
        this.$store.commit('collect_game', {
          gameId: this.data.id,
          gameLogo: this.data.logo,
          gameName: this.data.name,
          gamePlatformId: this.data.gamePlatformId,
          gamePlatformName: this.data.gamePlatformName,
        });
      } else {
        this.$store.commit('set_login_modal_status', true);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.game-small-item {
  width: 184px;
  height: 185px;
  background: #333333;
  border: 2px solid rgba(64, 64, 64, 1);
  margin-right: 20px;
  margin-bottom: 23px;
  display: flex;
  flex-direction: column;
  position: relative;
  .image {
    width: 100%;
    height: 110px;
  }

  .mask {
    position: absolute;
    top: -2px;
    right: -2px;
    bottom: -2px;
    left: -2px;
    display: flex;
    flex-direction: column;
    border: 2px solid transparent;
    user-select: none;
    &:hover {
      background: rgba(0, 0, 0, 0.3);
      border: 2px solid rgba(213, 137, 38, 1);
    }
    .top {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      .button {
        width: 84px;
        height: 33px;
        display: none;
        align-items: center;
        justify-content: center;
        background: #fff;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(0, 0, 0, 1);
        border-radius: 2px;
        cursor: pointer;
        &:hover {
          background: #d58926;
          color: #fff;
        }
      }
    }

    &:hover .button {
      display: flex;
    }
  }

  .info {
    height: 72px;
    padding-left: 16px;
    padding-top: 16px;
    padding-right: 16px;
    .name {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }

    .bar {
      padding-top: 6px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #fff;
      i {
        cursor: pointer;
      }
    }
    .platform-name {
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
  }
}
</style>
