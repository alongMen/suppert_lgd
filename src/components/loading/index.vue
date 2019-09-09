<template>
  <div class="loading">
    <vue-loading type="spin" color="#fff" :size="{ width: '20px', height: '20px' }" ></vue-loading>
  </div>
</template>


<script>
import { VueLoading } from "vue-loading-template";
export default {
  components: {
    VueLoading
  }
};
</script>

<style lang="less" scoped>
.loading {
  width: 100%;
  // height: 100%;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>