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
          name: '个人资料',
          path: 'personal',
        },
        {
          name: '绑定手机',
          path: 'bindMobile'
        },
        {
          name: '绑定邮箱',
          path: 'bindEmail'
        },
        {
          name: '支付密码',
          path: 'paypass'
        },
        {
          name: '登录密码',
          path: 'loginpass'
        }
      ]
    }
  }
}
</script>