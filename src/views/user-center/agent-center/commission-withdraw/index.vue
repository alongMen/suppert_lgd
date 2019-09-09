<template>
  <div class="withdraw user-center-main-area">
    <loading v-if="loading" />
    <template v-else>
      <no-data
        v-if="noData"
        :info="'尚未添加银行卡'"
        @onClick="addCard"
        :buttonInfo="'去添加银行卡'"
      />
      <div v-else>
        <p class="title">请选择提现银行卡</p>
        <div class="card-list">
          <div
            class="bank-card"
            v-for="(item, index) in data"
            :key="index"
            :style="{
              backgroundImage: trans_card_bg(item.color),
              'margin-right': (index + 1) % 4 === 0 ? '0px' : '20px',
            }"
            @click="select(item)"
          >
            <div class="active" v-if="current === item.id"></div>
            <div class="card-top">
              <i class="logo-icon" :class="item.logo"></i>
              <span>{{ item.bankName }}</span>
            </div>

            <div class="card-no">
              <span>{{ item.bankCardNo.substr(0, 4) }}</span>
              <span>****</span>
              <span>****</span>
              <span>{{
                item.bankCardNo.substr(item.bankCardNo.length - 4)
              }}</span>
            </div>

            <span class="holder">{{ item.fullName }}</span>
          </div>
        </div>
        <div class="amout">
          <span>输入提款金额</span>
          <span class="info"
            >（可提款金额：<span class="number">{{
              parsePrice(validWithdraw)
            }}</span>
            元）</span
          >
        </div>
        <div class="input-amount">
          <InputNumber
            :min="0"
            :max="9999999"
            size="large"
            style="width:300px;"
            v-model="amount"
            placeholder="请输入提现金额"
          />
          <span class="info" style="margin-left:17px;"
            >单次提现金额：<span class="number"
              >{{ parsePrice(1) }} ~ {{ parsePrice(balance) }}</span
            >
            元</span
          >
        </div>
        <div class="amout" style="margin-top:20px;">
          <span>输入提现密码</span>
        </div>
        <div class="input-amount">
          <Input
            style="width:300px;"
            v-model="payPassword"
            placeholder="请输入提现密码"
            type="password"
          />
        </div>
        <PrimaryButton
          style="margin-top:38px;width:100px;"
          :text="'提现'"
          :radius="true"
          @onClick="ok"
        />

        <!-- <div class="withdraw-info">
          <Row :gutter="10">
            <Col :span="8">
              <div class="info">
                <span class="label">未达流水提现</span>
                <span class="item">{{ info.isFullFlow ? '是' : '否' }}</span>
              </div>
            </Col>
            <Col :span="8">
              <div class="info">
                <span class="label">可用流水</span>
                <span class="item">{{ parsePrice(info.needFlow) }}</span>
              </div>
            </Col>
            <Col :span="8">
              <div class="info">
                <span class="label">消耗流水</span>
                <span class="item">{{ parsePrice(costFlow) }}</span>
              </div>
            </Col>
          </Row>
          <Row :gutter="10">
            <Col :span="8">
              <div class="info">
                <span class="label">当日可提现次数</span>
                <span class="item">{{ info.todayCanWithdrawNo }}</span>
              </div>
            </Col>
            <Col :span="8">
              <div class="info">
                <span class="label">当日已提现次数</span>
                <span class="item">{{ info.usedWithdrawTimes }}</span>
              </div>
            </Col>
            <Col :span="8">
              <div class="info">
                <span class="label">免手续费次数</span>
                <span class="item">{{ info.noFeeNo }}</span>
              </div>
            </Col>
          </Row>
          <Row :gutter="10">
            <Col :span="8">
              <div class="info">
                <span class="label">手续费上限</span>
                <span class="number">{{
                  info.feeLimit === 0 && info.feeRate !== 0
                    ? '无上限'
                    : parsePrice(info.feeLimit) + '元'
                }}</span>
              </div>
            </Col>
            <Col :span="8">
              <div class="info">
                <span class="label">手续费率</span>
                <span class="number">{{ toPercent(info.feeRate) }}%</span>
              </div>
            </Col>
            <Col :span="8">
              <div class="info">
                <span class="label">行政费上限</span>
                <span class="number">{{
                  info.clasicalFeeLimit === 0 && info.clasicalRate !== 0
                    ? '无上限'
                    : parsePrice(info.clasicalFeeLimit) + '元'
                }}</span>
              </div>
            </Col>
            <Col :span="8">
              <div class="info">
                <span class="label">行政费率</span>
                <span class="number">{{ toPercent(info.clasicalRate) }}%</span>
              </div>
            </Col>
          </Row>
        </div> -->
      </div>
    </template>

    <my-modal v-model="showModal">
      <div class="edit-form">
        <p class="title">提示</p>
        <div class="divider"></div>

        <Form :label-width="75" label-position="left">
          <FormItem label="提款金额" prop="newPayPassword">
            <span class="number">¥ {{ parsePrice(amount) }}</span>
          </FormItem>

          <FormItem label="手续费" prop="confirmPayPassword">
            <span class="number">{{ parsePrice(fee) }}</span>
          </FormItem>

          <FormItem label="行政费" prop="confirmPayPassword">
            <span class="number">{{ parsePrice(adminFee) }}</span>
          </FormItem>

          <FormItem label="实际到账" prop="confirmPayPassword">
            <span class="number">¥ {{ parsePrice(income) }}</span>
          </FormItem>
        </Form>

        <primary-button
          style="width:110px;height:42px;margin: 14px auto"
          radius
          text="确定"
          @onClick="modalConfirm"
          :loading="modalLoading"
        />
      </div>
    </my-modal>

    <my-modal v-model="showPwdModal">
      <div class="edit-form">
        <p class="title">设置提现密码</p>
        <div class="divider"></div>

        <Form
          :label-width="75"
          label-position="left"
          :rules="rules"
          :model="form"
          ref="ruleForm"
        >
          <FormItem label="输入密码" prop="newPayPassword">
            <Input v-model="form.newPayPassword" type="password"></Input>
          </FormItem>

          <FormItem label="确认密码" prop="confirmPayPassword">
            <Input v-model="form.confirmPayPassword" type="password"></Input>
          </FormItem>
        </Form>

        <primary-button
          style="width:110px;height:42px;margin: 14px auto"
          radius
          text="确定"
          @onClick="pwdok"
          :loading="btnLoading"
        />
      </div>
    </my-modal>
  </div>
</template>

<script>
import MyModal from '@/components/my-modal/index';
import {
  get_user_bank_card_list,
  withdraw_info,
  withdraw_commission,
  set_pay_password,
} from '@/service/index';
import { InputNumber, Input } from 'iview';
import Loading from '@/components/loading/index';
import NoData from '@/components/no-data/index.vue';
import PrimaryButton from '@/components/primary-button/index';
export default {
  components: {
    InputNumber: InputNumber,
    Input: Input,
    NoData,
    PrimaryButton,
    MyModal,
    Loading,
  },
  data() {
    const validRepwd = (rule, value, cb) => {
      if (this.form.newPayPassword && value !== this.form.newPayPassword) {
        cb(new Error('两次密码不相同'));
      } else {
        cb();
      }
    };

    const validPwd = (rule, value, cb) => {
      const rep = /^\d{6}$/;
      if (value && !rep.test(value)) {
        cb(new Error('密码为6位纯数字'));
      } else {
        cb();
      }
    };
    return {
      form: {},
      data: [],
      current: 0,
      showPwdModal: false,
      btnLoading: false,
      amount: 0,
      loading: true,
      noData: false,
      pageLoading: true,
      info: {},
      payPassword: '',
      showModal: false,
      modalLoading: false,
      finish: false,
      rules: {
        newPayPassword: [
          { required: true, message: '请填写密码', trigger: 'blur' },
          { validator: validPwd, trigger: 'blur' },
        ],
        confirmPayPassword: [{ validator: validRepwd, trigger: 'blur' }],
      },
    };
  },
  computed: {
    bankList() {
      return this.$store.state.base.all_bank_list;
    },
    userInfo() {
      return this.$store.state.base.user_info;
    },
    balance() {
      return this.$store.state.base.commission;
    },
    fee() {
      // const { noFeeNo, feeRate, feeLimit } = this.info;
      // const amount = this.amount;
      let fee = 0;
      // if (!noFeeNo) {
      //   if (feeLimit === 0) {
      //     fee = parseFloat(amount) * feeRate;
      //   } else {
      //     fee =
      //       parseFloat(amount) * feeRate > feeLimit
      //         ? feeLimit
      //         : parseFloat(amount) * feeRate;
      //   }
      // } else {
      //   return 0;
      // }
      return fee;
    },

    adminFee() {
      // const { clasicalRate, clasicalFeeLimit, needFlow } = this.info;
      // const amount = this.amount;
      let adminFee = 0;
      // if (needFlow >= this.costFlow) {
      //   return 0;
      // } else {
      //   if (clasicalFeeLimit === 0) {
      //     adminFee = parseFloat(amount) * clasicalRate;
      //   } else {
      //     adminFee =
      //       parseFloat(amount) * clasicalRate > clasicalFeeLimit
      //         ? clasicalFeeLimit
      //         : parseFloat(amount) * clasicalRate;
      //   }
      // }
      return adminFee;
    },
    income() {
      return this.amount - this.fee - this.adminFee;
    },
    validWithdraw() {
      let amount = 0;
      const balance = this.balance;
      // const { isFullFlow, needFlow } = this.info;
      // if (isFullFlow) {
      //   amount = balance;
      // } else {
      //   if (needFlow > this.costFlow) {
      //     amount = balance;
      //   }
      // }
      return amount;
    },
  },
  methods: {
    checkRecord() {
      this.$router.push('/user-center/wallet/withdraw-record');
    },
    addCard() {
      this.$router.push('/user-center/wallet/bank-manage');
    },
    select(item) {
      this.current = item.id;
      this.card = item;
    },

    // },
    async getData() {
      const res = await get_user_bank_card_list();
      this.loading = false;
      if (res.status < 400) {
        this.data = res.data;
        if (res.data.length === 0) {
          this.noData = true;
        } else {
          this.noData = false;
        }
      }
    },
    async pwdok() {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          this.btnLoading = true;
          const res = await set_pay_password(this.form);
          this.btnLoading = false;
          if (res.status < 400) {
            this.$Message.success('支付密码设置成功');
            const userInfo = this.$store.state.base.user_info;
            userInfo.isPayPassword = true;
            this.$store.commit('setState', {
              module: 'base',
              key: 'user_info',
              value: userInfo,
            });
            this.showPwdModal = false;
          }
        }
      });
    },
    ok() {
      if (!this.userInfo.isPayPassword) {
        this.showPwdModal = true;
        return;
      }
      const amount = parseFloat(this.amount);
      if (!this.amount) {
        this.$Message.error('请输入金额');

        return;
      }
      if (!this.current) {
        this.$Message.error('请选择银行');

        return;
      }
      if (!this.payPassword) {
        this.$Message.error('请输入密码');

        return;
      }
      const rep = /^\d{6}$/;
      if (this.payPassword && !rep.test(this.payPassword)) {
        this.$Message.error('提款密码为6位纯数字');

        return;
      }

      // if (this.info.usedWithdrawTimes >= this.info.todayCanWithdrawNo) {
      //   this.$Message.error('本日提款次数已达上限');

      //   return;
      // }

      // if (this.info.chargeTimes === 0) {
      //   this.$tips({
      //     type: "error",
      //     message: "请先充值!"
      //   });
      //   return;
      // }


      // const { singleMin, singleMax } = this.info;

      // if (!this.info.isFullFlow) {
      //   if (this.info.needFlow < this.costFlow) {
      //     this.$Message.error('未满足流水不可提现!');

      //     return;
      //   }
      // }
      // if (this.info.usedWithdrawTimes >= this.info.todayCanWithdrawNo) {
      //   this.$Message.error('当日提现次数已达上限');

      //   return;
      // }

      if (amount < 1 || amount > this.balance) {
        this.$Message.error(`佣金提款金额为${1} ~ ${this.balance}元`);

        return;
      }
     
      this.showModal = true;
    },
    trans_card_bg(color) {
      if (!color) {
        color = '#EB4742,#D12D26';
      }
      const colorArr = color.split(',');
      const css = `linear-gradient(-90deg, ${colorArr[0]} 0%, ${
        colorArr[1]
      } 100%)`;
      return css;
    },
    async getInfo() {
      const res = await withdraw_info();
      this.pageLoading = false;
      if (res.status < 400) {
        this.info = res.data;
      }
    },
    async modalConfirm() {
      this.modalLoading = true;
      const res = await withdraw_commission({
        bankCardId: this.current,
        amount: this.amount,
        payPassword: this.payPassword,
      });
      this.modalLoading = false;
      if (res.status < 400) {
        this.$Message.success('发起佣金提款成功!');

        this.showModal = false;
        this.finish = true;
        this.$store.dispatch('get_user_info');
        this.current = 0
        this.amount = 0
        this.payPassword = ''
        this.getInfo();
      } else {
        this.showModal = false;
      }
    },
  },

  async mounted() {
    await this.$store.dispatch('get_user_info');
    if (!this.userInfo.isPayPassword) {
      this.showPwdModal = true;
    }
    if (this.bankList.length === 0) {
      await this.$store.dispatch('get_common_bank_list');
    }
    this.getData();
    this.getInfo();
  },
};
</script>

<style lang="less">
.withdraw {
  .card-list {
    display: flex;
    margin-top: 20px;
    flex-wrap: wrap;
  }
  // .withdraw-item-selected {
  //   border-width: 5px !important;
  //   border-style: solid !important;
  //   border-color: #cf9c03 !important;
  //   opacity: 0.6;
  // }
  .bank-card {
    width: 180px;
    height: 118px;
    margin-right: 20px;
    border-radius: 6px;
    user-select: none;
    position: relative;
    margin-bottom: 20px;
    cursor: pointer;
    // &:hover {
    //   opacity: 0.6;
    // }

    .card-top {
      display: flex;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
      align-items: center;
      padding: 10px;
      span {
        margin-left: 10px;
      }
    }

    .card-no {
      padding-left: 3px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
      line-height: 24px;
      margin-top: 12px;
    }

    .holder {
      display: block;
      margin-left: 10px;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
      line-height: 24px;
      margin-top: 10px;
    }

    .active {
      width: 30px;
      height: 30px;
      background-image: url('/image/wallet/correct.png');
      position: absolute;
      right: 10px;
      top: 5px;
      background-size: contain;
    }
  }
  .info {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #a4a4a4;
    line-height: 24px;
    .number {
      color: #ffc000;
    }
  }
  .amout {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
    line-height: 24px;
  }
  .input-amount {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 15px;
  }
  .withdraw-info {
    width: 789px;
    height: 170px;
    background: #333333;
    margin-top: 30px;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;

    line-height: 25px;
    .info {
      margin-left: 18px;
      margin-top: 17px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 235px;
      .label {
        color: #a4a4a4;
      }
      .item {
        color: #ffffff;
      }
    }
  }
  .edit-form {
    padding: 20px;
    width: 466px;
    min-height: 300px;

    .sub-title {
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(128, 128, 128, 1);
      line-height: 29px;
    }

    .divider {
      height: 1px;
      width: 100%;
      background: #a4a4a4;
      margin: 20px 0;
    }
  }
  .number {
    color: #ffc000;
  }
  .active {
    width: 30px;
    height: 30px;
    background-image: url('/image/wallet/correct.png');
    position: absolute;
    right: 10px;
    top: 5px;
    background-size: contain;
  }
}
</style>
