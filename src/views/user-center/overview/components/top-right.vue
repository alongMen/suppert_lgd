<template>
  <div class="overview-top-right">
    <div class="header">
      <div class="title">消息</div>
      <div class="more" @click="more">查看更多</div>
    </div>
    <loading v-if="loading" />
    <ul class="list" v-else>
      <li
        class="borad-item"
        v-for="(item, index) in data"
        :key="index"
        @click="detail(item)"
      >
        <div class="date">
          <p class="year">{{ year(item) }}</p>
          <p class="day">{{ date(item) }}</p>
        </div>
        <div class="line"></div>

        <div class="content">
          <p class="title">{{ item.title }}</p>
          <p class="summary">{{ item.summary }}</p>
        </div>
      </li>
    </ul>
    <detail v-model="showModal" :id="id" />
  </div>
</template>

<script>
import { get_board_list } from '@/service/index';
import Loading from '@/components/loading/index';
import Detail from '../../message/board/detail';
export default {
  components: {
    Detail,
    Loading,
  },
  data() {
    return {
      loading: false,
      id: 0,
      showModal: false,
      data: [],
    };
  },
  methods: {
    more(){
      this.$router.push('/user-center/message');
    },
    detail(item) {
      this.id = item.id;
      this.showModal = true;
    },
    year(item) {
      const date = new Date(item.publishTime);

      return date.getFullYear();
    },
    date(item) {
      const date = new Date(item.publishTime);
      let month = date.getMonth() + 1;
      month = month < 10 ? '0' + month : month;
      const day = date.getDate();

      return `${month}-${day}`;
    },
    async getData() {
      this.loading = true;
      const res = await get_board_list(1, 4);
      this.loading = false;
      if (res.status < 400) {
        this.data = res.data.itemList;
      }
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style lang="less">
.overview-top-right {
  height: 100%;
  width: 100%;
  background: #212121;
  border: 1px solid rgba(43, 42, 42, 1);
  .header {
    margin: 21px 20px 0 26px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .title {
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
      line-height: 24px;
    }
    .more {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      text-decoration: underline;
      color: rgba(255, 255, 255, 1);
      line-height: 24px;
      user-select: none;
      cursor: pointer;
      &:hover {
        color: #fac000;
      }
    }
  }
  .list {
    margin-top: 18px;
    .borad-item {
      background: #1a1a1a;
      border: 1px solid rgba(41, 41, 41, 1);
      border-radius: 4px;
      height: 64px;
      display: flex;
      align-items: center;
      padding: 10px;
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
}
</style>
