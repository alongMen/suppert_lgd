<template>
  <user-center-layout :data="data" />
</template>

<script>
import UserCenterLayout from '../../../components/user-center-layout/index';
export default {
  components: {
    UserCenterLayout,
  },
  data() {
    return {
      // data:[
      //   {
      //     name: '系统公告',
      //     path: 'board',
      //   },
      //   {
      //     name: '通知消息',
      //     path: 'notice'
      //   }
      // ]
    };
  },
  computed: {
    user_info() {
      return this.$store.state.base.user_info;
    },

    data() {
      if (!this.user_info.isAgent) {
        return [
          {
            name: '会员推广',
            path: 'member-promote',
          },
          // {
          //   name: "代理推广",
          //   path: "agent-promote"
          // },
          {
            name: '申请代理',
            path: 'apply-agent',
          },
          // {
          //   name: "用户列表",
          //   path: "users"
          // },
          // {
          //   name: "佣金报表",
          //   path: "commision-report"
          // },
          // {
          //   name: "会员列表",
          //   path: "members"
          // },
        ];
      } else {
        return [
          {
            name: '会员推广',
            path: 'member-promote',
          },
          {
            name: '代理推广',
            path: 'agent-promote',
          },
          // {
          //   name: '申请代理',
          //   path: 'apply-agent',
          // },
          {
            name: '用户列表',
            path: 'users',
          },
          {
            name: '佣金报表',
            path: 'commision-report',
          },
          {
            name: '佣金提现',
            path: 'commision-withdraw',
          },
        ];
      }
    },
  },
};
</script>
