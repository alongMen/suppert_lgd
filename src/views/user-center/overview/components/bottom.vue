<template>
  <div class="overview-buttom">
    <div class="header">
      <div class="title">我收藏的游戏</div>
      <div class="total">
        共计<span class="number">{{ total }}</span
        >个
      </div>
    </div>
    <NoData
      :info="'暂时无收藏的游戏'"
      v-if="total === 0"
      @onClick="playGame"
      :buttonInfo="'去玩游戏'"
    />
    <div class="collect">
      <game-small-item
        v-for="(item, index) in data"
        :key="index"
        :index="index"
        :data="item"
        :Colletion="true"
      />
    </div>
    <div class="page" v-if="total > 0">
      <my-pagination
        :page="page"
        :size="5"
        @change="pageChange"
        :total="total"
      />
    </div>
  </div>
</template>
<script>
import MyPagination from '@/components/my-pagination/index';
import { game_platform_map } from '@/common/base-map';
import NoData from '@/components/no-data/index.vue';
import gameSmallItem from '@/components/game-small-item/index';
export default {
  components: {
    MyPagination,
    NoData,
    gameSmallItem,
  },
  data() {
    return {
      game_platform_map,
      page: 1,
    };
  },
  computed: {
    collected_game_list() {
      const list = this.$store.state.game.collected_game_list;
      list.forEach(v => {
        v.logo = v.gameLogo;
        v.name = v.gameName;
        v.gamePlatformName = this.game_platform_map[v.gamePlatformId].name;
      });
      return list;
    },
    data() {
      const page = this.page;
      const data = this.collected_game_list.slice((page - 1) * 5, page * 5);
      return data;
    },
    total() {
      return this.collected_game_list.length;
    },
  },
  methods: {
    playGame() {
      this.$router.push('/game-center/game-list/1');
    },
    pageChange(page) {
      this.page = page;
    },
  },
  mounted() {
    this.$store.dispatch('get_collected_game_list');
  },
};
</script>

<style lang="less">
.overview-buttom {
  height: 100%;
  width: 100%;
  .header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .title {
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
      line-height: 24px;
    }
    .total {
      margin-left: 24px;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #a4a4a4;
      line-height: 24px;
      .number {
        color: #fac000;
      }
    }
  }
  .collect {
    margin-top: 37px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .page {
    margin-top: 20px;
  }
}
</style>
