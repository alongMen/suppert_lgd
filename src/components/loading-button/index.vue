<template>
  <div
    class="button-wrap trans-ok-btn"
    :style="{
      cursor:
        loading || disabled || withdrawDisabled ? 'not-allowed' : 'pointer',
      padding: padding ? padding : '0 40px',
    }"
    @click="click"
  >
    <div class="mask" v-if="loading"></div>
    <span class="button-text">
      {{ text }}
      <span class="loading" v-if="loading">
        <vue-loading
          type="bars"
          color="#fff"
          :size="{ width: '15px', height: '15px' }"
        ></vue-loading>
      </span>
    </span>
  </div>
</template>

<script>
import { VueLoading } from 'vue-loading-template';
export default {
  components: {
    VueLoading,
  },
  props: {
    text: String,
    loading: Boolean,
    satisfield: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    withdrawDisabled: {
      type: Boolean,
      default: false,
    },
    padding: {
      type: String,
      default: '',
    },
  },
  methods: {
    click() {
      if (this.loading) {
        return;
      }
      if (this.disabled) {
        return;
      }

      this.$emit('handleClick');
    },
  },
};
</script>

<style lang="less" scoped>
.button-wrap {
  // background-image: linear-gradient(-269deg, #4b83f3 0%, #2e67d9 100%);
  background: #333333;
  // box-shadow: 0 2px 4px 0 rgba(75, 131, 243, 0.6);
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  padding: 0 40px;
  position: relative;
  user-select: none;
  transition: all 0.3s;
  &:hover {
    // opacity: 0.8;
    background: #97621d;
  }
  cursor: pointer;
  .button-text {
    line-height: 30px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #ffffff;
    position: relative;
    display: flex;
    .loading {
      position: absolute;
      top: 3px;
      right: -20px;
    }
  }
  .mask {
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background-color: hsla(0, 0%, 100%, 0.35);
  }
}
</style>
