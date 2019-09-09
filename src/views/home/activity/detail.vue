<template>
  <div class="activity-detail ">
    <Button type="warning" @click="back">返回</Button>
    <div class="main-title">活动详情：{{ title }}</div>
    <div class="subtitle" :style="`color: ${color};`">
      {{ statusName }}
    </div>
    <loading v-if="loading" />
    <div class="item" v-for="(item, index) in data" :key="index">
      <div class="header">
        <div class="avatar">
          <img src="/image/coin.png" height="45px" width="35px" />
        </div>
        <div class="title">
          <div v-html="content(item)"></div>
        </div>
      </div>
      <div class="middle">
        <div class="number">
          {{ `+${parsePrice(item.amount)}元 +${item.integration}积分 ` }}
        </div>
      </div>
      <div class="tail">
        <loading-button
          class="button"
          :text="item.isConfirm ? '已领取' : '立即领取'"
          @handleClick="getPrize(item, index)"
          :loading="btnLoading"
          :disabled="item.isConfirm"
          padding="0 5px"
        ></loading-button>
      </div>
    </div>
  </div>
</template>

<script>
import { game_type_map, game_platform_map } from '@/common/base-map';
import { get_activity_prize, get_activity_detail } from '@/service/index';
import moment from 'moment';
import Loading from '@/components/loading/index';
import LoadingButton from '@/components/loading-button/index';
export default {
  components: {
    LoadingButton,
    Loading,
  },
  props: {
    id: Number,
    title: String,
  },
  data() {
    return {
      game_type_map,
      game_platform_map,
      data: [],
      form: {},
      // info: {},
      moment,
      loading: true,
      color: '',
      btnLoading: false,
      statusName: '',
    };
  },
  methods: {
    back() {
      this.$emit('close');
    },
    async getPrize(item, index) {
      this.btnLoading = true;
      const resget = await get_activity_prize(item.id);
      this.btnLoading = false;
      if (resget.status < 400) {
        this.$tips({
          type: 'success',
          message: '活动已完成！',
        });
        item.isConfirm = true;
        this.form.wActivityDetails.splice(index, 1, item);
      }
    },
    async getData() {
      const res = await get_activity_detail(this.id);
      this.loading = false;
      if (res.status < 400) {
        this.form = res.data;
        this.data = res.data.wActivityDetails;
        const currentTime = moment.utc().unix();
        const endTime = moment.utc(this.form.endTime).unix();
        const startTime = moment.utc(this.form.startTime).unix();
        if (currentTime < startTime) {
          this.statusName = '即将开始';
          this.color = 'blue';
        } else if (startTime <= currentTime && currentTime <= endTime) {
          this.statusName = '火热进行中';
          this.color = 'red';
        } else {
          this.statusName = '已结束';
          this.color = 'black';
        }
      }
    },
    content(item) {
      let content;
      if (this.form.activityType === 1) {
        if (item.registerCondition === 1) {
          content = '手机注册奖励';
        } else if (item.registerCondition === 2) {
          content = '邮箱注册奖励';
        } else if (item.registerCondition === 3) {
          content = '代理注册奖励';
        } else if (item.registerCondition === 4) {
          content = '注册奖励';
        }
      } else if (this.form.activityType === 2) {
        if (item.isFirstCharge) {
          content = `首次充值达到：<span class='number'>${this.parsePrice(
            item.fullAmount,
          )}</span>元`;
        } else {
          content = `活动期间充值达到：<span class='number'>${this.parsePrice(
            item.fullAmount,
          )}</span>元`;
        }
      } else if (this.form.activityType === 3) {
        let platform = this.game_platform_map[item.platformType].name;
        let type = this.game_type_map[item.gameCategory].name;
        if (platform) {
          platform = `${platform}流水达到：<span class='number'>${this.parsePrice(
            item.platformFlow,
          )}</span>元`;
        }
        if (type) {
          type = `${type}流水达到：<span class='number'>${this.parsePrice(
            item.gameTypeFlow,
          )}</span>元，`;
        }
        content = type + platform;
      }
      return content;
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style lang="less">
.activity-detail {
  width: 100%;
  padding: 10px;
  background: #212121;
  .main-title {
    margin-top: 10px;
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
    min-height: 64px;
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
        margin-left: 3px;
        font-size: 10px;
        font-family: PingFang SC;
        color: rgba(255, 255, 255, 1);
      }
    }
    .middle {
      font-size: 10px;
      font-family: PingFang SC;
      color: rgba(255, 255, 255, 1);
      color: #ffc000;
    }
    .tail {
      width: 106px;
      height: 38px;
    }
  }
  .number {
    color: #ffc000;
  }
}
</style>
