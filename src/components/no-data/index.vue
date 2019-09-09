<template>
  <div class="no-data">
    <img src="/image/no-data.png" alt="" height="152px" width="188px" />
    <div class="info">～{{ info }}～</div>
    <Button
      type="warning"
      style="margin-top:20px;"
      v-if="buttonInfo"
      @click="go"
      >{{ buttonInfo }}</Button
    >
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: String,
      default: '暂无任何数据哦',
    },
    buttonInfo: {
      type: String,
      default: '',
    },
  },
  methods: {
    go() {
      this.$emit('onClick');
    },
  },
};
</script>

<style lang="less">
.no-data {
  width: 100%;
  margin: 78px 0 130px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .info {
    margin-top: 27px;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(128, 128, 128, 1);
    line-height: 34px;
  }
}
</style>
