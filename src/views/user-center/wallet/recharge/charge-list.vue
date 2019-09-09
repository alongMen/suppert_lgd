<template>
  <div class="charge-list">
    <p class="sub-title">请选择支付方式</p>

    <div class="list">
      <div
        class="item"
        v-for="(item, index) in data"
        :key="index"
        :style="{'margin-right': (index + 1) % 4 === 0 ? '0px' : '20px'}"
        @click="select(item)"
      >
        <div class="active" v-if="id === item.id"></div>

        <p class="display">{{item.providerDisplay}}</p>
        <p class="name">{{item.paymentChannel}}</p>
      </div>
    </div>
  </div>
</template>




<script>
export default {
  props: {
    data: Array,
    type: Number, // 1 bank 2 ali 3 wechat 4 online
    id: Number,
  },
  methods:{
    select(item){
      this.$emit('select' , item.id);
    }
  }
};
</script>


<style lang="less" scoped>
.charge-list {


  .list{
    display: flex;
  }


  .item {
    width: 180px;
    height: 118px;
    background: linear-gradient(
      0deg,
      rgba(191, 61, 49, 1),
      rgba(128, 24, 16, 1)
    );
    border-radius: 6px;
    user-select: none;
    cursor: pointer;
    padding: 14px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    position: relative;
  }

  .active{
    width: 30px;
    height: 30px;
    background-image: url('/image/wallet/correct.png');
    position: absolute;
    right: 10px;
    top: 5px;
    background-size: contain;
  }

  .sub-title {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(164, 164, 164, 1);
    line-height: 24px;
    margin: 20px 0;
  }

  .display {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
    line-height: 24px;
  }
  .name {
    padding-top: 14px;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 24px;
  }
}
</style>