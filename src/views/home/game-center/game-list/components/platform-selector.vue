<template>
  <div class="platform-selector">
    <div 
      class="item" 
      v-for="(item, index) in data" 
      :key="index" 
      @click="select(item)"
      :class="{'active': platformId === item.id}"
      >
      <span class="name">{{item.name}}</span>
    </div>
  </div>
</template>



<script>
import { get_platform_list_by_type } from "@/service/index";
export default {

  props:{
    platformId:Number,
  },

  data() {
    return {
      data: [],
    
    };
  },
  watch: {
    $route: {
      immediate: true,
      handler: function(to) {
        this.getData();
      }
    }
  },
  methods: {
    select(item){
      this.$emit('selectPlatfrom' , item.id);
    },

    async getData() {
      const id = this.$route.params.id;
      const res = await get_platform_list_by_type(id);
      if (res.status < 400) {
        this.data = res.data;
      }
    }
  }
};
</script>


<style lang="less" scoped>
.platform-selector {
  width: 100%;
  height: 50px;
  margin: 30px 0;
  // background-color: green;
  display: flex;
  .item {
    width: 168px;
    height: 50px;
    background: rgba(27, 27, 27, 1);
    border: 1px solid rgba(112, 112, 112, 1);
    border-radius: 26px;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(166, 166, 166, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
    user-select: none;
    cursor: pointer;
    .name {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(166, 166, 166, 1);
    }
  }

  .active {
    background: #373737;
    border: 1px solid rgba(112, 112, 112, 1);
    .name {
      color: #fff;
    }
  }
}
</style>