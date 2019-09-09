<template>
  <div class="user-center-layout">
    <div class="sub-tab">
      <div
        class="tab"
        v-for="(item, index) in data"
        :key="index"
        :class="{ active: item.path === active }"
        @click="routeTo(item.path)"
      >
        {{ item.name }}
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  props: {
    data: Array,
    isPath: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      active: '',
    };
  },
  watch: {
    $route: {
      immediate: true,
      handler: function(to) {
        if (this.isPath) {
          const name = to.path;
          this.active = name;
        } else {
          const name = to.name;
          this.active = name;
        }
      },
    },
  },
  methods: {
    routeTo(name) {
      if (this.isPath) {
        this.$router.push(name);
      } else {
        this.$router.push({ name });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.user-center-layout {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  .sub-tab {
    width: 140px;
    min-height: 400px;
    background: rgba(21, 21, 21, 1);
    border: 1px solid rgba(43, 42, 42, 1);
    border-radius: 4px;
    padding: 0 10px;
    padding-bottom: 30px;
    .tab {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(164, 164, 164, 1);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 20px;
      user-select: none;
      height: 40px;
      cursor: pointer;
    }

    .active {
      background: linear-gradient(
        180deg,
        rgba(51, 51, 51, 1),
        rgba(0, 0, 0, 1)
      );
      box-shadow: 0px 6px 7px 0px rgba(72, 72, 72, 0.48);
      border-radius: 20px;
      color: #fff;
    }
  }
}
</style>
