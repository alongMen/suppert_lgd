<template>
  <user-center-layout :data="data" :isPath="true" />
</template>

<script>
import { game_type, game_platform } from '@/utils/enum';
import UserCenterLayout from '../../../components/user-center-layout/index';
export default {
  components: {
    UserCenterLayout,
  },
  data() {
    return {
      game_type,
      game_platform,
      typeList: [],
      data: [],
    };
  },
  mounted() {
    this.game_type.forEach(v => {
      this.data.push({
        name: v.label,
        path: `/user-center/game-record/game-record-list/${v.value}`,
      });
    });
  },
};
</script>
