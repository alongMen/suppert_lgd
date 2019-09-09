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
      data: [
        {
          name: '每日任务',
          path: 'mission',
        },
        {
          name: '活跃度奖励',
          path: 'liveness',
        },
        {
          name: '关于活跃度',
          path: 'about-liveness',
        },
      ],
    };
  },
};
</script>
