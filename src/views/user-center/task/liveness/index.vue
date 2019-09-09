<template>
  <div class="user-liveness user-center-main-area">
    <div class="main-title">
      活跃度奖励
    </div>
    <div class="subtitle">
      活跃度奖励每日刷新请及时领取
    </div>
    <loading v-if="loading" />
    <div class="item" v-for="(item, index) in data" :key="index">
      <div class="header">
        <div class="avatar">
          <img src="/image/gift.png" height="55px" width="52px" />
        </div>
        <div class="title">
          活跃度达到：
          <span class="number">
            {{ `${item.memberFullAmount}/${item.fullAmount}` }}
          </span>
        </div>
      </div>
      <div class="middle">
        <div class="number">
          {{ `+${parsePrice(item.amount)}元 +${item.integration}积分` }}
        </div>
      </div>
      <div class="tail">
        <loading-button
          class="button"
          :text="
            item.isReceive ? '已领取' : item.satisfield ? '点击领奖' : '未完成'
          "
          @handleClick="getPrize(item, index)"
          :loading="btnLoading"
          :disabled="item.isReceive"
          padding="0 5px"
        ></loading-button>
      </div>
    </div>
    <div class="about">
      <a
        href="javascript:void(0)"
        @click="about"
        style="color:rgba(255, 192, 0, 1);"
        >如何提升活跃度？</a
      >
    </div>
  </div>
</template>

<script>
import { get_liveness_all, get_liveness_prize } from '@/service/index';
import moment from 'moment';
import Loading from '@/components/loading/index';
import LoadingButton from '@/components/loading-button/index';
export default {
  components: {
    LoadingButton,
    Loading,
  },
  data() {
    return {
      data: [],
      moment,
      loading: false,
      color: '',
      btnLoading: false,
      statusName: '',
    };
  },
  methods: {
    about() {
      this.$router.push('/user-center/task/about-liveness');
    },
    async getPrize(item, index) {
      if (item.memberFullAmount < item.fullAmount) {
        this.$Message.error('未满足领取条件！');
        return;
      }
      this.btnLoading = true;
      const resget = await get_liveness_prize(item.id);
      this.btnLoading = false;
      if (resget.status < 400) {
        this.$Message.success('成功领取每日活跃度奖励！');
        this.$store.dispatch('get_user_info');
        item.isReceive = true;
        this.data.splice(index, 1, item);
      }
    },
    async getData() {
      this.loading = true;
      const res = await get_liveness_all();
      this.loading = false;
      if (res.status < 400) {
        this.data = res.data;
        this.data.forEach(v => {
          if (v.memberFullAmount >= v.fullAmount) {
            v.satisfield = true;
          } else {
            v.satisfield = false;
          }
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
.user-liveness {
  padding: 21px 21px 0 21px;
  .main-title {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 24px;
  }
  .subtitle {
    margin-top: 2px;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(164, 164, 164, 1);
    line-height: 34px;
  }
  .item {
    cursor: pointer;
    background: #1a1a1a;
    margin-top: 12px;
    height: 64px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &:hover {
      opacity: 0.8;
    }

    .header {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .avatar {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 64px;
        height: 64px;
        background: #141414;
        border: 1px solid rgba(112, 112, 112, 0.26);
        border-radius: 4px;
      }
      .title {
        margin-left: 18px;
        font-size: 14px;
        font-family: PingFang SC;
        color: rgba(255, 255, 255, 1);
        font-weight: 400;
        line-height: 34px;
        .number {
          color: #ffc000;
        }
      }
    }
    .middle {
      font-size: 14px;
      font-weight: 400;
      line-height: 34px;
      font-family: PingFang SC;
      color: rgba(255, 255, 255, 1);
      color: #ffc000;
    }
    .tail {
      width: 106px;
      height: 38px;
    }
  }
  .about {
    width: 113px;
    height: 16px;
    margin-top: 27px;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    text-decoration: underline;
    line-height: 34px;
  }
}
</style>
