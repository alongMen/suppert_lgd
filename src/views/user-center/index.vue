<template>
  <div class="user-center view-area-width">
    <user-center-header />

    <router-view></router-view>
  </div>
</template>

<script>
import UserCenterHeader from '../../components/user-center-header/index';
export default {
  components: {
    UserCenterHeader,
  },
  async mounted() {
    await this.$store.dispatch('get_user_info');
  },
};
</script>

<style lang="less">
.user-center {
  margin-top: 28px;
}
</style>
