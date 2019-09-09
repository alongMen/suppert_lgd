<template>
  <input type="text" class="my-input" :placeholder="placeholder" v-model="val" />
</template>






<script>
export default {

  props:{
    placeholder:String,
    value: String,
  },

  computed:{
    val:{
      get(){
        return this.value;
      },
      set(val){
        this.$emit('input' , val);
      }
    }
  },

};
</script>


<style lang="less">
.my-input {
  background-color: inherit;
  outline: none;
  border: 1px solid rgba(36, 36, 36, 1);
  height: 26px;
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  padding-left: 10px;
  border-radius: 4px;
  width: 100%;
  &::placeholder{
    font-size:12px;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(128,128,128,1);
  }
}
</style>