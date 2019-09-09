<template>
  <div>
    <loading v-if="loading" />
    <transition name="message-fade" v-else>
      <div class="board-detail-modal" v-if="value">
        <div class="modal-content">
          <div class="close" @click="close">
            <i class="iconfont iconxiaochazi"></i>
          </div>

          <div>
            <p class="title">{{ data.title }}</p>

            <p class="date">{{ formatBeijingDate(data.createTime) }}</p>
          </div>

          <div class="line"></div>

          <div class="content" v-html="data.description"></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Loading from '@/components/loading/index';
import { get_board_detail } from '@/service/index';
export default {
  components: {
    Loading,
  },
  props: {
    value: Boolean,
    id: Number,
  },
  data() {
    return {
      loading: false,
      data: {},
    };
  },
  watch: {
    value: {
      immediate: true,
      handler: function(val) {
        const body = document.body;
        if (val) {
          document.body.style.overflow = 'hidden';
          this.getData();
        } else {
          document.body.style.overflow = 'auto';
        }
      },
    },
  },
  methods: {
    async getData() {
      this.loading = true;
      const res = await get_board_detail(this.id);
      this.loading = false;
      if (res.status < 400) {
        this.data = res.data;
      }
    },
    close() {
      this.$emit('input', false);
    },
  },
};
</script>

<style lang="less" scoped>
.board-detail-modal {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(55, 55, 55, 0.6);
  opacity: 1;
  transition: opacity 0.3s;

  .modal-content {
    width: 620px;
    height: 450px;
    background: #212121;
    border: 3px solid rgba(43, 42, 42, 1);
    margin: 0 auto;
    margin-top: 160px;
    position: relative;
    padding: 20px;
    .close {
      width: 30px;
      height: 30px;
      background: #2b2a2a;
      right: 0;
      top: 0;
      position: absolute;
      line-height: 30px;
      text-align: center;
      cursor: pointer;
      i {
        color: #a4a4a4;
        transition: all 0.2s;
      }

      &:hover i {
        color: #fff;
      }
    }

    .title {
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }

    .date {
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(128, 128, 128, 1);
      line-height: 29px;
    }

    .line {
      height: 1px;
      width: 100%;
      background: #a4a4a4;
      margin: 10px 0;
    }
  }

  .content {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #a4a4a4;
    line-height: 24px;
    overflow: auto;
  }
}
</style>
