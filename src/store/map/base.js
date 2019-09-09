import {get_site_info,get_user_info , get_common_bank_list , get_phone_domain} from '@/service/index'

const state = {


  isLogin: false,//登录状态

  site_info:{}, //站点信息

  user_info: {},

  balance: 0,//
  commission:0,

  isOpenLoginModal: false,//是否打开登录modal


  all_bank_list: [],//所有银行列表

  mobile_url:'',//mobile 地址
}


const mutations = {
  //获取所有银行列表
  set_all_bank_list(state , data){
    state.all_bank_list = data;
  },


  //设置login modal 状态
  set_login_modal_status(state ,  bool){
    state.isOpenLoginModal = bool;
  },


  set_login_status(state , bool){
    state.isLogin = bool;
  },

  //站点信息
  set_site_info(state , data){
    state.site_info = data;
  },

  set_user_info(state , data){
    state.user_info = data;
    state.balance = data.amount;
    state.commission = data.commission
  },

  set_mobile_url(state , url){
    state.mobile_url = url;
  },
}


const actions = {
  async get_site_info({commit}){
    const res = await get_site_info();
    if(res.status < 400 ){
      commit('set_site_info',res.data);
      document.title = res.data.websiteTitle;
    }
  },

  async get_user_info({commit}){
    const res = await get_user_info();
    if(res.status < 400 ){
      commit("set_user_info" , res.data);
    }
  },

  async get_common_bank_list({commit}){
    const res = await get_common_bank_list();
    if(res.status < 400 ){
      commit('set_all_bank_list' , res.data);
    }
  },
  async get_mobile_url({commit}){
    const res = await get_phone_domain();
    if(res.status < 400 ){
      const domain_obj = res.data[Math.floor(Math.random()*res.data.length)]
      const url = domain_obj.website
      commit('set_mobile_url',url);
    }
  },
}


export default{
  state,
  mutations,
  actions,
}