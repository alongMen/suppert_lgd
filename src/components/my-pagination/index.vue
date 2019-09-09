<template>
  <div class="my-pagination">
    <Page :total="total" show-total :current="page" :page-size="size" @on-change="change" />
  </div>
</template>





<script>
import { Page } from "iview";
export default {
  components: {
    Page
  },
  props: {
    total: Number,
    page: Number,
    size: Number
  },
  methods: {
    change(page) {
      this.$emit("change", page);
    }
  }
};
</script>

<style lang="less">
.my-pagination {
  display: flex;
  align-items: center;
  justify-content: center;

  .ivu-page-total {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(166, 166, 166, 1);
  }

  .ivu-page-prev,.ivu-page-next {
    background: #292929;
    border: 1px solid rgba(64, 64, 64, 1);
    border-radius: 2px;
    &:hover a{
      color: #fff;
    }
  }

  .ivu-page-item {
    background: #292929;
    border: 1px solid rgba(64, 64, 64, 1);
    border-radius: 2px;
    &:hover a{
      color: #fff;
    }
  }

  .ivu-page-item-active {
    background: rgba(186, 121, 35, 1);
    border: 1px solid rgba(186, 121, 35, 1);
    a{
      color: #fff;
    }
  }

  .ivu-page-item-jump-next{
    &:hover a{
      color: #fff;
    }
  }
}
</style>