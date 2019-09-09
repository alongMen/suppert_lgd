<template>
  <div class="total-assets">
    <chart />
    <wallets />
  </div>
</template>




<script>
import Chart from './chart';
import Wallets from './wallets'
export default {
  components:{
    Chart,
    Wallets
  }
}
</script>




<style lang="less" scoped>
.total-assets{
  display: flex;
  flex:1;
  margin-left: 15px;
  justify-content: space-between;
}
</style>