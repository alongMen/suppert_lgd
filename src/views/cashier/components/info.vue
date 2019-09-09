<template>
  <div class="order-info">
    <span>订单提交成功，请您尽快支付！订单号: {{data.orderNo}}</span>
    <span>应付金额: <span class="sum">¥{{parsePrice(data.amount)}}</span></span>
  </div>
</template>


<script>
export default {
  data() {
    return {

    };
  },
  props:{
    data:Object,
  }
};
</script>

<style lang="less" scoped>
.order-info {
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #333333;
  .sum {
    font-family: PingFangSC-Medium;
    font-size: 22px;
    color: red;
    line-height: 22px;
  }
}
</style>
