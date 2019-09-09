<template>
  <div class="board user-center-main-area">
    <p class="title">通知消息</p>

    <loading v-if="loading" />
    <ul class="list" v-else>
      <li class="borad-item" v-for="(item, index) in data" :key="item.id">
        <div class="date">
          <p class="year">{{year(item)}}</p>
          <p class="day">{{date(item)}}</p>
        </div>
        <div class="line"></div>

        <div class="content">
          <p class="title">{{item.title}}</p>
          <p class="summary">{{item.description}}</p>
        </div>
      </li>
    </ul>

    <my-pagination
      :page="page"
      :limit="limit"
      :total="total"
      @change="pageChange"
      style="margin-top:30px;"
      v-if="total > limit"
    />
  </div>
</template>

<script>
import { get_notice_list } from "@/service/index";
import Loading from "@/components/loading/index";
import MyPagination from "@/components/my-pagination/index";
export default {
  components: {
    Loading,
    MyPagination
  },
  data() {
    return {
      loading: true,
      data: [],
      page: 1,
      limit: 8,
      total: 0
    };
  },
  methods: {
    async getData() {
      // this.loading = true;
      const res = await get_notice_list(this.page, this.limit);
      this.loading = false;
      if (res.status < 400) {
        this.total = res.data.itemTotal;
        this.data = res.data.itemList;
      }
    },
    year(item) {
      const date = new Date(item.createTime);

      return date.getFullYear();
    },
    date(item) {
      const date = new Date(item.createTime);
      let month = date.getMonth() + 1;
      month = month < 10 ? "0" + month : month;
      const day = date.getDate();

      return `${month}-${day}`;
    },
    pageChange(page) {
      console.log(page);
      this.page = page;
      this.getData();
    }
  },
  mounted() {
    this.getData();
  }
};
</script>



<style lang="less" scoped>
.board {
  .title {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }
  .list {
    margin-top: 18px;
  }
  .borad-item {
    background: #1a1a1a;
    border: 1px solid rgba(41, 41, 41, 1);
    border-radius: 4px;
    height: 64px;
    display: flex;
    align-items: center;
    padding: 10px;
     margin-bottom: 10px;
    cursor: pointer;
    &:hover {
      background: #636363;
      border: 1px solid rgba(99, 99, 99, 0.5);
    }
    .date {
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(163, 163, 163, 1);
      text-align: center;
    }

    .line {
      width: 1px;
      height: 100%;
      background: #333333;
      margin: 0 20px;
    }
  }

  .content {
    flex: 1;

    .summary {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(164, 164, 164, 1);
    }
  }
}
</style>