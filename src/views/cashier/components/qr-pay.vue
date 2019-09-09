<template>
  <div class="qr-pay">
    <div class="center">
      <div class="left">
        <!-- <template v-if="!isEnd">
          <p class="left-text">
            距离二维码过期还剩 
            <span 
              class="date"
              >
              <span class="time" v-if="m">{{m}}</span>
              分
              <span class="time" v-if="s">{{s}}</span>
                秒
              </span> 
            ,过期后请重新充值!
          </p>
        </template>
        <template v-else>
          <p class="left-text" style="color:#E23A3A;">
            二维码已过期！请重新充值!
          </p>
        </template> -->
        <p class="left-code" :style="{visibility: !isOnline ? 'visible' : 'hidden'}">附言码:<span class="red">{{data.attachCode}}</span></p>
        <img class="qr-code" :src="data.qrCode" width="310" height="310">

        </img>
        <div class="text-help">
          <div class="text-help-left">
            <i class="lgd_icon_kbesom icon"></i>
          </div>
          <div class="text-help-right">
            <p>请使用{{rigthTitle}}扫一扫</p>
            <p>扫描二维码支付</p>
          </div>
        </div>
      </div>
      <div class="right">
        <p class="right-title">{{rigthTitle}}支付</p>
        <template v-if="!isOnline">
          <div class="carousel-wrap">
            <Carousel 
              height="420px" 
              indicator-position="outside" 
              :autoplay="true" 
              arrow="never"
              :interval="5000"
              >
              <CarouselItem v-for="(item,index) in imgs" :key="index" >
                <div class="code-img" :style="{backgroundImage: `url(https://lgdimage.blob.core.windows.net/project/${item})`}">

                  <p class="step">第{{index + 1}}步</p>
                  <p class="wx-amount" v-if="index === 1 && providerName === 1">
                    {{data.amount}}
                  </p>

                  <p class="wx-code" v-if="index === 2 && providerName === 1">
                    {{data.attachCode}}
                  </p>


                  <p class="ali-amount" v-if="index === 1 && providerName === 2">
                    {{data.amount}}
                  </p>

                  <p class="ali-amount" style="color:#333" v-if="index === 2 && providerName === 2">
                    {{data.amount}}
                  </p>

                  <p class="ali-code" v-if="index === 2 && providerName === 2">
                    {{data.attachCode}}
                  </p>


                  <!-- <p class="ali-amount" v-if="index === 1 && accountId === 101" style="top:163px;">
                    {{data.amount}}
                  </p>

                  <p class="ali-amount" style="color:#333;top:163px"  v-if="index === 2 && accountId === 101">
                    {{data.amount}}
                  </p>

                  <p class="ali-code" v-if="index === 2 && accountId === 101">
                    {{data.attachCode}}
                  </p> -->


                </div>
              </CarouselItem >
            </Carousel>
          </div>
        </template>

        <template v-else>
          <div class="carousel-wrap">
            <div class="code-img" :style="{backgroundImage: `url(https://lgdimage.blob.core.windows.net/project/weixinsm.png`}" v-if="providerName === 1">

            </div>
            <div class="code-img" :style="{backgroundImage: `url(https://lgdimage.blob.core.windows.net/project/zhifubaosm.png`}" v-if="providerName === 2">

            </div>
          </div>
        </template>

      </div>
    </div>
  </div>
</template>

<script>
import { Carousel } from 'iview';
import moment from 'moment';
export default {
  components: {
    Carousel: Carousel,
    CarouselItem: Carousel.Item,
  },
  data() {
    return {
      // type: 2, //1 wechat    2  ali     3 qq;
      img: '',
      m: '00',
      s: '00',
      isEnd: false,
      timer:null,
      isOnline: false,
    };
  },
  props:{
    // type:number,
    data: Object
  },
  computed: {
    providerName(){
      return this.data.providerName;
    },
    imgs() {
      const providerName = this.data.providerName;
      let imgs = [];
      if (providerName === 1) {
        imgs = ['wxone.png', 'wxtwo.png', 'wxthree.png'];
      } else if (providerName === 2) {
        imgs = ['zfbone.png', 'zfbtwo.png', 'zfbthree.png'];
      }
      return imgs;
    },

    rigthTitle(){
      let name;
      if(this.data.providerName === 1){
        name = '微信'
      }else if(this.data.providerName === 2){
         name = '支付宝'
      }

      return name
    }
  },
  methods:{
    // count(){
    //   const localTime = moment.utc(str).toDate();

    //   const str = moment(localTime).format('YYYY-MM-DD HH:mm:ss');

    //   const endTime = new Date(str);
    //   const nowTime = new Date();
      
    //   let leftTime = parseInt((endTime.getTime() - nowTime.getTime()) / 1000);
    //   if(leftTime <= 0 ){
    //     this.isEnd = true;
    //     return
    //   }
    //   this.m = this.formate(parseInt((leftTime / 60) % 60));
    //   this.s = this.formate(parseInt(leftTime % 60));
    //   if (leftTime <= 0) {
    //     this.isEnd = true;
    //   }
    // },
    // formate(time) {
    //   if (time >= 10) {
    //     return time;
    //   } else {
    //     return `0${time}`;
    //   }
    // },
  },
  mounted(){
    // this.timer = setInterval(()=>{
    //   if (this.isEnd) {
    //     clearInterval(this.timer);
    //     this.timer = null;
    //   }
    //   this.count();
    // },1000)

  }
};
</script>



<style lang="less">
.qr-pay {
  padding-bottom: 50px;
  .center {
    display: flex;
    // justify-content: space-between;
    // padding: 0 150px;
    padding-left: 100px;
    .left {
      display: flex;
      flex-direction: column;
      // margin-left: 150px;
      margin-right: 90px;
      align-items: center;
      .left-text {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #666666;
        .date{
          width: 80px;
          display: inline-block;
          .time{
            color: #E23A3A;
          }
        }
      }
      .left-code {
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #666666;
        padding-top: 10px;
        padding-bottom: 15px;
        .red{
          color: #E23A3A;
        }
      }
      .qr-code {
        width: 310px;
        height: 310px;
      }
      .text-help {
        margin-top: 12px;
        width: 310px;
        height: 60px;
        background: #4a95ec;
        display: flex;
        padding-left: 50px;
        align-items: center;
        .text-help-left {
          i {
            color: #fff;
            font-size: 30px;
          }
        }
        .text-help-right {
          font-family: PingFangSC-Medium;
          font-size: 14px;
          color: #ffffff;
          margin-left: 44px;
        }
      }
    }
    .right {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-left: 85px;
      .right-title {
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #333333;
        margin-bottom: 25px;
        padding-left: 86px;
      }

      .carousel-wrap {
        width: 317px;
        height: 420px;
        .code-img {
          width: 100%;
          height: 100%;
          position: relative;
          .wx-amount {
            font-family: PingFangSC-Medium;
            font-size: 24px;
            color: #e23a3a;
            position: absolute;
            top: 151px;
            left: 60px;
          }
          .wx-code {
            font-family: PingFangSC-Medium;
            font-size: 16px;
            color: #e23a3a;
            position: absolute;
            top: 179px;
            left: 20px;
          }

          .ali-amount {
            font-family: PingFangSC-Medium;
            font-size: 24px;
            color: #e23a3a;
            position: absolute;
            top: 169px;
            left: 50px;
          }
          .ali-code {
            font-family: PingFangSC-Medium;
            font-size: 14px;
            color: #e23a3a;
            top: 210px;
            left: 30px;
            position: absolute;
          }
        }
        .el-carousel__indicators--outside{
          padding-left: 83px;
        }
        .el-carousel__button {
          width: 8px;
          height: 8px;
          background: #ccc;
          border-radius: 50%;
          padding: 0;
          margin: 0 2px;
        }
        .is-active {
          .el-carousel__button {
            background: #4a95ec;
          }
        }
      }
    }
  }
}
</style>
