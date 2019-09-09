<template>
  <div class="play-game">
    <template v-if="loading">
      <vue-loading type="spin" color="#fff" :size="{ width: '30px', height: '30px' }"></vue-loading>
      <p class="going">进入游戏中</p>
    </template>

    <template v-else>
      <game-header :gamePlatformId="gamePlatformId" :showHeader="showHeader" @toggle="toggle"/>
      <iframe :src="url" frameborder="0" class="game-iframe"></iframe>

    </template>


  </div>
</template>




<script>
import { VueLoading } from "vue-loading-template";
import { play_game } from "@/service/index";
import GameHeader from './game-header';
export default {
  components: {
    VueLoading,
    GameHeader
  },
  data() {
    return {
      gameId: 0,
      gamePlatformId: 0,
      loading: true,
      url: '',
      showHeader: true,
    };
  },
  methods: {
    toggle(){
      this.showHeader = !this.showHeader;
    },
    async play() {
      const res = await play_game(this.gameId);
      this.loading = false;
      if(res.status < 400 ){
        this.url = res.data;
      }
    }
  },
  mounted() {
    this.gameId = parseInt(this.$route.params.gameId);
    this.gamePlatformId = parseInt(this.$route.params.gamePlatformId);
    this.play();
  }
};
</script>





<style lang="less">
.play-game {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .going {
    margin-top: 20px;
    font-size: 22px;
    color: #fff;
  }


  .game-iframe{
    flex:1;
    width: 100%;
  }
}
</style>