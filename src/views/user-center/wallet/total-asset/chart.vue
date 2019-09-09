<template>
  <div class="chart">
    <p class="subtitle">
      钱包总额<span class="title-number">{{
        NumberAdj(balance + walletSum + commission, 2)
      }}</span>
    </p>
    <div class="rich-pie" id="wallet-rich-pie"></div>
  </div>
</template>

<script>
import echarts from 'echarts';
export default {
  computed: {
    platform_balance() {
      const arr = this.$store.state.transModal.balance_list;
      return arr;
    },
    balance() {
      return this.$store.state.base.balance;
    },
    userInfo() {
      return this.$store.state.base.user_info;
    },
    commission() {
      return this.$store.state.base.commission;
    },
    walletSum() {
      let sum = 0;
      this.platform_balance.forEach(value => {
        sum += value.balance;
      });
      return sum;
    },
  },
  mounted() {
    const subWallets = this.platform_balance.filter(value => {
      if (value.balance > 0) {
        return {
          value: value.balance,
          name: value.platformName,
        };
      }
    });
    const innerData = [];
    const data = [];

    if (this.balance > 0) {
      data.push({ value: this.balance, name: '主钱包' });
      innerData.push({ value: this.balance, name: '主钱包' });
    }
    if (this.commission > 0 && this.userInfo.isAgent) {
      data.push({ value: this.commission, name: '佣金钱包' });
      innerData.push({ value: this.commission, name: '佣金钱包' });
    }
    if (this.walletSum > 0) {
      innerData.push({ value: this.walletSum, name: '分钱包' });
    }

    if (this.balance === 0 && this.walletSum === 0) {
      innerData.push({ value: 0, name: '分钱包' });
      innerData.push({ value: 0, name: '主钱包' });
      data.push({ value: 0, name: '主钱包' });

      if (this.commission === 0 && this.userInfo.isAgent) {
        innerData.push({ value: 0, name: '佣金钱包' });
        data.push({ value: 0, name: '佣金钱包' });
      }
    }

    subWallets.forEach(v => {
      data.push({
        value: v.balance,
        name: v.platformName,
      });
    });

    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)',
      },
      legend: {
        // orient: 'vertical',
        // top: '70%',
        // itemGap: 18,
        // itemWidth: 20,
        // itemHeight: 12,
        formatter: `{name}余额 `,
        data: [
          {
            name: '佣金钱包',
            textStyle: {
              fontSize: 14,
              fontFamily: 'PingFangSC-Regular',
              color: '#fff',
              lineHeight: 30,
            },
          },
          {
            name: '主钱包',
            textStyle: {
              fontSize: 14,
              fontFamily: 'PingFangSC-Regular',
              color: '#fff',
              lineHeight: 30,
            },
          },
          {
            name: '分钱包',
            textStyle: {
              fontSize: 14,
              fontFamily: 'PingFangSC-Regular',
              color: '#fff',
              lineHeight: 30,
            },
          },
        ],
      },
      series: [
        {
          name: '钱包总额',
          type: 'pie',
          radius: [0, 53],
          center: ['50%', '40%'],
          label: {
            normal: {
              position: 'inner',
            },
          },
          labelLine: {
            normal: {
              show: false,
            },
          },
          data: innerData,
        },
        {
          name: '钱包总额',
          type: 'pie',
          radius: [70, 97],
          center: ['50%', '40%'],
          label: {
            normal: {
              formatter:
                '{a|{b}}{abg|}\n{hr|}\n  {b|余额：}{d|{c}}  {per|{d}%}  ',
              backgroundColor: '#F4F4F4',
              borderColor: '#D2D2D2',
              borderWidth: 1,
              borderRadius: 2,
              rich: {
                a: {
                  color: '#606266',
                  // lineHeight: 22,
                  fontSize: 12,
                  fontFamily: 'PingFangSC-Regular',
                  align: 'center',
                },
                abg: {
                  width: '100%',
                  align: 'right',
                  height: 28,
                  borderRadius: [2, 2, 0, 0],
                },
                hr: {
                  borderColor: '#D2D2D2',
                  width: '100%',
                  borderWidth: 1,
                  height: 0,
                },
                b: {
                  fontSize: 12,
                  fontFamily: 'PingFangSC-Regular',
                  lineHeight: 31,
                },
                d: {
                  fontSize: 14,
                  fontFamily: 'PingFangSC-Regular',
                  lineHeight: 17,
                },
                per: {
                  color: '#FFFFFF',
                  backgroundColor: '#3E4E5D',
                  fontSize: 12,
                  fontFamily: 'PingFangSC-Regular',
                  padding: [2, 6],
                  borderRadius: 2,
                },
              },
            },
          },
          data: data,
        },
      ],
    };
    this.graph = echarts.init(document.getElementById('wallet-rich-pie'));
    this.graph.setOption(option);
  },
};
</script>

<style lang="less" scoped>
.chart {
  width: 430px;
  height: 490px;
  background: #212121;
  border: 1px solid rgba(43, 42, 42, 1);
  border-radius: 4px;
  flex: 1;

  .subtitle {
    margin-left: 20px;
    margin-top: 20px;
    font-family: PingFangSC-Regular;
    font-size: 18px;
    color: #fff;
    line-height: 30px;
    text-align: left;
    .title-number {
      color: #f64c5f;
      margin-left: 9px;
    }
  }
  .rich-pie {
    width: 100%;
    height: 440px;
  }
}
</style>
