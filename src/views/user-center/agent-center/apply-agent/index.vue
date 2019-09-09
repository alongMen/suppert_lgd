<template>
  <div class="apply-page user-center-main-area">
    <p class="apply-title">申请代理</p>
    <div class="alert">成为代理即可享受以下权益（点击按钮申请，系统自动审核）</div>
    <div class="apply-items">
      <div class="apply-item" v-for="(it,i) in items" :key="i">
        <img :src="it.pic" alt class="applypic" />
        <p class="name">{{it.name}}</p>
        <p class="info">{{it.info}}</p>
      </div>
    </div>

    <div class="applybtn" :class="{'applyOK':isOK}" @click="apply">{{isOK?'申请成功':'点击申请'}}</div>
    <span v-if="isOK" class="tils"></span>

    <model v-model="show" :width="620">
      <div class="box-modal">
        <p class="modal_title">申请提交</p>

        <Loading v-if="loadings" />

        <p class="modal_tils" v-if="!loadings">
          达到以下条件即可成为代理，条件已达成
          <span class="Molecular">{{num}}</span> /
          <span class="denominator">3</span>
        </p>

        <div class="modalitems" v-if="!loadings">
          <div class="modalitem">
            <div class="modalpic">
              <img src="/image/user-center/vippic.png" alt />
            </div>
            <div class="iteminfo">
              <p class="infos">有推荐{{default_agent.validMemberNumber}}个会员</p>
              <p class="progress">
                <span>进度：</span>
                <span
                  class="pre"
                >{{conditions.validMemberNumber}}/{{default_agent.validMemberNumber}}</span>
              </p>
              <p
                class="status"
                v-if="conditions.validMemberNumber<default_agent.validMemberNumber"
              >未达成</p>
              <img
                v-if="conditions.validMemberNumber>=2"
                src="/image/user-center/okpic.png"
                alt
                class="okpic"
              />
            </div>
          </div>

          <div class="modalitem">
            <div class="modalpic">
              <img src="/image/user-center/vippic.png" alt />
            </div>
            <div class="iteminfo">
              <p class="infos">充值{{default_agent.totalRecharge}}元</p>
              <p class="progress">
                <span>进度：</span>
                <span class="pre">{{conditions.totalRecharge}}/{{default_agent.totalRecharge}}</span>
              </p>
              <p class="status" v-if="conditions.totalRecharge<default_agent.totalRecharge">未达成</p>
              <img
                v-if="conditions.totalRecharge>=default_agent.totalRecharge"
                src="/image/user-center/okpic.png"
                alt
                class="okpic"
              />
            </div>
          </div>

          <div class="modalitem">
            <div class="modalpic">
              <img src="/image/user-center/vippic.png" alt />
            </div>
            <div class="iteminfo">
              <p class="infos">消费总额达到{{default_agent.totalConsume}}元</p>
              <p class="progress">
                <span>进度：</span>
                <span class="pre">{{conditions.totalConsume}}/{{default_agent.totalConsume}}</span>
              </p>
              <p class="status" v-if="conditions.totalConsume<default_agent.totalConsume">未达成</p>
              <img
                v-if="conditions.totalConsume>=default_agent.totalConsume"
                src="/image/user-center/okpic.png"
                alt
                class="okpic"
              />
            </div>
          </div>
        </div>

        <div class="modal_apply" @click="handleApply" v-if="num===3">申请成为代理</div>
        <div class="modal_btn" @click="show=false">我知道了</div>
      </div>
    </model>
  </div>
</template>
<script>
import model from "@//components/my-modal";
import Loading from "@/components/loading/index";
import {
  get_default_agent,
  get_agent_current,
  join_agent
} from "@/service/index";

export default {
  components: {
    model,
    Loading
  },
  mounted() {
    this.getDefault();
  },
  data() {
    return {
      items: [
        {
          pic: "/image/user-center/agentAply1.png",
          name: "独立域名推广",
          info:
            "以电子邮件为主要的网站推广手段方法包括电子刊物会员通讯专业服广告等基于用户许可的营销"
        },
        {
          pic: "/image/user-center/agentAply2.png",
          name: "返佣",
          info:
            "以电子邮件为主要的网站推广手段方法包括电子刊物会员通讯专业服广告等基于用户许可的营销"
        },
        {
          pic: "/image/user-center/agentAply3.png",
          name: "日工资",
          info:
            "以电子邮件为主要的网站推广手段方法包括电子刊物会员通讯专业服广告等基于用户许可的营销"
        },
        {
          pic: "/image/user-center/agentAply4.png",
          name: "会员和代理的不同之处",
          info:
            "1.会员不能享有独立域名推广的权益2.会员不享有返佣权益3.会员不能发展自己的团队"
        },
        {
          pic: "/image/user-center/agentAply5.png",
          name: "额外退水",
          info:
            "以电子邮件为主要的网站推广手段方法包括电子刊物会员通讯专业服广告等基于用户许可的营销"
        }
      ],
      default_agent: {},
      num: 0,
      loadings: false,
      loading: false,
      conditions: {},
      show: false,
      isOK: false
    };
  },
  methods: {
    async getDefault() {
      const res = await get_default_agent();
      if (res.status === 200) {
        this.default_agent = res.data;
        // console.log(this.default_agent);
      }
    },
    async apply() {
      if (this.isOK === false) {
        this.show = true;
        this.loadings = true;
        const res = await get_agent_current(1);
        this.loadings = false;
        if (res.status < 400) {
          this.conditions = res.data;
          const arr = [
            this.conditions.validMemberNumber >=
              this.default_agent.validMemberNumber,
            this.conditions.totalRecharge >= this.default_agent.totalRecharge,
            this.conditions.totalConsume >= this.default_agent.totalConsume
          ];
          this.num = 0;
          arr.forEach(el => {
            if (el === true) {
              this.num++;
            }
          });
        }
      } else {
        return false;
      }
    },
    async handleApply() {
      this.loading = true;
      const res = await join_agent();
      this.loading = false;
      if (res.status < 400) {
        this.$Message.success("申请成功！");
        this.show = false;
        this.isOK = true;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.apply-page {
  box-sizing: border-box;
  padding: 21px 9px 20px 26px;
  .apply-title {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #ffffff;
  }
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
  .apply-items {
    display: flex;
    flex-wrap: wrap;
    .apply-item {
      width: 216px;
      margin-right: 50px;
      margin-bottom: 30px;
      .applypic {
        display: block;
        width: 216px;
        height: 120px;
        margin-bottom: 10px;
      }
      .name {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 34px;
      }
      .info {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(164, 164, 164, 1);
        line-height: 22px;
      }
    }
  }
  .applybtn {
    cursor: pointer;
    color: #ffffff;
    text-align: center;
    line-height: 38px;
    font-size: 14px;
    width: 116px;
    height: 38px;
    display: inline-block;
    background: url("/image/sprite/sprite.png") -116px -671px no-repeat;
    &:hover {
      opacity: 0.6;
    }
  }
  .tils {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(164, 164, 164, 1);
    line-height: 29px;
  }
  .applyOK {
    background: url("/image/sprite/sprite.png") -0px -671px no-repeat;
    color: #a4a4a4;
  }

  .box-modal {
    width: 620px;
    min-height: 400px;
    background: rgba(33, 33, 33, 1);
    border: 3px solid rgba(43, 42, 42, 1);
    padding: 10px;
    box-sizing: border-box;
    .modal_apply,
    .modal_btn {
      cursor: pointer;
      width: 96px;
      height: 44px;
      color: #ffffff;
      text-align: center;
      line-height: 44px;
      display: inline-block;
      background: url("/image/sprite/sprite.png") -232px -671px no-repeat;
      margin-right: 20px;
      margin-top: 20px;
      background-size: 1.5;
      &:hover {
        opacity: 0.6;
      }
    }
    .modal_btn {
      color: #a4a4a4;
    }
    .modalitems {
      width: 100%;
      .modalitem {
        width: 100%;
        display: flex;
        height: 64px;
        margin: 10px auto;
        .modalpic {
          width: 64px;
          height: 64px;
          background-color: #141414;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            display: block;
            width: 54px;
            height: 37px;
          }
        }
        .iteminfo {
          flex: 1;
          display: flex;
          // justify-content: space-around;
          align-items: center;
          line-height: 64px;
          background: #292929;
          border: 1px solid rgba(41, 41, 41, 1);
          border-radius: 4px;
          .infos {
            padding-left: 5px;
            width: 50%;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            text-align: left;
          }
          .progress {
            width: 25%;
            color: #ffffff;
            .pre {
              color: #ffc000;
            }
          }
          .status {
            text-align: left;
            width: 25%;
            color: #a4a4a4;
          }
          .okpic {
            text-align: center;
            width: 25%;
            display: block;
            width: 26px;
            height: 26px;
            line-height: 64px;
          }
        }
      }
    }
    .modal_title {
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
      line-height: 24px;
    }
    .modal_tils {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(164, 164, 164, 1);
      line-height: 29px;
      .Molecular {
        font-size: 14px;
        font-family: PingFang SC;
        color: #ffc000;
        line-height: 34px;
      }
      .denominator {
        font-size: 14px;
        line-height: 34px;
      }
    }
  }
}
</style>