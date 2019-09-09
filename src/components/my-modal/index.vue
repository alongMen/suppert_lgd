<template>
  <transition name="message-fade">
    <div class="my-modal" v-if="value">
      <div class="my-modal-wrap">
        <div class="my-modal-content" :style="{width: `${width}px`}">
          <div class="close" @click="close">
            <i class="iconfont iconxiaochazi"></i>
          </div>

          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>


<script>
export default {
  props: {
    value: Boolean,
    width: {
      default: 456,
      type: Number
    }
  },
  watch: {
    value: {
      immediate: true,
      handler: function(val) {
        const body = document.body;
        if (val) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "auto";
        }
      }
    }
  },
  methods:{
    close(){
      this.$emit('input' , false);
    }
  }
};
</script>



<style lang="less" scoped>
.my-modal {
  position: fixed;
  z-index: 200;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 1;
  background: rgba(0, 0, 0, 0.7);
  .my-modal-wrap {
    width: 100%;
    height: 100%;
  }
  .my-modal-content {
    margin: 0 auto;
    margin-top: 120px;
    position: relative;
    // min-width: 300px;
    border-radius: 4px;
    background: #212121;
    .close {
      position: absolute;
      right: 0;
      top: 0;
      width: 29px;
      height: 29px;
      background: #2b2a2a;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      &:hover i {
        color: #fff;
      }
    }
  }
}
</style>