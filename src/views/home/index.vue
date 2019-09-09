<template>
  <div class="home view-area-width">
    <home-header />

    <router-view></router-view>

  </div>
</template>





<script>

import MyInput from '@/components/my-input/index';
import HomeHeader from '@/components/home-header/index';

export default {
  components:{
    HomeHeader
  }
}
</script>