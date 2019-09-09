<template>
  <div id="app">
    <router-view />
    <app-footer v-if="!$route.meta.hideFooter" />


    <login-modal v-model="show"/>
    <trans-modal />

    

  </div>
</template>

<script>
import AppFooter from './components/app-footer/index';
import { Button } from 'iview';
import LoginModal from './components/login-modal/index';
import TransModal from './components/trans-modal/index';
export default {
  components: {
    AppFooter,
    [Button.name]: Button,
    LoginModal,
    TransModal
  },

  computed: {
    show: {
      get() {
        return this.$store.state.base.isOpenLoginModal;
      },
      set(show) {
        this.$store.commit('set_login_modal_status', show);
      },
    },
  },

  methods: {},

  created() {
    //判断是否已登录
    const token = localStorage.getItem('token');
    if (token) {
      this.$store.commit('set_login_status', true);
      this.$store.dispatch('get_user_info');
    }

    //
  },
  async mounted() {
    await this.$store.dispatch('get_site_info');
  },
};
</script>

<style lang="less">
#app {
}
</style>
