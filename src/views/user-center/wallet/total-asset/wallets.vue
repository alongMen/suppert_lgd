<template>
  <div class="wallets">
    <div class="head">
      <span class="title">分钱包</span>

      <span class="get" @click="transAll">全部提取</span>
    </div>

    <Loading v-if="loading" />
    <div class="list" v-else>
      <div class="item" v-for="(item, index) in data" :key="index">
        <div class="left">
          <div class="round" :style="{'background': platform_map[item.id].color}">
            <img :src="platform_map[item.id].image" />
          </div>
          <div class="info">
            <p class="name">{{item.platformName}}</p>
            <p class="balance">{{item.balance}} <span class="yuan">元</span></p>
          </div>
        </div>

        <div class="button" @click="trans(item)">
          转入
        </div>
      </div>
    </div>
  </div>
</template>




<script>
import { platform_map } from "@/common/base-map";
import { get_user_platform_balance , one_button_transfer} from "@/service/index";
import Loading from "@/components/loading/index";
import LoadingButton from '@/components/loading-button/index';
export default {
  components: {
    Loading,
    LoadingButton
  },
  data() {
    return {
      platform_map,
      loading: true,
      
    };
  },
  computed:{
    data(){
      return this.$store.state.transModal.balance_list;
    }
  },
  methods: {
    transAll(){
      this.$Modal.confirm({
        title: '提示',
        content: '该操作会将所有平台余额转入总钱包，是否继续?',
        loading: true,
        onOk: async()=>{
          const res = await one_button_transfer();
          this.$Modal.remove();
          if(res.status < 400 ){
            this.$store.dispatch('get_user_platform_balance');
            this.$Message.success('余额提取成功');
          }
          
          
          
        }
      })
    },


    async getData() {
      this.loading = true;
      const res = await get_user_platform_balance();
      this.loading = false;
      if (res.status < 400) {
        this.data = res.data.allPlat;
      }
    },
    trans(item){
      this.$store.commit('set_trans_out_id' , 0 );
      this.$store.commit('set_trans_in_id' , item.id );

      this.$store.commit('toggle_trans_modal' , true);
    }
  },
  async mounted() {
    await this.$store.dispatch('get_user_platform_balance');
    this.loading = false;
  }
};
</script>



<style lang="less" scoped>
.wallets {
  width: 395px;
  height: 490px;
  border: 1px solid rgba(43, 42, 42, 1);
  border-radius: 4px;
  background: #212121;
  display: flex;
  flex-direction: column;
  .title {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
  }
  .head {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 20px;
  }
  .get {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    text-decoration: underline;
    color: rgba(255, 192, 0, 1);
    user-select: none;
    cursor: pointer;
    &:hover {
      color: #fff;
    }
  }

  .list {
    overflow: auto;
    flex:1;
    .left {
      display: flex;
      align-items: center;
    }
    .item {
      border-top: 1px solid #333;
      height: 86px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;

      .info {
        margin-left: 20px;
        .name {
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: 600;
          color: rgba(255, 255, 255, 1);
        }
        .balance {
          font-size: 18px;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);

          .yuan{
            color: #A4A4A4;
            font-size: 12px;
          }
        }
      }
    }
  }

  .round {
    width: 43px;
    height: 43px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .button{
    width: 51px;
    height: 27px;
    background: #333333;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    cursor: pointer;
    user-select: none;
    &:hover{
      background: #97621D;
    }
  }
}
</style>