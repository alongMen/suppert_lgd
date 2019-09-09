<template>
  <div class="recharge-record user-center-main-area">
    <h4 class="recharge-title">充值记录</h4>
    <p class="tils">查看账号充值记录</p>
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
            <FormItem label="订单号">
              <Input v-model="form.orderNo" placeholder="请输入订单号"></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="状态">
              <Select v-model="form.rechargeStatus">
                <Option value="1">进行中</Option>
                <Option value="2">完成</Option>
                <Option value="3">失败</Option>
                <Option value="4">关闭</Option>
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
      <template slot="rechargeType" slot-scope="{ row }">
        <span>{{ row.rechargeType.substring(1) }}</span>
        <p v-if="row.rechargeType.substring(0, 1) == 1" class="charging">
          进行中...
        </p>
        <p v-if="row.rechargeType.substring(0, 1) == 2" class="success">完成</p>
        <p v-if="row.rechargeType.substring(0, 1) == 3" class="error">失败</p>
        <p v-if="row.rechargeType.substring(0, 1) == 4" class="error">关闭</p>
      </template>
      <template slot="total" slot-scope="{ row }">
        <span style="color:#FFC000">{{ row.total }}</span>
      </template>
      <template slot="createTime" slot-scope="{ row }">{{
        formatBeijingDate(row.createTime)
      }}</template>
      <template slot="finishTime" slot-scope="{ row }">
        <span v-if="row.finishTime">{{
          formatBeijingDate(row.finishTime)
        }}</span>
        <span v-else></span>
      </template>
    </Table>

    <div class="page" style="margin-top:10px;">
      <my-pagination
        :page="page"
        :size="size"
        @change="pageChange"
        :total="total"
      />
    </div>
  </div>
</template>
<script>
import { Input, Select, Button, Option } from 'iview';
import MyPagination from '@/components/my-pagination/index';
import { get_recharge_record_list } from '@/service/index';

export default {
  components: {
    Input,
    Select,
    Button,
    Option,
    MyPagination,
  },
  data() {
    return {
      data: [],
      total: 0,
      page: 1,
      size: 15,
      loading: false,
      columns: [
        {
          title: '订单编号',
          key: 'orderNo',
        },
        {
          title: '充值金额',
          key: 'amount',
        },
        {
          title: '实际入款金额',
          slot: 'total',
        },
        {
          title: '充值方式',
          slot: 'rechargeType',
        },
        {
          title: '创建时间',
          slot: 'createTime',
          width: 150,
        },
        {
          title: '完成时间',
          slot: 'finishTime',
          width: 150,
        },
      ],
      form: {
        date: [],
        orderNo: '',
        rechargeStatus: '',
      },
    };
  },
  methods: {
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    },
    rowClassName(row, index) {
      if (index % 2 == 0) {
        return 'ivu-table-stripe-even';
      } else return 'ivu-table-stripe-odd';
    },
    onSelect(selection, index) {
      this.selecteds = selection;
    },
    pageChange(page) {
      this.page = page;
      this.getData();
    },
    async getData() {
      // console.log(this.form)
      let query = {};
      query.orderNo = this.form.orderNo;
      query.rechargeStatus = this.form.rechargeStatus;

      if(this.form.date && this.form.date.length>0){
        query.startTime = this.form.date[0]
        query.endTime = this.form.date[1]
      }
      this.loading = true;
      const res = await get_recharge_record_list(
        this.page,
        this.size,
        query
      );
      this.loading = false;
      if (res.status < 400) {
        this.data = res.data.itemList;
        if (this.data) {
          this.data.forEach((item, index) => {
            item.rechargeType = `${item.rechargeStatus}${item.providerDisplay}`;
          });
        }
        this.total = res.data.itemTotal;
      }
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
<style lang="less">
.recharge-record {
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
  .charging {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #7063e6;
  }
  .online {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #4e54c8;
  }
  .offline {
    color: #ff6e69;
    font-family: PingFangSC-Regular;
    font-size: 14px;
  }
}
</style>
