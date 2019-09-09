<template>
  <div class="primary-button" @click="onClick" :class="{'border-radius': radius , 'loading': loading}">
    {{text}}

    <div class="loading-position">
       <vue-loading type="spin" color="#fff" :size="{ width: '20px', height: '20px' }" v-if="loading"></vue-loading>
    </div>
   
   
  </div>
</template>

<script>
import { VueLoading } from "vue-loading-template";
export default {
  components: {
    VueLoading
  },
  props: {
    text: String,
    radius: Boolean,
    loading: Boolean
  },
  methods: {
    onClick() {
      this.$emit("onClick");
    }
  }
};
</script>


<style lang="less" scoped>
.primary-button {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 0 20px;

  height: 42px;
  background: linear-gradient(
    180deg,
    rgba(55, 55, 55, 1),
    rgba(35, 34, 34, 1),
    rgba(0, 0, 0, 1)
  );
  // box-shadow:0px 6px 7px 0px rgba(72,72,72,0.48);
  border-radius: 4px;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  line-height: 29px;
  border: 2px solid #484848;
  user-select: none;
  position: relative;
  .loading-position{
    position: absolute;
    right: 2px;
  }
  &:hover {
    opacity: 0.7;
  }


}

  .loading{
    cursor: not-allowed;
    &:hover{
      opacity: 1;
    }
  }
.border-radius {
  border-radius: 21px;
}
</style>