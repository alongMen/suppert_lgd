<template>
  <div class="forget-select">
    <loading-button
      class="button"
      text="手机找回"
      @handleClick="phone"
      padding="0 5px"
      v-if="check.phone"
    ></loading-button>
    <loading-button
      class="button margin"
      text="邮箱找回"
      @handleClick="email"
      padding="0 5px"
      v-if="check.eMail"
    ></loading-button>
    <loading-button
      class="button margin"
      text="客服找回"
      @handleClick="toService"
      padding="0 5px"
    ></loading-button>
  </div>
</template>

<script>
import LoadingButton from '@/components/loading-button/index';
export default {
  components: {
    LoadingButton,
  },
  props: {
    check: Object,
  },
  computed: {
    serviceUrl() {
      return this.$store.state.base.site_info.serviceUrl;
    },
  },
  methods: {
    toService() {
      this.$emit('toService');
    },
    phone() {
      this.$emit('setStep', 3);
      this.$emit('setTitle', '通过验证手机找回密码');
      this.$emit('setShowA', false);
    },
    email() {
      this.$emit('setStep', 4);
      this.$emit('setTitle', '通过验证邮箱找回密码');
      this.$emit('setShowA', false);
    },
  },
};
</script>

<style lang="less">
.forget-select {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .button {
    width: 101px;
    height: 39px;
  }
  .margin {
    margin-left: 20px;
  }
}
</style>
