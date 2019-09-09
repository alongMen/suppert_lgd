<template>
  <div class="withdraw-record user-center-main-area">
    <h4 class="recharge-title">佣金报表</h4>
    <p class="tils">查看佣金报表</p>
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
      <template slot="amount" slot-scope="{ row }">
        <span class="status-success" v-if="row.amount>0">{{row.amount}}</span>
        <span class="status-error" v-if="row.amount<0">{{row.amount}}</span>
      </template>

      <template slot="fundType" slot-scope="{ row }">
        <template v-for="(it, i) in fundType">
          <p :key="i">
            <span v-if="it.value == row.fundType">{{ it.label }}</span>
          </p>
        </template>
      </template>
      <template slot="fundStatus" slot-scope="{ row }">
        <span class="status-ing" v-if="row.fundStatus == 1">处理中...</span>
        <span class="status-success" v-if="row.fundStatus == 2">成功</span>
        <span class="status-error" v-if="row.fundStatus == 3">失败</span>
      </template>
      <template slot="currency" slot-scope="{ row }">
        <template v-for="(it, i) in currency">
          <p :key="i">
            <span v-if="it.value == row.currency">{{ it.label }}</span>
          </p>
        </template>
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
import { bill_change_record } from "@/service/index";

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
      fundType: [
        {
          label: "全部",
          value: 0
        },
        {
          label: "奖励",
          value: 1
        },
        {
          label: "转账存款",
          value: 5
        },
        {
          label: "转账取款",
          value: 6
        },
        {
          label: "平台转账",
          value: 7
        },
        {
          label: "充值",
          value: 9
        },
        {
          label: "人工转账",
          value: 10
        },
        {
          label: "人工补单",
          value: 11
        },
        {
          label: "提现",
          value: 20
        },
        {
          label: "注册",
          value: 25
        },
        {
          label: "结算",
          value: 30
        },
        {
          label: "佣金",
          value: 35
        },
        {
          label: "返水",
          value: 36
        },
        {
          label: "返积分",
          value: 37
        },
        {
          label: "余额调整",
          value: 40
        },
        {
          label: "其他",
          value: 99
        }
      ],
      currency: [
        { label: "余额", value: 1 },
        { label: "积分", value: 2 },
        { label: "佣金", value: 3 }
      ],
      data: [],
      total: 0,
      page: 1,
      size: 15,
      loading: false,
      columns: [
        {
          title: "金额",
          slot: "amount"
        },
        {
          title: "余额",
          key: "balance"
        },
        {
          title: "帐变类型",
          slot: "fundType"
        },
        {
          title: "帐变状态",
          slot: "fundStatus"
        },
        {
          title: "钱包类型",
          slot: "currency"
        },
        {
          title: "完成注册时间",
          slot: "finishTime",
          width: 150
        }
      ],
      form: {
        date: ""
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
      let query = {
        fundType: 35,
        currency: 3
      };
      if (this.form.date && this.form.date.length > 0) {
        query.startTime = this.form.date[0];
        query.endTime = this.form.date[1];
      }

      this.loading = true;
      const res = await bill_change_record(this.page, this.size, query);
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
