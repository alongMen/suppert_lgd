<template>
  <div class="game-center">
    <game-banner />
    <game-tab />

    <router-view></router-view>
  </div>
</template>




<script>
import GameBanner from './components/game-banner';
import GameTab from './components/game-tab'
export default {
  name: 'game-center',
  components:{
    GameBanner,
    GameTab
  },
  computed:{
    isLogin(){
      return this.$store.state.base.isLogin;
    }
  },
  watch:{
    isLogin:{
      immediate: true,
      handler: function(to){
        if(to){
          this.$store.dispatch('get_collected_game_list');
        }
      }
    }
  },
  mounted(){

  }
}
</script>




<style lang="less" scoped>
.game-center{

}
</style>