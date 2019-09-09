<template>
  <div class="user-mission user-center-main-area">
    <div class="main-title">
      每日任务
    </div>
    <div class="subtitle">
      任务每日刷新请及时领取奖励
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
          {{
            `+${parsePrice(item.amount)}元 +${item.integration}积分 +${
              item.liveness
            }活跃度`
          }}
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
  </div>
</template>

<script>
import Loading from '@/components/loading/index';
import { game_type_map, game_platform_map } from '@/common/base-map';
import {
  get_mission_page,
  get_mission_member_info,
  get_mission_prize,
} from '@/service/index';
import moment from 'moment';
import LoadingButton from '@/components/loading-button/index';
export default {
  components: {
    LoadingButton,
    Loading,
  },
  data() {
    return {
      game_type_map,
      game_platform_map,
      data: [],
      info: {},
      moment,
      loading: false,
      color: '',
      btnLoading: false,
      statusName: '',
    };
  },
  methods: {
    async getPrize(item, index) {
      if (item.missionType === 1) {
        if (
          this.info.memberTotalRegister < item.totalRegister ||
          this.info.memberTotalAgent < item.totalAgent
        ) {
          this.$Message.error('未满足领取条件！');
          return;
        }
      } else if (item.missionType === 2) {
        if (this.info.memberTotalRecharge < item.totalRecharge) {
          this.$Message.error('未满足领取条件！');
          return;
        }
      } else if (item.missionType === 3) {
        let memberPlatformFlow = 0;
        let memberTypeFlow = 0;
        this.info.totalPlatformFlows.forEach(flow => {
          if (flow.platformType === item.gamePlatform) {
            memberPlatformFlow = flow.totalPlatformFlow;
          }
        });
        this.info.gameTypeFlows.forEach(flow => {
          if (flow.gameCategory === item.gameCategory) {
            memberTypeFlow = flow.totalGameTypeFlow;
          }
        });
        if (
          memberPlatformFlow < item.totalPlatformFlow ||
          memberTypeFlow < item.totalGameTypeFlow ||
          this.info.memberTotalAmount < item.totalAmount
        ) {
          this.$Message.error('未满足领取条件！');
          return;
        }
      }

      this.btnLoading = true;
      const resget = await get_mission_prize(item.missionDetailId);
      this.btnLoading = false;
      if (resget.status < 400) {
        this.$Message.success('成功领取每日任务奖励！');
        this.$store.dispatch('get_user_info');
        item.isReceive = true;
        this.data.splice(index, 1, item);
      }
    },
    async getData() {
      this.loading = true;
      const res = await get_mission_page();
      this.loading = false;
      const resInfo = await get_mission_member_info();
      if (res.status < 400) {
        this.data = res.data;
      }
      if (resInfo.status < 400) {
        this.info = resInfo.data;
      }
    },
    content(item) {
      let content;
      item.satisfield = false;
      if (item.missionType === 1) {
        content = `下级新注册：
        <span class="number">${this.info.memberTotalRegister}/${item.totalRegister}</span>
        人，下级新代理：
        <span class="number">${this.info.memberTotalAgent}/${item.totalAgent}</span>人`;
        if (
          this.info.memberTotalRegister >= item.totalRegister &&
          this.info.memberTotalAgent >= item.totalAgent
        ) {
          item.satisfield = true;
        }
      } else if (item.missionType === 2) {
        content = `充值：<span class="number">${this.parsePrice(
          this.info.memberTotalRecharge,
        )}/${this.parsePrice(item.totalRecharge)}</span>元`;
        if (this.info.memberTotalRecharge >= item.totalRecharge) {
          item.satisfield = true;
        }
      } else if (item.missionType === 3) {
        let platform = '';
        let type = '';
        let total = '';
        let memberPlatformFlow = 0;
        let memberTypeFlow = 0;
        if (item.gamePlatform) {
          platform = this.game_platform_map[item.gamePlatform].name;
          this.info.totalPlatformFlows.forEach(flow => {
            if (flow.platformType === item.gamePlatform) {
              memberPlatformFlow = flow.totalPlatformFlow;
            }
          });
        }
        if (item.gameCategory) {
          type = this.game_type_map[item.gameCategory].name;
          this.info.gameTypeFlows.forEach(flow => {
            if (flow.gameCategory === item.gameCategory) {
              memberTypeFlow = flow.totalGameTypeFlow;
            }
          });
        }

        if (platform) {
          platform = `${platform}流水：${this.parsePrice(
            memberPlatformFlow,
          )}/${this.parsePrice(item.totalPlatformFlow)}元，`;
        }
        if (type) {
          type = `${type}流水：<span class="number">${this.parsePrice(
            memberTypeFlow,
          )}/${this.parsePrice(item.totalGameTypeFlow)}</span>元，`;
        }
        if (item.totalAmount) {
          total = `总流水：<span class="number">${this.parsePrice(
            this.info.memberTotalAmount,
          )}/${this.parsePrice(item.totalAmount)}</span>元`;
        }
        if (
          memberPlatformFlow >= this.parsePrice(item.totalPlatformFlow) &&
          memberTypeFlow >= this.parsePrice(item.totalGameTypeFlow) &&
          this.info.memberTotalAmount >= this.parsePrice(item.totalAmount)
        ) {
          item.satisfield = true;
        }
        content = type + platform + total;
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
.user-mission {
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
        .number {
          color: #ffc000;
        }
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
}
</style>
