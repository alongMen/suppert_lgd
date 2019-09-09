<template>
  <div class="game-list">
    <platform-selector :platformId="platformId" @selectPlatfrom="selectPlatfrom"/>

    <div class="list"  v-if="id === 1">
      <game-live-item v-for="(item, index) in data" :key="item.id" :data="item" :index="index"/>
     
    </div>
    <div class="list" v-else-if="id === 6 || id === 2 || id === 5">
       <game-small-item v-for="(item, index) in data" :key="item.id" :data="item" :index="index" />
    </div>

    <div class="list" v-else-if="id === 3 || id === 4">
      <game-middle-item v-for="(item, index) in data"  :key="item.id" :data="item" :index="index"/>
    </div>



    <my-pagination :page="page" :size="limit" style="margin-top:20px;" @change="pageChange" :total="total"/>
  </div>
</template>







<script>


import PlatformSelector from './components/platform-selector';


import {game_type_map} from '../../../../common/base-map';

import { get_game_list } from '@/service/index';

import GameSmallItem from '../../../../components/game-small-item/index';

import MyPagination from '../../../../components/my-pagination/index';

import GameLiveItem from '../../../../components/game-live-item/index';

import GameMiddleItem from '../../../../components/game-middle-item/index';

export default {
  name: 'game-list',
  components:{
    PlatformSelector,
    GameSmallItem,
    MyPagination,
    GameLiveItem,
    GameMiddleItem
  },

  data(){
    return{
      id: 0,// 游戏 type id,
      game_type_map,
      page: 1,
      limit:10,
      total: 0,
      data: [],
      loading: true,
      platformId: 0,
    }
  },

  watch:{
    '$route':{
      immediate: true,
      handler: function(to){
        this.id = parseInt(to.params.id);
        this.page = 1;
        this.platformId = 0;
        this.getData();
      }
    }
  },


  methods:{
    selectPlatfrom(id){
      this.platformId = id;
      this.page = 1;
      this.getData();
    },


    async getData(){
      const query = {
        gameTypeId: this.id,
        platformId: this.platformId,
      };
      const res = await get_game_list(this.page , this.limit , query);
      this.loading = false;
      if(res.status < 400 ){
        this.data = res.data.itemList;
        this.total = res.data.itemTotal;
      }
    },
    pageChange(page){
      this.page = page;
      this.getData();
    }
  },


  mounted(){
    
   
  }


}
</script>








<style lang="less" scoped>
.game-list{
  width: 100%;


  .list{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
}
</style>