<template>
  <div class="withdraw-record user-center-main-area">
    <h4 class="recharge-title">提现记录</h4>
    <p class="tils">查看账号提现记录</p>
    <div class="searchForm">
      <Form :model="form" :label-width="60">
        <Row>
          <Col span="8">
            <FormItem label="日期">
              <DatePicker
                v-model="form.date"
                type="daterange"
                placeholder="开始时间 至 结束时间"
                style="width: 200px"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="4" style="text-align: center">
            <FormItem label="订单号">
              <Input v-model="form.num" placeholder="请输入订单号"></Input>
            </FormItem>
          </Col>
          <Col span="4" style="text-align: center">
            <FormItem label="账变类型">
              <Select v-model="form.withdrawType">
                <Option
                  v-for="(item, index) in withdrawType"
                  :value="item.value"
                  :key="index"
                >{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="4">
            <FormItem label="状态">
              <Select v-model="form.withdrawStatus">
                <Option
                  v-for="(item, index) in withdrawStatus"
                  :value="item.value"
                  :key="index"
                >{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="4">
            &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
            <Button type="warning" @click="getData">搜索</Button>
          </Col>
        </Row>
      </Form>
    </div>

    <Table
      :columns="columns"
      ref="selection"
      @on-selection-change="onSelect"
      no-data-text="暂无数据"
      :row-class-name="rowClassName"
      :loading="loading"
      :data="data"
    >
      <template slot="withdrawStatus" slot-scope="{ row }">
        <span v-if="row.withdrawStatus === 1" class="ing">待处理</span>
        <span v-if="row.withdrawStatus === 2" class="ing">处理中...</span>
        <span v-if="row.withdrawStatus === 3" class="success">通过</span>
        <span v-if="row.withdrawStatus === 4" class="error">失败</span>
      </template>
      <template slot="withdrawType" slot-scope="{ row }">
        <span v-if="row.withdrawType === 1">余额</span>
        <span v-if="row.withdrawType === 2">佣金</span>
      </template>

      <template slot="createTime" slot-scope="{ row }">
        <span v-if="row.createTime">
          {{
          formatBeijingDate(row.createTime)
          }}
        </span>
        <span v-else></span>
      </template>
      <template slot="finishTime" slot-scope="{ row }">
        <span v-if="row.finishTime">
          {{
          formatBeijingDate(row.finishTime)
          }}
        </span>
        <span v-else></span>
      </template>
    </Table>

    <div class="page" style="margin-top:10px;">
      <my-pagination :page="page" :size="size" @change="pageChange" :total="total" />
    </div>
  </div>
</template>
<script>
import { Input, Select, Button, Option } from "iview";
import MyPagination from "@/components/my-pagination/index";
import { get_WWithDrawal_list } from "@/service/index";
import { withdrawStatus, withdrawType } from "../../../../utils/options";

export default {
  components: {
    Input,
    Select,
    Button,
    Option,
    MyPagination
  },
  data() {
    return {
      withdrawStatus,
      withdrawType,
      data: [],
      total: 0,
      page: 1,
      size: 15,
      loading: false,
      columns: [
        {
          title: "订单号",
          key: "orderNo"
        },
        {
          title: "到手金额",
          key: "amount"
        },
        {
          title: "提现卡号",
          key: "memberBankCardNo"
        },
        {
          title: "状态",
          slot: "withdrawStatus"
        },
        {
          title: "类型",
          slot: "withdrawType"
        },
        {
          title: "完成时间",
          slot: "createTime",
          width: 150
        },
        {
          title: "完成时间",
          slot: "finishTime",
          width: 150
        }
      ],
      form: {
        date: [],
        orderId: "",
        withdrawType: "",
        withdrawStatus: ""
      }
    };
  },
  methods: {
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    },
    rowClassName(row, index) {
      if (index % 2 == 0) {
        return "ivu-table-stripe-even";
      } else return "ivu-table-stripe-odd";
    },
    onSelect(selection, index) {
      this.selecteds = selection;
    },
    pageChange(page) {
      this.page = page;
      this.getData();
    },
    async getData() {
      let query = {};
      query.orderId = this.form.orderId;
      query.withdrawType = this.form.withdrawType;
      query.withdrawStatus = this.form.withdrawStatus;

      if (this.form.date && this.form.date.length > 0) {
        query.startTime = this.form.date[0];
        query.endTime = this.form.date[1];
      }
      this.loading = true;
      const res = await get_WWithDrawal_list(this.page, this.size, query);
      this.loading = false;
      if (res.status < 400) {
        this.data = res.data.itemList;
        this.total = res.data.itemTotal;
      }
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
<style lang="less">
.withdraw-record {
  // padding: 10px;
  // width: 100%;
  .recharge-title {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
    line-height: 24px;
  }
  .tils {
    font-size: 13px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(164, 164, 164, 1);
    line-height: 24px;
  }
  .searchForm {
    margin: 15px auto 0 auto;
  }
  .pagebox {
    width: 100%;
    margin: 10px auto;
  }
  .success {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #67c48c;
  }
  .error {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #e23a3a;
  }
  .ing {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #7063e6;
  }
}
</style>
