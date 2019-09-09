<template>
  <div class="user-center-header">
    <div class="header">
      <div class="tri-angle"></div>

      <div class="header-content">
        <div class="avatar">
          <img src="/image/avatar.png" alt />
        </div>

        <div class="info">
          <div class="top">
            <p class="name">
              {{ user_info.userName }}
              <span class="level">({{ user_info.gradeName }})</span>
            </p>
            <span class="edit-info" @click='infoChange'>修改资料</span>
          </div>

          <p class="amount">
            <span class="unit">¥</span>
            <span class="sum">{{ balance }}</span>
            <span
              class="iconfont iconshuaxin refesh"
              @click="refreshBalance"
            ></span>
          </p>

          <div class="progress-wrap">
            <div class="progress" style="width:50%"></div>
          </div>

          <div
            class="point-text"
            v-if="user_info.totalIntegration < user_info.nextGrede"
          >
            {{
              `距离下一等级还有 ${NumberAdj(
                remainPoint,
              )} 积分 可用积分：${NumberAdj(user_info.integration)}`
            }}
          </div>
          <div v-else class="point-text">
            {{ `已满级 可用积分：${NumberAdj(user_info.integration)}` }}
          </div>
        </div>

        <div class="buttons">
          <primary-button text="充值" @onClick="routeTo('wallet/recharge')" />

          <primary-button
            text="提现"
            style="margin:0 10px"
            @onClick="routeTo('wallet/withdraw')"
          />

          <primary-button text="转账" @onClick="openTransModal" />
        </div>

        <div class="liveness">
          <!-- <div class="image"></div> -->

          <!-- <p>
            <span class="current">0</span>
            <span class="total">/100</span>
          </p> -->

          <div class="sign" @click="signIn">
            {{ isSign ? '已签到' : '签到' }}
          </div>
        </div>
      </div>

      <div class="entrance">
        <span class="item" @click="routeToHome('activity')">最新活动</span>
        <span class="line"></span>
        <span
          class="item active"
          @click="routeToHome('user-center/task/mission')"
          >每日任务</span
        >
        <span class="line"></span>
        <span class="item" @click="routeToHome('game-center/game-list/1')"
          >真人</span
        >
        <span class="line"></span>
        <span class="item" @click="routeToHome('game-center/game-list/2')"
          >电游</span
        >
        <span class="line"></span>
        <span class="item" @click="routeToHome('game-center/game-list/3')"
          >体育</span
        >
        <span class="line"></span>
        <span class="item" @click="routeToHome('game-center/game-list/4')"
          >彩票</span
        >
        <span class="line"></span>
        <span class="item" @click="routeToHome('game-center/game-list/5')"
          >捕鱼</span
        >
        <span class="line"></span>
        <span class="item" @click="routeToHome('game-center/game-list/6')"
          >棋牌</span
        >
      </div>
    </div>

    <div class="tab-bar">
      <div
        class="tab"
        @click="routeTo(item.route)"
        v-for="(item, index) in tabList"
        :key="index"
        :class="{ 'tab-active': item.route === active }"
      >
        {{ item.name }}
      </div>

      <div class="tab service" @click="toHome">
        <i class="iconfont iconshouye1"></i>
        <span>返回首页</span>
      </div>
    </div>
  </div>
</template>

<script>
import { user_signin, get_user_signin } from '@/service/index';
import PrimaryButton from '../primary-button/index';
export default {
  components: {
    PrimaryButton,
  },
  data() {
    return {
      tabList: [
        {
          name: '总览',
          route: 'overview',
        },
        {
          name: '钱包',
          route: 'wallet',
        },
        {
          name: '账户',
          route: 'account',
        },
        {
          name: '任务',
          route: 'task',
        },
        {
          name: '消息',
          route: 'message',
        },
        {
          name: '游戏记录',
          route: 'game-record',
        },
        {
          name: '推广中心',
          route: 'agent-center',
        },
      ],
      active: '',
      isSign: false,
    };
  },
  computed: {
    user_info() {
      return this.$store.state.base.user_info;
    },
    balance() {
      return this.$store.state.base.balance;
    },
    pointPercent() {
      let percent = 0;
      const { totalIntegration, nextGrede } = this.user_info;
      percent = (totalIntegration / nextGrede) * 100;

      return percent > 100 ? 100 : percent;
    },

    remainPoint() {
      let point = 0;
      const { totalIntegration, nextGrede } = this.user_info;
      point = nextGrede - totalIntegration;
      return point > 0 ? point : nextGrede;
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler: function(to) {
        if (to.matched.length > 1) {
          const name = to.matched[1].name;
          this.active = name;
        }
      },
    },
  },
  methods: {
    infoChange(){
      this.$router.push('/user-center/account/personal');
    },
    routeToHome(path) {
      this.$router.push('/' + path);
    },
    openTransModal() {
      this.$store.commit('set_trans_out_id', 0);
      this.$store.commit('set_trans_in_id', 1);
      this.$store.commit('toggle_trans_modal', true);
    },

    async get_user_info() {
      await this.$store.dispatch('get_user_info');
      const res = await get_user_signin();
      if (res.status < 400) {
        this.isSign = res.data;
      }
    },
    async signIn() {
      if (this.isSign) {
        this.$Message.error('你今天已签到过');
        return;
      }
      const res = await user_signin();
      if (res.status < 400) {
        this.$Message.success('签到成功');
        this.isSign = true;
      }
    },
    routeTo(path) {
      this.$router.push(`/user-center/${path}`);
    },
    refreshBalance() {
      this.$store.dispatch('get_user_info');
    },
    toHome() {
      this.$router.push('/');
    },
  },
  mounted() {
    this.get_user_info();
  },
};
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 138px;
  background-image: url('/image/user-center/header-bg.png');

  position: relative;
  .entrance {
    position: absolute;
    top: 10px;
    right: 40px;
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    .item {
      padding: 0 10px;
      cursor: pointer;
      user-select: none;
      &:hover {
        color: #ffc000;
      }
    }
    .line {
      width: 1px;
      height: 10px;
      background: #a4a4a4;
      display: inline-block;
    }

    .active {
      color: #ffc000;
    }
  }
  .header-content {
    width: 100%;
    height: 100%;
    display: flex;
    padding-top: 15px;
    padding-left: 39px;
  }

  .tri-angle {
    width: 65px;
    height: 46px;
    background-image: url('/image/user-center/tri-angle.png');
    position: absolute;
    top: 0;
    left: 0;
  }

  .avatar {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    overflow: hidden;
    align-self: center;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .info {
    margin-left: 17px;
    width: 245px;
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .edit-info {
      font-size: 13px;
      font-family: PingFang SC;
      font-weight: 400;
      text-decoration: underline;
      color: rgba(164, 164, 164, 1);
      user-select: none;
      transition: all 0.2s;
      cursor: pointer;
      &:hover {
        color: #fff;
      }
    }
    .name {
      font-size: 20px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(164, 164, 164, 1);
      .level {
        font-size: 14px;
      }
    }

    .amount {
      .unit {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(164, 164, 164, 1);
      }
      .sum {
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #fff;
      }

      .refesh {
        margin-left: 10px;
        font-size: 20px;
        transition: all 0.2s;
        cursor: pointer;
        &:hover {
          color: #fff;
        }
      }
    }

    .progress-wrap {
      margin-top: 2px;
      width: 100%;
      height: 6px;
      background: #2b2b2b;
      border-radius: 3px;
      .progress {
        height: 100%;
        background: linear-gradient(
          0deg,
          rgba(207, 156, 3, 1),
          rgba(153, 111, 10, 1)
        );
        border-radius: 6px;
      }
    }

    .point-text {
      font-size: 14px;
      padding-top: 10px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(164, 164, 164, 1);
    }
  }

  .buttons {
    display: flex;
    align-items: center;
    margin-left: 60px;
  }

  .liveness {
    display: flex;
    align-items: flex-end;
    margin-left: 55px;
    padding-bottom: 34px;
    .image {
      width: 49px;
      height: 19px;
      background-image: url('/image/user-center/liveness.png');
      margin-right: 10px;
    }

    .current {
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 600;
      font-style: italic;
      color: rgba(255, 255, 255, 1);
    }

    .total {
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 600;
      font-style: italic;
      color: #a4a4a4;
    }

    .sign {
      // margin-left: 10px;
      width: 66px;
      height: 26px;
      background: linear-gradient(
        180deg,
        rgba(55, 55, 55, 1),
        rgba(35, 34, 34, 1),
        rgba(0, 0, 0, 1)
      );
      box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.45),
        0px 6px 7px 0px rgba(72, 72, 72, 0.48);
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      margin-left: 30px;
      user-select: none;
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
    }
  }
}
.tab-bar {
  width: 100%;
  height: 40px;
  background: url('/image/user-center/menu-bg.png');
  display: flex;

  .tab {
    width: 139px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 600;
    color: rgba(164, 164, 164, 1);
    padding-bottom: 10px;
    user-select: none;
    cursor: pointer;
    overflow: visible;
  }

  .tab-active {
    background-image: url('/image/user-center/tab-active.png');
    background-size: contain;
    background-repeat: no-repeat;
    color: #fff;
  }

  .service {
    width: 164px;
    height: 66px;
    background-image: url('/image/user-center/service-bg.png');
    background-repeat: no-repeat;
    transform: translateY(-10px);
    padding-left: 24px;
    padding-bottom: 0;
    i {
      color: #4f330d;
      font-size: 20px;
    }
    span {
      padding-left: 8px;
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: rgba(79, 51, 13, 1);
      line-height: 29px;
      -webkit-text-stroke: 2px undefined;
      text-stroke: 2px undefined;
    }

    &:hover i {
      color: #fff;
    }
    &:hover span {
      color: #fff;
    }
  }
}
</style>
