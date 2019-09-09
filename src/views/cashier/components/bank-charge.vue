<template>
  <div class="off-line-bank">
    <div class="top-area">
      <div class="left">
        <p class="title">
          订单详情
        </p>

        <div class="form-item">
          <span class="label">收款账户名</span>
          <span class="content">{{ data.fullName }}</span>
        </div>

        <div class="form-item">
          <span class="label">卡号</span>
          <span class="content">{{ trim_bank_number(data.bankCardNo) }}</span>
        </div>

        <div class="form-item">
          <span class="label">开户行</span>
          <span class="content">{{ data.bankName }}</span>
        </div>

        <div class="form-item">
          <span class="label">服务银行</span>
          <span class="content">{{ data.brandCode }}</span>
        </div>

        <div class="form-item">
          <span class="label">附言码</span>
          <span class="content code">{{ data.attachCode }}</span>
        </div>

        <div class="form-item">
          <span class="label">手续费</span>
          <span class="content code">{{ parsePrice(data.fee) }}</span>
        </div>
      </div>

      <div class="right">
        <p class="title-tip">
          为保障充值成功，请在<span class="blue">30</span>分钟内完成充值
        </p>
        <div class="bank-img"></div>
      </div>
    </div>
    <div class="divide-line"></div>

    <div class="text-area">
      <p class="help-title"><i class="lgd_icon_creminder"></i>&nbsp;注意事项</p>
      <p class="p">
        若未保存转账信息关闭本页面，请到
        <span class="blue">个人中心 - 钱包 - 充值记录 </span>查询订单信息
      </p>
      <P class="p">若由于充值错误导致资金受损，本公司概不负责</P>
      <P class="p"
        >若付款<span class="blue">5</span
        >分钟未到账，请将您的信息及成功转账的截图提交给客服进行处理</P
      >
    </div>
  </div>
</template>

<script>
import { get_common_bank_list } from '@/service/index';
export default {
  props: {
    data: Object,
  },
  data() {
    return {
      bankList: [],
    };
  },
  methods: {
    get_bank_name(id) {
      let name;
      this.bankList.forEach(value => {
        if (value.id === id) {
          name = value.name;
        }
      });
      return name;
    },
    trim_bank_number(num) {
      if (!num) return;
      return num.replace(
        /(\d{4})(\d{4})(\d{4})(\d{4})(\d+)?/g,
        '$1 $2 $3 $4 $5',
      );
    },
  },
  async mounted() {
    const res = await get_common_bank_list();
    if (res.status < 400) {
      this.bankList = res.data;
    }
  },
};
</script>

<style lang="less" scoped>
.off-line-bank {
  padding-bottom: 30px;
  .top-area {
    display: flex;
    justify-content: space-between;
    width: 100%;
    // padding-bottom: 20px;
  }
  .left {
    .title {
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #333333;
      margin-bottom: 30px;
    }
    .form-item {
      display: flex;
      align-items: center;
      margin-bottom: 30px;
      .label {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #999999;
        width: 70px;
      }
      .content {
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #333333;
        margin-left: 112px;
      }
    }
  }

  .right {
    margin-right: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .title-tip {
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #999999;
      .blue {
        color: #4a95ec;
      }
    }
    .bank-img {
      width: 172px;
      height: 304px;
      background: url(https://lgdimage.blob.core.windows.net/project/bankImg.png);
    }
  }
  .divide-line {
    width: 100%;
    height: 1px;
    background: #eeeeee;
    margin: 30px 0;
  }
  .text-area {
    .blue {
      color: #4a95ec;
    }
    .help-title {
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #e23a3a;
      display: flex;
      align-items: center;
      position: relative;
      margin-bottom: 18px;
      i {
        position: absolute;
        left: -15px;
      }
    }
    .p {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #999999;
      margin-bottom: 10px;
    }
  }
  .code {
    color: #e23a3a !important;
  }
}
</style>
