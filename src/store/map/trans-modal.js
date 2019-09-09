
import { get_user_platform_balance , wallet_trans} from "@/service/index";

const state = {
  show: false,//


  outId: 0,//出款平台id,

  inId: 0,
  

  balance_list:[],


}



const mutations = {


  toggle_trans_modal(state , bool){
    state.show = bool;
  },

  set_trans_out_id(state , id){
    state.outId = id;
  },
  set_trans_in_id(state , id){
    state.inId = id;
  },

  set_platform_balance(state , data){
    state.balance_list = data;
  }
}

const actions = {
  async get_user_platform_balance({commit}){
    const res = await get_user_platform_balance();
    if(res.status < 400 ){
      commit('set_platform_balance' , res.data.allPlat);
    }
  }
}


export default{
  state,
  mutations,
  actions
}