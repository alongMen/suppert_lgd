<template>
  <div class="user-center-main-area bank-manage">
    <p class="title">银行卡管理</p>

    <div class="add-button" @click="add">
      <i class="iconfont iconjiahao"></i>
      <span>添加新卡</span>
    </div>

    <div class="card-list">
      <div
        class="bank-card"
        v-for="(item, index) in data"
        :key="index"
        :style="{
          backgroundImage: trans_card_bg(item.color),
          'margin-right': (index + 1) % 4 === 0 ? '0px' : '20px',
        }"
      >
        <div class="mask">
          <i class="iconfont iconlajitong1" @click="remove(item)"></i>
        </div>

        <div class="card-top">
          <i class="logo-icon" :class="item.logo"></i>
          <span>{{ item.bankName }}</span>
        </div>

        <div class="card-no">
          <span>{{ item.bankCardNo.substr(0, 4) }}</span>
          <span>****</span>
          <span>****</span>
          <span>{{ item.bankCardNo.substr(item.bankCardNo.length - 4) }}</span>
        </div>

        <span class="holder">{{ item.fullName }}</span>
      </div>
    </div>
    <my-modal v-model="showModal">
      <div class="edit-form">
        <p class="title">添加银行卡</p>
        <p class="sub-title">添加新的提现卡</p>
        <div class="divider"></div>

        <Form
          :label-width="75"
          label-position="left"
          :rules="rules"
          :model="form"
          ref="form"
        >
          <FormItem label="银行" prop="bankNameId">
            <Select v-model="form.bankNameId">
              <Option
                v-for="(item, index) in all_bank_list"
                :key="index"
                :value="item.id"
                >{{ item.name }}</Option
              >
            </Select>
          </FormItem>

          <FormItem label="开户行" prop="branchName">
            <Input v-model="form.branchName"></Input>
          </FormItem>

          <FormItem label="持卡人" prop="fullName">
            <Input v-model="form.fullName" :readonly="hasName"></Input>
          </FormItem>

          <FormItem label="手机号码" prop="phone">
            <Input v-model="form.phone"></Input>
          </FormItem>

          <FormItem label="卡号" prop="bankCardNo">
            <Input v-model="form.bankCardNo"></Input>
          </FormItem>

          <FormItem label="确认卡号" prop="recardNo">
            <Input v-model="form.recardNo"></Input>
          </FormItem>
        </Form>

        <primary-button
          style="width:110px;height:42px;margin: 14px auto"
          radius
          text="添加"
          @onClick="ok"
          :loading="btnLoading"
        />

        <p class="sub-title" style="text-align:center">
          *后续只能添加该卡持卡人名下的银行卡
        </p>
      </div>
    </my-modal>
  </div>
</template>

<script>
import {
  get_user_bank_card_list,
  add_user_bank_card,
  remove_user_bank_card,
} from '@/service/index';
import MyModal from '@/components/my-modal/index';
import { Form, Input, Select, Option } from 'iview';
import PrimaryButton from '@/components/primary-button/index';
import { validMobile, validBankCard } from '@/utils/validate';
export default {
  components: {
    MyModal,
    Form: Form,
    FormItem: Form.Item,
    Input: Input,
    Select: Select,
    Option: Option,
    PrimaryButton,
  },
  data() {
    const validRecardNo = (rule, value, cb) => {
      if (this.data.bankCardNo && value !== this.data.bankCardNo) {
        cb(new Error('两次卡号不相同'));
      } else {
        cb();
      }
    };
    return {
      data: [],
      showModal: false,
      rules: {
        fullName: [
          { required: true, message: '请填写持卡人', trigger: 'blur' },
        ],
        branchName: [
          { required: true, message: '请填写开户行', trigger: 'blur' },
        ],
        phone: [
          { required: true, message: '请填写手机号码', trigger: 'blur' },
          { validator: validMobile, trigger: 'blur' },
        ],
        bankNameId: [
          {
            required: true,
            message: '请选择银行',
            trigger: 'change',
            type: 'number',
          },
        ],
        // cardType:[
        //   {required: true, message: '请选择银行卡类型', trigger: 'change'},
        // ],
        bankCardNo: [
          { required: true, message: '请填写卡号', trigger: 'blur' },
          { validator: validBankCard, trigger: 'blur' },
        ],
        recardNo: [{ validator: validRecardNo, trigger: 'blur' }],
      },
      form: {},
      btnLoading: false,
      hasName: false,
    };
  },

  computed: {
    all_bank_list() {
      return this.$store.state.base.all_bank_list;
    },
  },
  methods: {
    add() {
      if (this.hasName) {
        this.form = {
          fullName: this.data[0].fullName,
        };
      } else {
        this.form = {};
      }

      this.showModal = true;
    },
    async getData() {
      const res = await get_user_bank_card_list();
      if (res.status < 400) {
        if (res.data.length > 0) {
          this.hasName = true;
        }
        this.data = res.data;
      }
    },
    trans_card_bg(color) {
      if (!color) {
        console.log('没有color');
        color = '#EB4742,#D12D26';
      }
      const colorArr = color.split(',');
      const css = `linear-gradient(-90deg, ${colorArr[0]} 0%, ${
        colorArr[1]
      } 100%)`;
      return css;
    },
    async ok() {
      const form = this.$refs.form;
      const valid = await form.validate();
      if (!valid) {
        return;
      }
      this.btnLoading = true;
      const res = await add_user_bank_card(this.form);
      this.btnLoading = false;
      if (res.status < 400) {
        this.$Message.success('添加银行卡成功!');
        this.showModal = false;
        this.getData();
      }
    },
    remove(item) {
      const id = item.id;
      this.$Modal.confirm({
        title: '提示',
        content: '确认要删除银行卡？',
        loading: true,
        onOk: async () => {
          const res = await remove_user_bank_card(id);
          this.$Modal.remove();
          if (res.status < 400) {
            this.$Message.success('删除成功!');
            this.getData();
          } else {
            this.$Message.error('删除失败!');
          }
        },
      });
    },
  },
  mounted() {
    if (this.all_bank_list.length === 0) {
      this.$store.dispatch('get_common_bank_list');
    }
    this.getData();
  },
};
</script>

<style lang="less" scoped>
.bank-manage {
  .add-button {
    margin-top: 20px;
    width: 180px;
    height: 118px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px dotted #808080;
    border-radius: 6px;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(164, 164, 164, 1);
    user-select: none;
    cursor: pointer;
    span {
      margin-left: 10px;
      transition: all 0.2s;
    }

    i {
      transition: all 0.2s;
    }

    &:hover {
      border-color: transparent;
      background: #333333;
    }

    &:hover span {
      font-size: 16px;
    }
  }

  .card-list {
    display: flex;
    margin-top: 20px;
    flex-wrap: wrap;
  }

  .bank-card {
    width: 180px;
    height: 118px;
    margin-right: 20px;
    border-radius: 6px;
    user-select: none;
    position: relative;
    margin-bottom: 20px;
    .mask {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      border-radius: 6px;
      transition: all 0.2s;
      opacity: 0;
      align-items: center;
      justify-content: center;
      i {
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        &:hover {
          color: #f8fc9e;
        }
      }
    }

    &:hover .mask {
      opacity: 1;
    }

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
  }

  .edit-form {
    padding: 20px;
    width: 466px;
    height: 550px;

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
}
</style>
