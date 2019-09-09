<template>
  <user-center-layout :data="data"/>
</template>




<script>
import UserCenterLayout from '../../../components/user-center-layout/index';
export default {
  components:{
    UserCenterLayout
  },
  data(){
    return{
      data:[
        {
          name: '资产总览',
          path: 'total-asset',
        },
        {
          name: '充值',
          path: 'recharge'
        },
        {
          name: '充值记录',
          path: 'recharge-record'
        },
        {
          name: '账单',
          path: 'bill-record'
        },
        {
          name: '提现',
          path: 'withdraw'
        },
        {
          name: '提现记录',
          path: 'withdraw-record'
        },
        {
          name: '银行卡管理',
          path: 'bank-manage'
        },
      ]
    }
  }
}
</script>