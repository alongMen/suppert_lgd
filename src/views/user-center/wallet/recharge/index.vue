<template>
  <div class="user-center-main-area recharge">
    <p class="title">请选择充值渠道</p>
    <loading v-if="loading" />
    <template v-else>
      <charge-type :data="data" @selectType="selectType" :type="type" />

      <charge-list :data="charge_list" :type="type" v-if="type >=0" @select="select" :id="id" />

      <div class="charge-area" v-if="id">
        <div class="header">
          <p class="title">输入存款金额</p>
          <p class="tips">
            *单笔最低充值
            <span class="limit-text">{{min }}</span>元以上,
            <span class="limit-text">{{max }}</span>元以上
          </p>
        </div>

        <InputNumber
          v-model="amount"
          :min="0"
          :max="9999999"
          size="large"
          style="width:300px"
          placeholder="请输入充值金额"
        />

        <primary-button style="width:140px;margin-top:20px;" text="充值" radius @onClick="ok" />
      </div>
    </template>
  </div>
</template>






<script>
import { get_offline_charge_methods } from "@/service/index";
import Loading from "@/components/loading/index";
import ChargeType from "./charge-type";
import ChargeList from "./charge-list";
import { InputNumber } from "iview";
import PrimaryButton from "@/components/primary-button/index";
export default {
  components: {
    Loading,
    ChargeType,
    ChargeList,
    InputNumber,
    PrimaryButton
  },
  data() {
    return {
      data: [],
      loading: true,
      type: undefined,

      id: 0, //选中的id,
      amount: 0
    };
  },
  computed: {
    charge_list() {
      let list = [];
      if (this.type === 0) {
        //bank
        list = this.data.filter(v => v.providerName === 21);
      } else if (this.type === 1) {
        list = this.data.filter(v => v.providerName === 2);
      } else if (this.type === 2) {
        list = this.data.filter(v => v.providerName === 1);
      } else if (this.type === 3) {
        list = this.data.filter(v => v.providerName >= 31);
      }

      return list;
    },
    max() {
      const id = this.id;
      let max = 0;
      this.charge_list.forEach(v => {
        if (v.id === id) {
          max = v.singleMax;
        }
      });

      return max;
    },
    min() {
      const id = this.id;
      let max = 0;
      this.charge_list.forEach(v => {
        if (v.id === id) {
          max = v.singleMin;
        }
      });

      return max;
    }
  },
  methods: {
    select(id) {
      this.amount = 0;
      this.id = id;
    },

    async getData() {
      const res = await get_offline_charge_methods();
      this.loading = false;
      if (res.status < 400) {
        this.data = res.data;
      }
    },
    selectType(type) {
      this.amount = 0;
      this.id = 0;
      this.type = type;
    },
    ok() {
      const { amount, id } = this;

      if (amount < this.min) {
        this.$Message.error(`充值金额不能小于 ${this.min}元`);
        return;
      }
      if (amount > this.max) {
        this.$Message.error(`充值金额不能大于于 ${this.max}元`);
        return;
      }

      const map = {
        amount: amount,
        receiptAccountId: id
      };

      sessionStorage.setItem('cashier' , JSON.stringify(map));

      window.open('/cashier');

    }
  },
  mounted() {
    this.getData();
  }
};
</script>


<style lang="less">
.recharge {
  .charge-area {
    .header {
      display: flex;
      margin: 20px 0;
      align-items: center;

      .tips {
        text-indent: 10px;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(164, 164, 164, 1);
      }
      .limit-text {
        color: red;
      }
    }
  }
}
</style>