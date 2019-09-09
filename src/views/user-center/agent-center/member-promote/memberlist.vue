<template>
  <div class="memberBox">
    <div class="searchForm">
      <Form :model="form" :label-width="60">
        <Row>
          <Col span="6" style="text-align: center">
            <FormItem label="用户名">
              <Input v-model="form.userName" placeholder="请输入用户名"></Input>
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

      <template slot="registerTime" slot-scope="{ row }">
        <span v-if="row.registerTime">
          {{
          formatBeijingDate(row.registerTime)
          }}
        </span>
        <span v-else></span>
      </template>
      <template slot="lastLoginTime" slot-scope="{ row }">
        <span v-if="row.lastLoginTime">
          {{
          formatBeijingDate(row.lastLoginTime)
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
import { get_team } from "@/service/index";

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
      type: [
        {
          label: '会员',
          value:1
        },
        {
          label: '代理',
          value: 2
        }
      ],
      data: [],
      total: 0,
      page: 1,
      size: 15,
      loading: false,
      columns: [
        {
          title: "用户名",
          key: "userName"
        },
        {
          title: "注册时间",
          slot: "registerTime",
          width: 150
        },
        {
          title: "最后登录时间",
          slot: "lastLoginTime",
          width: 150
        },
        {
          title: "充值",
          key: "totalRecharge"
        },
        {
          title: "可用余额",
          key: "amount"
        },
        
      ],
      form: {
        userName: ""
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
      query.userName = this.form.userName;
      query.memberType = 1;
      this.loading = true;
      const res = await get_team(this.page, this.size, query);
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
.memberBox {
  border-top: 1px dashed rgba(164, 164, 164, 1);
  margin-top: 10px;
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
