<template>
  <div class="index">
    <home-banner />
    <home-grid />
    <home-tils />
    <Partner />
  </div>
</template>


<script>
import HomeBanner from './components/home-banner';
import HomeGrid from './components/home-grid';
import HomeTils from './components/home-gametils';
import Partner from './components/home-Partner';
export default {
  components:{
    HomeBanner,
    HomeGrid,
    HomeTils,
    Partner
  }
}
</script>


<style lang="less" scoped>
.index{
  width: 100%;
}
</style>