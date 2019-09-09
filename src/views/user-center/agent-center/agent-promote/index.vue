<template>
  <div class="user-center-main-area member-promote">
    <p class="title">代理推广链接</p>

    <loading v-if="loading" />

    <template v-else>
      <div class="main">
        <img :src="img" alt />
        <div class="infos">
          <p class="sub-title">链接</p>
          <div class="value">
            {{ link }}
            <div class="button" style="margin-left:20px;" @click="copy">
              复制链接
            </div>
          </div>

          <p class="sub-title" style="margin-top:30px">邀请码</p>

          <div class="value">{{ data.code }}</div>
        </div>
      </div>
      <div
        class="button"
        style="width:100px;margin-top:20px;margin-left:28px"
        @click="save"
      >
        保存二维码
      </div>

      <div class="tips">
        <p class="tip">*通过该推广链接注册，成为您的下线代理</p>
      </div>
    </template>
    <list />
  </div>
</template>

<script>
import { get_team_promotion } from '@/service/index';
import Loading from '@/components/loading/index';
import list from './promotelist';

import QRCode from 'qrcode';
import copy from 'copy-to-clipboard';

import { download } from '@/utils/base';
export default {
  components: {
    Loading,
    list,
  },
  data() {
    return {
      data: {},
      loading: true,
      img: '',
    };
  },
  computed: {
    mobile_url() {
      return this.$store.state.base.mobile_url;
    },
    link() {
      return location.origin + '/reg?promotionCode=' + this.data.code;
    },
  },
  methods: {
    async getData() {
      const res = await get_team_promotion(2);
      await this.$store.dispatch('get_mobile_url');
      this.loading = false;
      if (res.status < 400) {
        const self = this;
        this.data = res.data;
        QRCode.toDataURL(
          'http://' + this.mobile_url + '/reg?promotionCode=' + this.data.code,
          { width: 150, height: 150 },
          function(err, url) {
            self.img = url;
          },
        );
      }
    },
    copy() {
      copy(this.link);
      this.$Message.success('复制成功');
    },
    save() {
      download(this.img);
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style lang="less" scoped>
.member-promote {
  .main {
    margin-top: 24px;
    display: flex;
  }
  .infos {
    margin-left: 30px;
  }
  .sub-title {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(164, 164, 164, 1);
  }

  .value {
    color: #fff;
    font-size: 16px;
    display: flex;
    align-items: center;
  }
  .button {
    user-select: none;
    cursor: pointer;
    height: 26px;
    padding: 4px 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    background: #333333;
    &:hover {
      background: #d19f05;
    }
  }

  .tips {
    width: 100%;
    height: 65px;
    background: #333333;
    margin-top: 50px;
    padding: 20px;
    .tip {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(164, 164, 164, 1);
      line-height: 25px;
    }
  }
}
</style>
