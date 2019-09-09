<template>
  <div class="charge-type">
    <div
      class="item"
      v-for="(item, index) in list"
      :key="index"
      v-if="item.show"
      :class="{'active': index === type}"
      @click="selectType(index)"
    >
      <img :src="item.icon" />
      <p class="name">{{item.name}}</p>
    </div>
  </div>
</template>




<script>
export default {
  props: {
    data: Array,
    type: Number
  },
  data() {
    return {};
  },
  computed: {
    hasWechat() {
      const bool = this.data.some(v => v.providerName === 1);
      return bool;
    },
    hasAli() {
      const bool = this.data.some(v => v.providerName === 2);
      return bool;
    },
    hasBank() {
      const bool = this.data.some(v => v.providerName === 21);
      return bool;
    },
    hasOnline() {
      const bool = this.data.some(v => v.providerName >= 31);
      return bool;
    },
    list() {
      return [
        {
          name: "银行卡",
          icon: "/image/wallet/bank.png",
          show: this.hasBank
        },
        {
          name: "支付宝",
          icon: "/image/wallet/ali.png",
          show: this.hasAli
        },
        {
          name: "微信",
          icon: "/image/wallet/wechat.png",
          show: this.hasWechat
        },
        {
          name: "线上支付",
          icon: "/image/wallet/online.png",
          show: this.hasOnline
        }
      ];
    }
  },
  methods: {
    selectType(i) {
      this.$emit("selectType", i);
    }
  }
};
</script>

<style lang="less" scoped>
.charge-type {
  margin-top: 20px;
  display: flex;
  .item {
    width: 120px;
    height: 80px;
    margin-right: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    background: #242424;
    border: 1px solid rgba(71, 71, 71, 0.38);
    border-radius: 4px;
    cursor: pointer;
    user-select: none;
    .name {
      font-size: 13px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(164, 164, 164, 1);
      line-height: 24px;
      padding-top: 10px;
    }
  }

  .active {
    border-color: #97621d;
  }
}
</style>