<template>
  <div class="game-record-detail  user-center-main-area">
    <p class="title">{{ title }}游戏记录</p>
    <div class="alert">
      游戏记录存在5-30分钟延迟，请耐心等待数据同步显示！
    </div>
    <search-form
      @getData="getData"
      :query="query"
      :gameTypeId="gameTypeId"
      :platformList="platformList"
    />

    <Table
      style="margin-top:15px;"
      :columns="columns"
      ref="selection"
      @on-selection-change="onSelect"
      no-data-text="暂无数据"
      :row-class-name="rowClassName"
      :data="data"
      :loading="loading"
    >
      <template slot="validWager" slot-scope="{ row }">
        <span v-if="row.validWager === 0">免费玩</span>
        <span v-else>{{ parsePrice(row.validWager) }}</span>
      </template>
      <template slot="win" slot-scope="{ row }">
        <span v-if="row.win >= 0" class="success">{{
          parsePrice(row.win)
        }}</span>
        <span v-else class="error">{{ parsePrice(row.win) }}</span>
      </template>
      <template slot="amount" slot-scope="{ row }">
        {{ parsePrice(row.amount) }}
      </template>
      <template slot="isExecute" slot-scope="{ row }">
        <span v-if="row.isExecute" class="success">已发放</span>
        <span v-else class="error">未发放</span>
      </template>
      <template slot="createTime" slot-scope="{ row }">
        {{ formatBeijingDate(row.createTime) }}
      </template>
    </Table>

    <div class="page" style="margin-top:10px;">
      <my-pagination
        :page="page"
        :size="limit"
        @change="pageChange"
        :total="total"
      />
    </div>
  </div>
</template>

<script>
import MyPagination from '@/components/my-pagination/index';
import { game_type_map } from '@/common/base-map';
import SearchForm from './searchForm.vue';
import { get_game_record, get_platform_list_by_type } from '@/service/index';
export default {
  components: {
    SearchForm,
    MyPagination,
  },
  data() {
    return {
      columns: [
        {
          title: '平台名称',
          key: 'gamePlatformName',
        },
        {
          title: '游戏名称',
          key: 'gameName',
        },
        {
          title: '下注金额',
          slot: 'validWager',
        },
        {
          title: '奖金',
          slot: 'win',
        },
        {
          title: '返水',
          slot: 'amount',
        },
        {
          title: '是否发放返水',
          slot: 'isExecute',
        },
        {
          title: '游戏时间',
          slot: 'createTime',
        },
      ],
      game_type_map,
      title: '',
      gameTypeId: 0,
      data: [],
      page: 1,
      limit: 15,
      total: 0,
      platformList: [],
      loading: false,
      query: {
        date: [],
      },
    };
  },
  methods: {
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    },
    rowClassName(row, index) {
      if (index % 2 == 0) {
        return 'ivu-table-stripe-even';
      } else return 'ivu-table-stripe-odd';
    },
    onSelect(selection, index) {
      this.selecteds = selection;
    },
    pageChange(page) {
      this.page = page;
      this.getData();
    },
    async getData() {
      const query = {
        gameTypeId: parseInt(this.$route.params.id),
        status: this.query.status ? this.query.status : null,
        startTime: this.query.date ? this.query.date[0] : null,
        endTime: this.query.date ? this.query.date[1] : null,
        gameplatformId: this.query.gameplatformId ? this.query.gameplatformId : null,
      };
      this.loading = true;
      const res = await get_game_record(this.page, this.limit, query);
      this.loading = false;
      if (res.status < 400) {
        if (this.page === 1) {
          this.total = res.data.itemTotal;
        }
        this.data = res.data.itemList;
      }
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler: async function(to) {
        this.page = 1;
        this.query.date = [];
        this.getData();
        this.gameTypeId = parseInt(to.params.id);
        this.title = this.game_type_map[this.gameTypeId].name;
        this.platformList = [];
        this.platformList.push({ id: 0, name: '全部' });
        const res = await get_platform_list_by_type(this.gameTypeId);
        if (res.status < 400) {
          res.data.forEach(v => {
            this.platformList.push(v);
          });
        }
      },
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style lang="less">
.game-record-detail {
  padding: 21px 9px 0 26px;
  .alert {
    padding: 0 10px;
    margin: 20px 0;
    width: 812px;
    height: 31px;
    background: #1c1c1c;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .success {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #67c48c;
  }
  .error {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #e23a3a;
  }
  .charging {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #7063e6;
  }
}
</style>
