<template>
  <div class="home-banner">
    <Carousel autoplay v-model="value" loop :radius-dot="true">
      <CarouselItem v-for="(item, index) in sliders" :key="index">
        <div @click="openAd(item)">
          <img :src="item.imageUrl" class="bannerpics" width="1000" alt />
        </div>
      </CarouselItem>
    </Carousel>

    <div class="ad_tol">
      <svg
        t="1566886659439"
        class="icon notice_icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2975"
        width="18"
        height="18"
      >
        <path
          d="M525.541411 131.503033l-230.494605 148.031475h-114.988917c-63.895239 0-115.679649 51.14996-115.679649 115.219161v230.898811c0 63.664995 51.150984 115.219161 115.679649 115.219161h114.988917l230.494605 147.915841c32.582069 14.128789 57.840336-0.980327 57.840336-33.04358V164.54559c0-32.120558-25.892717-46.825468-57.840336-33.042557z m194.223516 186.033997c-10.841929-11.649318-29.122271-12.283768-40.712237-1.384533-11.649318 10.899234-12.226462 29.122271-1.384533 40.770565 5.363148 5.76633 14.531971 18.511609 23.989367 37.772279 16.146749 32.870642 25.892717 71.449285 25.892717 115.507733 0 44.058448-9.745968 82.694397-25.892717 115.507734-9.457396 19.259646-18.626219 32.004925-23.989367 37.772278-10.899234 11.648294-10.264784 29.871331 1.384533 40.770566 11.648294 10.899234 29.871331 10.264784 40.770566-1.384533 9.054213-9.68764 21.509896-26.987654 33.620725-51.727105 19.895119-40.483017 31.774681-87.654362 31.774681-140.996245 0-53.341882-11.879562-100.514251-31.774681-140.996244-12.169157-24.62484-24.625864-41.983183-33.679054-51.612495z m176.806845-35.69599c-23.297612-39.444361-46.825468-66.778916-63.318094-81.483826-11.880585-10.609639-30.102598-9.572006-40.714284 2.36486-10.609639 11.936867-9.573029 30.101575 2.364861 40.712238 2.709715 2.421142 8.131191 7.842619 15.396665 16.261358 12.455683 14.416338 24.911366 31.601742 36.619012 51.439556 33.504068 56.860009 53.630455 123.349329 53.630455 199.066825s-20.126386 142.206816-53.68776 199.125153c-11.706623 19.836791-24.220634 37.022195-36.619012 51.438533-7.265474 8.41874-12.68695 13.840216-15.397689 16.261359-11.879562 10.610662-12.916171 28.833699-2.363837 40.714283 10.553357 11.879562 28.833699 12.916171 40.713261 2.363838 16.493649-14.70491 40.021505-41.98216 63.319117-81.483826 38.522362-65.336054 61.646012-141.745305 61.646012-228.41934 0.058328-86.614683-23.066345-163.023934-61.588707-228.361011z"
          fill="#fff"
          p-id="2976"
        />
      </svg>
      :&nbsp;&nbsp;
      <p style="display:inline-block">{{ msg }}</p>
      <div class="noticelink">
        <div class="noticeButton">易记域名</div>
        <div class="noticeUrl">{{ host }}</div>
      </div>
      <!-- <img src="/image/noticelink.png" alt="" class="noticelink" /> -->
    </div>
  </div>
</template>

<script>
import { get_advertise } from "@/service/index";
import { Carousel, CarouselItem } from "iview";
export default {
  name: "home-banner",
  components: {
    Carousel,
    CarouselItem
  },
  data() {
    return {
      msg: "开业大吉，充值返利喽～ ",
      intivend: null,
      sliders: [],
      value: 0
    };
  },
  computed: {
    interval() {
      return this.initialInterval * 1000;
    },
    host() {
      return window.location.host;
    }
  },
  mounted() {
    // this.init();
    this.lang();
    this.getAdvertise();
  },
  methods: {
    async getAdvertise() {
      const res = await get_advertise();
      if (res.status < 400) {
        if (res.data.length > 0) {
          this.sliders = res.data;
          // console.log(this.sliders);
        }
      }
    },
    openAd(item) {
      if (item.link) {
        window.open(item.link);
      }
    },
    lang() {
      if (this.intivend != null) {
        return;
      }

      this.intivend = setInterval(() => {
        var start = this.msg.substring(0, 1);
        var end = this.msg.substring(1);
        this.msg = end + start;
      }, 400);
    }
  }
};
</script>

<style lang="less">
.home-banner {
  width: 100%;
  height: 420px;
  margin-top: 10px;
  // background: red;
  position: relative;
  .ad_tol {
    position: absolute;
    bottom: -25px;
    width: 1000px;
    height: 46px;
    line-height: 46px;
    background: rgba(0, 0, 0, 0.8);
    box-shadow: 0px 1px 0px 0px rgba(46, 46, 46, 1);
    color: #fff;
    border-radius: 40px 0 0 0;
    padding-left: 30px;
    .notice_icon {
      vertical-align: middle;
    }
    .noticelink {
      width: 600px;
      position: absolute;
      right: 0px;
      top: 0;
      bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: auto 0px;
      .noticeButton {
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(0, 0, 0, 1);
        line-height: 29px;
        text-align: center;
        width: 108px;
        height: 30px;
        background: linear-gradient(
          0deg,
          rgba(255, 228, 80, 1),
          rgba(180, 137, 21, 1),
          rgba(255, 224, 79, 1),
          rgba(248, 252, 158, 1)
        );
        box-shadow: 0px 1px 1px 0px rgba(255, 255, 255, 0),
          0px 2px 1px 0px rgba(255, 222, 0, 0.96);
        border-radius: 15px;
      }
      .noticeUrl {
        margin-left: 15px;
        font-size: 28px;
        font-family: Yuanti SC;
        font-weight: bold;
        color: rgba(128, 128, 128, 1);
        line-height: 45px;

        background: linear-gradient(
          0deg,
          rgba(255, 224, 79, 1) 28.90625%,
          rgba(180, 137, 21, 1) 50.830078125%,
          rgba(255, 224, 79, 1) 63.1591796875%,
          rgba(255, 255, 255, 1) 96.8505859375%,
          rgba(248, 252, 158, 1) 99.5849609375%
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }
}
.bannerpics {
  display: block;
  width: 1000px;
  height: 420px;
}
.home-banner {
  .ivu-icon-ios-arrow-forward,
  .ivu-icon-ios-arrow-back {
    font-size: 30px !important;
  }
  .ivu-carousel-dots-inside {
    bottom: 40px;
    text-align: right;
    padding-right: 90px;
    li {
      width: 20px;
      height: 20px;

      .radius {
        width: 20px;
        height: 20px;
      }
    }
  }
}
.ivu-carousel-dots li.ivu-carousel-active>button.radius{
  width: 20px;
  background-color: #EEC818;
  color:#000000!important;
}
.home-banner .ivu-carousel-dots-inside li .radius{
  font-size: 14px;
  color:#ffffff!important;
}

</style>
