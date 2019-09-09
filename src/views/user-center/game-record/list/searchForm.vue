<template>
  <div class="game-record-search-form">
    <span>日期:</span>

    <DatePicker
      v-model="query.date"
      type="daterange"
      placeholder="开始时间 至 结束时间"
      style="width: 220px"
      @options="pickerOptions"
    ></DatePicker>

    <span style="margin-left:10px;">平台:</span>

    <Select style="width:120px;" v-model="query.gameplatformId" clearable>
      <Option
        v-for="(item, index) in platformList"
        :key="index"
        :value="item.id"
        :label="item.name"
      >
      </Option>
    </Select>

    <span style="margin-left:10px;">状态:</span>

    <Select style="width:120px;" v-model="query.status" clearable>
      <Option
        v-for="(item, index) in statusOptions"
        :key="index"
        :value="item.value"
        :label="item.label"
      ></Option>
    </Select>
    <Button type="warning" @click="search" style="margin-left:10px;"
      >搜索</Button
    >
  </div>
</template>
<style lang="less">
.game-record-search-form {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 13px;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 34px;
}
</style>

<script>
import { Select, Option } from 'iview';
export default {
  components: {
    Option: Option,
    Select: Select,
  },
  props: {
    query: Object,
    platformList: Array,
    gameTypeId: Number,
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            },
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            },
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            },
          },
        ],
      },
      statusOptions: [
        {
          label: '全部',
          value: 0,
        },
        {
          label: '已中奖',
          value: 1,
        },
        {
          label: '未中奖',
          value: 2,
        },
      ],
    };
  },
  methods: {
    search() {
      this.$emit('getData');
    },
  },
  async mounted() {},
};
</script>
