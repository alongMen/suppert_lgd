<template>
  <div class="bill-record user-center-main-area">
    <h4 class="recharge-title">账号流水</h4>
    <p class="tils">查看账号流水记录</p>
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
          <Col span="6" style="text-align: center">
            <FormItem label="账变类型">
              <Select v-model="form.fundType">
                <Option
                  v-for="(item, index) in fundTypes"
                  :value="item.value"
                  :key="index"
                >{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="状态">
              <Select v-model="form.currency">
                <Option
                  v-for="(item, index) in currencys"
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
      <template slot="fundType" slot-scope="{ row }">
        <template v-for="(it, i) in fundTypes">
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
        <template v-for="(it, i) in currencys">
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
import { get_WFund_list } from "@/service/index";
import { fundTypes, currencys } from "../../../../utils/options";

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
      fundTypes,
      currencys,
      data: [],
      total: 0,
      page: 1,
      size: 15,
      loading: false,
      columns: [
        {
          title: "金额",
          key: "amount"
        },
        {
          title: "余额",
          key: "balance"
        },
        {
          title: "账变类型",
          slot: "fundType"
        },
        {
          title: "账变状态",
          slot: "fundStatus"
        },
        {
          title: "钱包类型",
          slot: "currency"
        },
        {
          title: "完成时间",
          slot: "finishTime",
          width: 150
        }
      ],
      form: {
        date: [],
        fundType: "",
        currency: ""
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
      query.fundType = this.form.fundType;
      query.currency = this.form.currency;

      if (this.form.date && this.form.date.length > 0) {
        query.startTime = this.form.date[0];
        query.endTime = this.form.date[1];
      }
      this.loading = true;
      const res = await get_WFund_list(this.page, this.size, query);
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
.bill-record {
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
  .error {
    color: red !important;
  }
}
</style>
