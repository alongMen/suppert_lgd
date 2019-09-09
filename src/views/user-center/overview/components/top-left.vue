<template>
  <div class="overview-top-left">
    <div class="header">
      <div class="wallet-info">
        <div class="wallet-icon">
          <span class="iconfont iconqianbao"></span>
        </div>
        <div class="wallet-detail">
          <div class="title">总钱包</div>
          <div class="number">
            {{ balance.toLocaleString() }}<span class="tail">元</span>
          </div>
        </div>
      </div>
      <a href="javascript:void(0)" class="more" @click="more">查看更多</a>
    </div>
    <loading v-if="loading" />
    <div id="summary-line" class="hist" v-else></div>
  </div>
</template>

<script>
import echarts from 'echarts';
import moment from 'moment';
import { get_game_bet_seven } from '@/service/index';
import Loading from '@/components/loading/index';
export default {
  components: {
    Loading,
  },
  data() {
    return {
      data: [],
      loading: true,
    };
  },
  computed: {
    balance() {
      return this.$store.state.base.balance;
    },
  },
  methods: {
    more() {},
    async get_seven_day_report() {
      return new Promise(async (resolve, reject) => {
        const res = await get_game_bet_seven();
        if (res.status < 400) {
          resolve(res.data);
        }
      });
    },
  },
  async mounted() {
    const LineXData = [];
    const LineYData = [0, 0, 0, 0, 0, 0, 0];
    for (var i = 6; i >= 0; i--) {
      LineXData.push(
        moment()
          .subtract(i, 'day')
          .format('MM-DD'),
      );
    }

    const res = await this.get_seven_day_report();
    res.forEach(v => {
      LineXData.forEach((d, index) => {
        if (v.date.substring(5, 10) === d) {
          LineYData[index] = v.consumtion;
        }
      });
    });

    const optionLIne = {
      backgroundColor: '#212121',
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#81500f',
        formatter: '中奖金额：<br />{c}元',
        axisPointer: {
          type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
        },
        borderColor: '#81500f',
        textStyle: {
          fontFfamily: 'PingFangSC-Regular',
          fontSize: 16,
          color: '#FFFFFF',
        },
      },
      grid: {
        top: 10,
        left: '0%',
        right: 10,
        bottom: '0%',
        containLabel: true,
      },
      xAxis: {
        axisTick: false,
        axisLine: { lineStyle: { color: '#D2D2D2' } },
        axisLabel: {
          fontSize: 14,
          fontFamily: 'PingFangSC-Regular',
          color: '#fff',
        },
        type: 'category',
        data: LineXData,
      },
      yAxis: {
        formatter: function(value) {
          return this.NumberAdj(value);
        },
        type: 'value',
        axisTick: false,
        axisLine: { lineStyle: { color: '#D2D2D2' } },
        axisLabel: {
          fontSize: 14,
          fontFamily: 'PingFangSC-Regular',
          color: '#fff',
        },
        splitLine: { lineStyle: { type: 'dashed', color: '#a4a4a4' } },
      },
      series: [
        {
          data: LineYData,
          type: 'bar',
          barMaxWidth: '46px',
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                { offset: 0, color: 'rgba(255,236,124,1)' },
                { offset: 0.5, color: 'rgba(118,87,13,1)' },
                { offset: 1, color: 'rgba(255,242,160,1)' },
              ]),
            },
          },
        },
      ],
    };
    this.loading = false;
    this.$nextTick(() => {
      this.graphLine = echarts.init(document.getElementById('summary-line'));
      this.graphLine.setOption(optionLIne);
    });
  },
};
</script>

<style lang="less">
.overview-top-left {
  height: 100%;
  width: 100%;
  background: #212121;
  border: 1px solid rgba(43, 42, 42, 1);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .hist {
    margin: 0 19px 16px 17px;
    width: 474px;
    height: 271px;
    background: #ffffff;
    display: flex;
  }
  .header {
    width: 470px;
    height: 43px;
    margin: 21px 17px 29px 23px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .more {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      text-decoration: underline;
      color: rgba(255, 255, 255, 1);
      line-height: 24px;
      &:hover {
        color: #fac000;
      }
    }
    .wallet-info {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .wallet-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 43px;
        height: 43px;
        background: #81500f;
        border-radius: 50%;
        .iconqianbao {
          font-size: 24px !important;
          color: white !important;
        }
      }
      .wallet-detail {
        margin-left: 17px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        .title {
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          // line-height: 29px;
        }
        .number {
          font-size: 18px;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(250, 192, 0, 1);
          // line-height: 29px;
          .tail {
            color: #a4a4a4;
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>
