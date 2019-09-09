



<template>
  <div
    class="game-header"
    :style="{'height': showHeader ? '97px' : '0px' , 'padding': showHeader ? '10px' : '0px'}"
  >
    <div class="temp">
      <div style="width:200px;height:80%">
        <logo />
      </div>

      <div class="divider"></div>

      <div class="round" :style="{background: platform_map[gamePlatformId].color}">
        <img :src="platform_map[gamePlatformId].image" alt />
      </div>
      <div class="info">
        <p class="platform-name">{{platform_map[gamePlatformId].name}}</p>
        <p class="balance">{{balance}}</p>
      </div>
      <i class="iconfont iconshuaxin refesh" @click="getData"></i>

      <primary-button text="转账" style="width:80px;margin-left:20px;" @onClick="trans" />

      <i class="iconfont icontuichu exit" @click="exist"></i>
    </div>

    <div
      class="hide"
      @click="toggle"
      :style="{'transform': showHeader ? 'translateX(-50%) rotate(180deg)' : 'translateX(-50%) rotate(0deg)'}"
    >
      <i class="iconfont iconjiantou1"></i>
    </div>
  </div>
</template>




<script>
import Logo from "@/components/logo/index";
import { platform_map } from "@/common/base-map";
import { get_platform_balance_by_id } from "@/service/index";
import PrimaryButton from "@/components/primary-button/index";
export default {
  components: {
    Logo,
    PrimaryButton
  },
  props: {
    gamePlatformId: Number,
    showHeader: Boolean
  },
  data() {
    return {
      platform_map,
      balance: 0
    };
  },
  methods: {
    trans() {
      this.$store.commit("set_trans_out_id", 0);
      this.$store.commit("set_trans_in_id", this.gamePlatformId);
      this.$store.commit("toggle_trans_modal", true);
    },
    async getData() {
      const res = await get_platform_balance_by_id(this.gamePlatformId);

      if (res.status < 400) {
        this.balance = res.data.balance;
      }
    },
    toggle() {
      this.$emit("toggle");
    },
    exist(){
      this.$router.push('/');
    }
  },
  mounted() {
    this.getData();
  }
};
</script>



<style lang="less">
.game-header {
  width: 100%;
  height: 97px;
  padding: 10px;

  background: linear-gradient(
    180deg,
    rgba(55, 55, 55, 1),
    rgba(35, 34, 34, 1),
    rgba(0, 0, 0, 1)
  );
  box-shadow: 0px 12px 14px 0px rgba(72, 72, 72, 0.48);
  display: flex;
  align-items: center;
  position: relative;
  .temp {
    overflow: hidden;
    display: flex;
    align-items: center;
    height: 100%;
  }
  .divider {
    height: 63px;
    width: 1px;
    background: linear-gradient(
      0deg,
      rgba(74, 64, 8, 1),
      rgba(145, 126, 23, 1),
      rgba(74, 64, 8, 1)
    );
    margin-right: 30px;
  }

  .round {
    width: 43px;
    height: 43px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 10px;
  }
  .platform-name {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
  }

  .balance {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }

  .refesh {
    font-size: 20px;
    padding-top: 27px;
    padding-left: 10px;
    cursor: pointer;
    &:hover {
      color: #fff;
    }
  }

  .hide {
    position: absolute;
    left: 50%;
    transform: translateX(-50%) rotate(180deg);
    width: 50px;
    height: 50px;
    background: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover {
      background: #fac000;
      color: #fff;
    }
    i {
      font-size: 30px;
    }
  }

  .exit{
    font-size: 30px;
    color: #fff;
    cursor: pointer;
    position: absolute;
    right: 30px;
    &:hover{
      color: #FAC000;
    }
  }
}
</style>