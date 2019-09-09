<template>
  <div class="activity">
    <div class="banner">
      <span class="iconfont icon-chouma"></span>
      <div class="info-text">
        <div class="title">
          活动中心 <span class="promotion">/ PROMOTIONS</span>
        </div>
        <div class="content">
          优惠多多，惊喜不断，每日任务，好礼 优惠送不停，福利嗨翻天！
        </div>
      </div>
    </div>
    <div v-if="!showDetail">
      <loading v-if="loading" />
      <div class="item-list" v-else>
        <div
          class="card-info"
          v-for="(item, index) in data"
          :key="index"
          :style="(index + 1) % 3 === 0 ? '' : 'margin-right:32px'"
        >
          <div class="image-card">
            <div
              class="image"
              :style="{ backgroundImage: `url(${item.imageUrl})` }"
            ></div>
            <div class="title">
              {{ item.title }}
            </div>
          </div>

          <div class="mask">
            <div class="mask-info">
              {{ item.title }}
            </div>
            <div class="mask-button">
              <Button
                type="warning"
                size="large"
                @click="detail(item.id, item.title)"
                >查看详情</Button
              >
            </div>
          </div>
        </div>
      </div>

      <NoData
        :info="'近期暂时没有活动'"
        v-if="activity_all.length === 0 && !loading"
      />
      <div class="page" style="margin:15px auto;">
        <my-pagination
          :page="page"
          :size="3"
          @change="pageChange"
          :total="total"
        />
      </div>
    </div>
    <div class="activity-detail" v-else>
      <detail
        :id="id"
        v-if="showDetail"
        :title="title"
        @close="showDetail = false"
      />
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import Detail from './detail';
import NoData from '@/components/no-data/index.vue';
import MyPagination from '@/components/my-pagination/index';
import { get_activity_all } from '@/service/index';
import Loading from '@/components/loading/index';
export default {
  components: {
    Detail,
    Loading,
    NoData,
    MyPagination,
  },
  data() {
    return {
      loading: true,
      activity_all: [],
      page: 1,
      limit: 3,
      id: 0,
      showDetail: false,
      title: '',
    };
  },
  computed: {
    total() {
      return this.activity_all.length;
    },
    data() {
      const page = this.page;
      const data = this.activity_all.slice((page - 1) * 3, page * 3);
      return data;
    },
  },
  methods: {
    pageChange(page) {
      this.page = page;
    },
    detail(id, title) {
      this.id = id;
      this.title = title;
      this.showDetail = true;
    },
    async getData() {
      const res = await get_activity_all();
      this.loading = false;
      if (res.status < 400) {
        this.activity_all = res.data;
        this.activity_all.forEach(v => {
          const currentTime = moment.utc().unix();
          const endTime = moment.utc(v.endTime).unix();
          const startTime = moment.utc(v.startTime).unix();
          const drawEndTime = moment.utc(v.drawEndTime).unix();
          const drawStartTime = moment.utc(v.drawStartTime).unix();
          if (currentTime < startTime) {
            v.status = '等待开始';
          } else if (startTime <= currentTime && currentTime <= endTime) {
            v.status = '正在进行';
          } else {
            v.status = '已结束';
          }

          // if (drawStartTime <= currentTime && currentTime <= drawEndTime) {
          //   v.draw = '领取中';
          // }
        });
      }
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style lang="less">
.activity {
  .activity-detail {
  }
  .item-list {
    // display: flex;
    // justify-content: center;

    // align-items: center;
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    .card-info {
      cursor: pointer;
      position: relative;
      // display: flex;
      // justify-content: flex-start;
      // align-items: center;
      // flex-direction: column;

      margin-top: 35px;
      width: 312px;

      height: 329px;
      background: rgba(21, 22, 31, 1);
      background-size: 100% 100%;
      background-attachment: fixed;
      .image-card {
        border-radius: 4px;
        width: 100%;
        height: 100%;
        .image {
          height: 265px;
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }
        .title {
          width: 310px;
          height: 64px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: 500;
          color: rgba(166, 166, 166, 1);
          line-height: 29px;
        }
      }
      .mask {
        position: relative;
        top: -329px;
        border-radius: 4px;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.68);
        opacity: 0;
        transition: all 0.3s ease-in-out;
        border: 1px solid rgba(211, 186, 61, 1);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .mask-info {
          font-size: 24px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
          line-height: 29px;
        }
        .mask-button {
          margin-top: 40px;
        }
      }
      &:hover .mask {
        opacity: 1;
      }
    }
  }

  .banner {
    width: 1000px;
    height: 260px;
    background-image: url(/image/activity-bg.png);
  }
  .icon-chouma {
    top: 91px;
    left: 79px;
    position: relative;
    font-size: 48px !important;
    color: rgba(211, 186, 61, 1) !important;
  }
  .info-text {
    top: 19px;
    left: 143px;
    position: relative;
    width: 216px;
    height: 65px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    .title {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 206px;
      // height: 23px;
      font-size: 24px;
      font-family: PingFang SC;
      // font-weight: 600;
      color: rgba(255, 255, 255, 1);
      // line-height: 29px;
      .promotion {
        font-size: 14px;
      }
    }
    .content {
      width: 216px;
      height: 33px;
      font-size: 13px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 20px;
    }
  }
}
</style>
