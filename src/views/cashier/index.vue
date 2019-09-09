<template>
  <div class="cashier">
    <div class="loading-cashier" v-if="loading">
      <div class="loading">
        <vue-loading
          type="spin"
          color="#fff"
          :size="{ width: '40px', height: '40px' }"
        ></vue-loading>
        <p class="loading-text">充值提交中...</p>
      </div>
    </div>
    <div class="old-cashier" v-else>
      <div v-if="this.data.showType === 1 || this.data.showType === 2">
        <form :action="data.payUrl" id="form" method="POST">
          <input
            v-for="(item, i) in data.dataItemList"
            :key="i"
            type="hidden"
            :name="item.itemKey"
            :value="item.itemValue"
          />
        </form>
      </div>
      <div v-if="!this.data.showType">
        <div class="w1200">
          <c-header />

          <info :data="data" />
          <div class="content-wrap">
            <bank :data="data" v-if="data.providerName === 21" />
            <qr-pay
              :data="data"
              v-if="data.providerName === 1 || data.providerName === 2"
            />
          </div>

          <div class="line"></div>
          <c-footer />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueLoading } from 'vue-loading-template';
import { charge_confirm } from '@/service/index';
import CHeader from './components/header.vue';
import CFooter from './components/footer';
import Bank from './components/bank-charge';
import Info from './components/info';
import QrPay from './components/qr-pay';
export default {
  components: {
    VueLoading,
    CHeader,
    CFooter,
    Bank,
    Info,
    QrPay,
  },
  data() {
    return {
      loading: true,
      data: {},
      html: '',
    };
  },
  async mounted() {
    const query = sessionStorage.getItem('cashier');
    if (query) {
      const res = await charge_confirm(JSON.parse(query));
      sessionStorage.clear();
      this.loading = false;
      if (res.status < 400) {
        // showtype 1:html 2:form 3:url
        this.data = res.data;
        if (this.data.showType === 3) {
          window.location.href = this.data.payUrl;
          return;
        }
        localStorage.setItem('cash', JSON.stringify(this.data));
        if (this.data.providerName >= 31) {
          this.$nextTick(() => {
            document.forms['form'].submit();
          });
        }
      } else {
        this.$router.replace('/user-center/wallet/recharge');
        this.$Message.error('充值失败，请换一种充值方式');
      }
    } else {
      this.loading = false;
      const cash = localStorage.getItem('cash');
      this.data = JSON.parse(cash);
      if (this.data.providerName >= 31) {
        this.$nextTick(() => {
          document.forms['form'].submit();
        });
      }
    }
  },
};
</script>

<style lang="less" scoped>
.cashier {
  .loading-cashier {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 3;
    overflow: auto;

    .loading {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .loading-text {
        color: #fff;
        font-size: 20px;
        padding-top: 10px;
      }
    }
  }
  .old-cashier {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    overflow: auto;
    .line {
      width: 100%;
      height: 1px;
      background: #dddddd;
      margin-bottom: 30px;
    }
    .content-wrap {
      margin-top: 50px;
      min-height: 300px;
      background: #ffffff;
      box-shadow: 0 2px 16px 0 rgba(51, 51, 51, 0.2);
      border-radius: 4px;
      padding-top: 25px;
      padding-left: 40px;
      margin-bottom: 50px;
    }
  }

  .w1200 {
    width: 1200px;
    margin: 0 auto;
    background: white;
  }
}
</style>
