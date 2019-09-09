<template>
  <div class="game-record-list">
    <record />
  </div>
</template>

<style lang="less">
.game-record-list {
}
</style>

<script>
import Record from './record.vue';
export default {
  components: {
    Record,
  },
  data() {
    return {
      type: '游戏记录',
    };
  },
};
</script>
