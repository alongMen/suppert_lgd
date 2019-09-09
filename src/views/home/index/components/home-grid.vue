<template>
  <div class="home-grid">
    <div class="left_grid">
      <div class="left_item" v-for="(item,index) in gameList" :key="index">
        <div class="picbox">
          <img :src="item.bgpic" alt class="gamepic" />
          <div class="boxinner">
            <router-link :to="item.link" tag="div" class="start_btn">开始游戏</router-link>
          </div>
        </div>
        <div class="left_pic_info">
          <p class="left_title_l">{{item.name}}</p>
          <p class="left_title_r">{{item.label}}</p>
        </div>
      </div>
    </div>
    <div class="left_right">
      <img src="/image/rpic.png" alt />
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      gameList:[
        {name:'真人视讯',label:'Live',bgpic:'/image/lpic1.png' , link: '/game-center/game-list/1'},
        {name:'电子游艺',label:'Electronic games',bgpic:'/image/lpic2.png' , link: '/game-center/game-list/2'},
        {name:'体育竞技',label:'Sport',bgpic:'/image/lpic3.png' , link: '/game-center/game-list/3'},
        {name:'彩票游戏',label:'Bingo game',bgpic:'/image/lpic4.png' , link: '/game-center/game-list/4'}
      ]
    }
  }
}
</script>



<style lang="less" scoped>
.home-grid {
  width: 100%;
  height: 396px;
  overflow: hidden;
  margin-top: 40px;
  box-sizing: border-box;
  .left_grid {
    float: left;
    width: 50%;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    .left_item {
      width: 220px;
      margin-right: 30px;
      margin-bottom: 30px;
      &:last-child {
        margin-bottom: 0px;
      }
      &:nth-child(3) {
        margin-bottom: 0px;
      }
      .picbox {
        width: 219px;
        height: 143px;
        position: relative;
        .boxinner {
          position: absolute;
          top: 0;
          left: 0;
          display: none;
          background-color: rgba(0, 0, 0, 0.8);
          width: 100%;
          height: 100%;
        }
        &:hover .boxinner {
          display: block;
          .start_btn {
            cursor: pointer;
            display: block;
          }
        }
        .gamepic {
          display: block;
          width: 100%;
          height: 100%;
        }
        .start_btn {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          right: 0;
          margin: auto;
          display: none;
          width: 121px;
          height: 33px;
          background: #544202;
          border: 1px solid rgba(160, 129, 22, 1);
          color: #fff;
          line-height: 33px;
          font-weight: 700;
          text-align: center;
        }
      }
      .left_pic_info {
        width: 100%;
        display: flex;
        justify-content: space-between;
        .left_title_l {
          line-height: 40px;
          height: 40px;
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
        }
        .left_title_r {
          line-height: 40px;
          height: 40px;
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(164, 164, 164, 1);
        }
      }
    }
  }
  .left_right {
    float: right;
    width: 50%;
    height: 100%;
    padding-bottom: 25px;
    box-sizing: border-box;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
}
</style>