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
          name: '系统公告',
          path: 'board',
        },
        {
          name: '通知消息',
          path: 'notice'
        }
      ]
    }
  }
}
</script>