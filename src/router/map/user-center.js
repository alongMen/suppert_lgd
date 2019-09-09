export default {
  path: '/user-center',
  name: 'user-center',
  redirect: '/user-center/overview',
  component: () => import('../../views/user-center/index.vue'),
  children: [
    {
      path: 'overview',
      name: 'overview',
      component: () => import('../../views/user-center/overview/index.vue'),
    },
    {
      path: 'wallet',
      name: 'wallet',
      redirect: '/user-center/wallet/total-asset',
      component: () => import('../../views/user-center/wallet/index.vue'),
      children: [
        {
          path: 'recharge',
          name: 'recharge',
          component: () =>
            import('../../views/user-center/wallet/recharge/index'),
        },
        {
          path: 'bank-manage',
          name: 'bank-manage',
          component: () =>
            import('../../views/user-center/wallet/bank-manage/index'),
        },
        {
          path: 'bill-record',
          name: 'bill-record',
          component: () =>
            import('../../views/user-center/wallet/bill-record/index'),
        },
        {
          path: 'recharge-record',
          name: 'recharge-record',
          component: () =>
            import('../../views/user-center/wallet/recharge-record/index'),
        },
        {
          path: 'total-asset',
          name: 'total-asset',
          component: () =>
            import('../../views/user-center/wallet/total-asset/index'),
        },
        {
          path: 'withdraw',
          name: 'withdraw',
          component: () =>
            import('../../views/user-center/wallet/withdraw/index'),
        },
        {
          path: 'withdraw-record',
          name: 'withdraw-record',
          component: () =>
            import('../../views/user-center/wallet/withdraw-record/index'),
        },
      ],
    },
    {
      path: 'account',
      name: 'account',
      component: () => import('../../views/user-center/account/index.vue'),
      redirect: '/user-center/account/personal',
      children: [
        {
          path: 'personal',
          name: 'personal',
          component: () =>
            import('../../views/user-center/account/personal/index.vue'),
        },
        {
          path: 'bindMobile',
          name: 'bindMobile',
          component: () =>
            import('../../views/user-center/account/bindMobile/index.vue'),
        },
        {
          path: 'bindEmail',
          name: 'bindEmail',
          component: () =>
            import('../../views/user-center/account/bindEmail/index.vue'),
        },
        {
          path: 'paypass',
          name: 'paypass',
          component: () =>
            import('../../views/user-center/account/paypass/index.vue'),
        },
        {
          path: 'loginpass',
          name: 'loginpass',
          component: () =>
            import('../../views/user-center/account/loginpass/index.vue'),
        },
      ],
    },
    {
      path: 'task',
      name: 'task',
      component: () => import('../../views/user-center/task/index.vue'),
      redirect: '/user-center/task/mission',
      children: [
        {
          path: 'mission',
          name: 'mission',
          component: () =>
            import('../../views/user-center/task/mission/index.vue'),
        },
        {
          path: 'liveness',
          name: 'liveness',
          component: () =>
            import('../../views/user-center/task/liveness/index.vue'),
        },
        {
          path: 'about-liveness',
          name: 'about-liveness',
          component: () =>
            import('../../views/user-center/task/about-liveness/index.vue'),
        },
      ],
    },
    {
      path: 'message',
      name: 'message',
      component: () => import('../../views/user-center/message/index.vue'),
      redirect: '/user-center/message/board',
      children: [
        {
          path: 'board',
          name: 'board',
          component: () =>
            import('../../views/user-center/message/board/index.vue'),
        },
        {
          path: 'notice',
          name: 'notice',
          component: () =>
            import('../../views/user-center/message/notice/index.vue'),
        },
      ],
    },
    {
      path: 'agent-center',
      name: 'agent-center',
      redirect: '/user-center/agent-center/member-promote',
      component: () => import('../../views/user-center/agent-center/index.vue'),
      children: [
        {
          path: 'apply-agent',
          name: 'apply-agent',
          component: () =>
            import(
              '../../views/user-center/agent-center/apply-agent/index.vue'
            ),
        },
        {
          path: 'member-promote',
          name: 'member-promote',
          component: () =>
            import(
              '../../views/user-center/agent-center/member-promote/index.vue'
            ),
        },
        {
          path: 'agent-promote',
          name: 'agent-promote',
          component: () =>
            import(
              '../../views/user-center/agent-center/agent-promote/index.vue'
            ),
        },
        {
          path: 'users',
          name: 'users',
          component: () =>
            import('../../views/user-center/agent-center/users/index.vue'),
        },
        {
          path: 'members',
          name: 'members',
          component: () =>
            import('../../views/user-center/agent-center/members/index.vue'),
        },
        {
          path: 'commision-report',
          name: 'commision-report',
          component: () =>
            import(
              '../../views/user-center/agent-center/commision-report/index.vue'
            ),
        },
        {
          path: 'commision-withdraw',
          name: 'commision-withdraw',
          component: () =>
            import(
              '../../views/user-center/agent-center/commission-withdraw/index.vue'
            ),
        },
      ],
    },
    {
      path: 'game-record',
      name: 'game-record',
      redirect: '/user-center/game-record/game-record-list/1',
      component: () => import('../../views/user-center/game-record/index.vue'),
      children: [
        {
          path: 'game-record-list/:id',
          name: 'game-record-list',
          component: () =>
            import('../../views/user-center/game-record/list/index.vue'),
        },
      ],
    },
  ],
};
