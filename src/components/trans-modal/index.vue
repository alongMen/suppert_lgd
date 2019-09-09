<template>
  <my-modal v-model="show">
    <div class="trans-modal">
      <p class="title">钱包转账</p>

      <div class="selector-div">
        <div class="selector-wrap">
          <div class="tag" :style="{background: showOutOption ? '#81500F' : '#333333'}">出账</div>

          <div
            class="selector"
            @click.prevent="clickOut"
            :style="{'border-top-color': showOutOption ? '#81500F' : 'rgba(71, 71, 71, 0.38)','border-left-color': showOutOption ? '#81500F' : 'rgba(71, 71, 71, 0.38)','border-right-color': showOutOption ? '#81500F' : 'rgba(71, 71, 71, 0.38)'}"
          >
            <div class="option-list" v-if="showOutOption">
              <div
                class="option"
                v-for="(value , key , index) in platform_map"
                :key="index"
                @click="selectOut(key)"
              >
                <div class="round" :style="{background: value.color}">
                  <img :src="value.image" alt />
                </div>

                <div class="info">
                  <div class="top">
                    <span class="name">{{value.name}}</span>
                    <!-- <i class="ivu-icon ivu-icon-ios-arrow-down"></i> -->
                  </div>
                  <p class="balance">{{getBalance(key)}}</p>
                </div>
              </div>
            </div>

            <div class="round" :style="{background: platform_map[outId].color}">
              <img :src="platform_map[outId].image" alt />
            </div>

            <div class="info">
              <div class="top">
                <span class="name">{{platform_map[outId].name}}</span>
                <i class="ivu-icon ivu-icon-ios-arrow-down"></i>
              </div>
              <p class="balance">{{getBalance(outId)}}</p>
            </div>
          </div>
        </div>

        <span class="iconfont iconzhuanzhang exchange" @click="exchange"></span>

        <div class="selector-wrap">
          <div class="tag" :style="{background: showInOption ? '#81500F' : '#333333'}">入账</div>

          <div
            class="selector"
            @click.prevent="clickIn"
            :style="{'border-top-color': showInOption ? '#81500F' : 'rgba(71, 71, 71, 0.38)','border-left-color': showInOption ? '#81500F' : 'rgba(71, 71, 71, 0.38)','border-right-color': showInOption ? '#81500F' : 'rgba(71, 71, 71, 0.38)'}"
          >
            <div class="option-list" v-if="showInOption">
              <div
                class="option"
                v-for="(value , key , index) in platform_map"
                :key="index"
                @click="selectIn(key)"
              >
                <div class="round" :style="{background: value.color}">
                  <img :src="value.image" alt />
                </div>

                <div class="info">
                  <div class="top">
                    <span class="name">{{value.name}}</span>
                    <!-- <i class="ivu-icon ivu-icon-ios-arrow-down"></i> -->
                  </div>
                  <p class="balance">{{getBalance(key)}}</p>
                </div>
              </div>
            </div>

            <div class="round" :style="{background: platform_map[inId].color}">
              <img :src="platform_map[inId].image" alt />
            </div>

            <div class="info">
              <div class="top">
                <span class="name">{{platform_map[inId].name}}</span>
                <i class="ivu-icon ivu-icon-ios-arrow-down"></i>
              </div>
              <p class="balance">{{getBalance(inId)}}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="charge-div">
        <p class="title">输入转账金额</p>
        <span class="charge-text" @click="charge">去充值</span>
      </div>
      <InputNumber style="margin-top:20px;width:300px" :max="999999" :min="0" v-model="amount" />

      <div class="amount-list">
        <div class="amount-item" v-for="(item, index) in amount_list" :key="index" @click="selectAmount(index)">{{item}}</div>
      </div>

      <primary-button  radius text="确认转账" style="width:140px;margin-top:50px;" :loading="btnLoading" @onClick="ok"/>
    </div>
  </my-modal>
</template>



<script>
import MyModal from "@/components/my-modal/index";
import { get_user_platform_balance , wallet_trans} from "@/service/index";
import { InputNumber } from "iview";
import PrimaryButton from '@/components/primary-button/index';

import {platform_map} from '@/common/base-map'
export default {
  components: {
    MyModal,
    InputNumber,
    PrimaryButton
  },

  data() {
    return {
      platform_map,
     

      showOutOption: false,
      showInOption: false,
      amount: 0,
      amount_list: ["100元", "200元", "全部转入"],
      btnLoading: false,
    };
  },
  watch: {
    show(val) {
      if (val) {
        this.$store.dispatch('get_user_platform_balance');
      }
    }
  },
  computed: {
    balance() {
      return this.$store.state.base.balance;
    },
    show: {
      get() {
        return this.$store.state.transModal.show;
      },
      set(show) {
        this.$store.commit("toggle_trans_modal", show);
      }
    },
    inId: {
      get() {
        return this.$store.state.transModal.inId;
      },
      set(inId) {
        this.$store.commit("set_trans_in_id", inId);
      }
    },
    outId: {
      get() {
        return this.$store.state.transModal.outId;
      },
      set(outId) {
        this.$store.commit("set_trans_out_id", outId);
      }
    },
    data(){
      return this.$store.state.transModal.balance_list;
    }
  },
  methods: {

    charge(){
      this.show = false;
      this.$router.push('/user-center/wallet/recharge')
    },
    exchange(){
      const inId = this.inId;
      const outId = this.outId;

      this.inId = outId;
      this.outId = inId;
    },


    async ok(){
      const outAmount = this.getBalance(this.outId);


      if(this.amount == 0 || !this.amount){
         this.$Message.error('请输入转账金额');
        return;
      }

      if(this.amount > outAmount){
        this.$Message.error('当前平台余额不足');
        return;
      }

      const map = {
        amount: this.amount,
        fromPlatformId: this.outId,
        toPlatformId: this.inId,
      };
      this.btnLoading = true;
      const res = await wallet_trans(map);
      this.btnLoading = false;
      if(res.status < 400 ){
        this.getData();
        this.$store.dispatch('get_user_info');
        this.$Message.success('转账成功！');
      }
    },


    selectAmount(i){
      if(i === 0 ){
        this.amount = 100;
      }else if(i === 1){
        this.amount = 200
      }else{
        const amount = this.getBalance(this.outId);
        this.amount = amount;
      }
    },
    selectOut(id) {
      this.outId = id;
    },
    selectIn(id) {
      this.inId = id;
    },
    clickOut() {
      this.showOutOption = !this.showOutOption;
    },
    clickIn() {
      this.showInOption = !this.showInOption;
    },
    // async getData() {
    //   const res = await get_user_platform_balance();
    //   if (res.status < 400) {
    //     this.data = res.data;
    //   }
    // },
    getBalance(id) {
      if (id == 0) {
        return this.balance;
      } else {
        let b = 0;
        const allPlat = this.data;
        allPlat.forEach(v => {
          if (v.id == id) {
            b = v.balance;
          }
        });
        return b;
      }
    }
  }
};
</script>


<style lang="less" scoped>
.trans-modal {
  width: 500px;
  height: 440px;
  padding: 20px;

  .title {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
    line-height: 24px;
  }

  .selector-div {
    margin-top: 24px;
    display: flex;
    align-items: center;
    .exchange {
      font-size: 30px;
      margin: 0 10px;
      cursor: pointer;
      &:hover{
        color: #fff;
      }
    }
    .selector-wrap {
      .tag {
        width: 60px;
        height: 21px;
        background: #333333;
        border-radius: 10px 10px 0px 0px;
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 21px;
        text-align: center;
        user-select: none;
      }

      .selector {
        width: 167px;
        height: 63px;
        border: 1px solid rgba(71, 71, 71, 0.38);
        display: flex;
        padding: 10px;
        align-items: center;
        position: relative;
        cursor: pointer;
        .option-list {
          width: 167px;
          position: absolute;
          z-index: 3;
          left: -1px;
          top: 62px;
          border-left: 1px solid#81500F;
          border-right: 1px solid #81500f;
          border-bottom: 1px solid #81500f;
          max-height: 500px;
          overflow: auto;
          .option {
            cursor: pointer;
            display: flex;
            padding: 10px;
            align-items: center;
            width: 100%;
            height: 63px;
            background: #242424;
            border-bottom: 1px solid rgba(71, 71, 71, 0.38);
            &:hover{
              background: #333333;
            }
          }
        }
      }
    }
  }
  .info {
    margin-left: 10px;
    flex: 1;

    .top {
      display: flex;
      justify-content: space-between;
      i {
        font-size: 18px;
      }
    }
    .name {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }

    .balance {
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
  }
  .round {
    width: 43px;
    height: 43px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .charge-div {
    width: 300px;
    display: flex;
    justify-content: space-between;
    margin-top: 24px;
    .charge-text {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      text-decoration: underline;
      color: rgba(164, 164, 164, 1);
      cursor: pointer;
      user-select: none;
      &:hover{
        color: #fff;
      }
    }
  }

  .amount-list {
    display: flex;
    margin-top: 20px;
    .amount-item {
      width: 70px;
      height: 27px;
      background: #333333;
      display: flex;
      align-items: center;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      justify-content: center;
      margin-right: 10px;
      user-select: none;
      cursor: pointer;
      &:hover{
        background: #97621D;
      }
    }
  }
}
</style>