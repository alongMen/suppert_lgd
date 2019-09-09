<template>
  <div class="overview">
    <div class="top">
      <div class="top-left">
        <TopLeft />
      </div>
      <div class="top-right">
        <TopRight />
      </div>
    </div>

    <div class="buttom">
      <Bottom />
    </div>
  </div>
</template>

<script>
import TopRight from './components/top-right';
import TopLeft from './components/top-left';
import Bottom from './components/bottom';
export default {
  components: {
    TopRight,
    TopLeft,
    Bottom,
  },
};
</script>

<style lang="less">
.overview {
  padding: 24px 0 69px 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .top {
    height: 380px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .top-left {
      width: 510px;
      height: 100%;
    }
    .top-right {
      margin-left: 19px;
      width: 470px;
      height: 100%;
    }
  }
  .buttom {
    margin-top: 34px;
    min-height: 312px;
    width: 100%;
  }
}
</style>
