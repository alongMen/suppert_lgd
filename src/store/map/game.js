import { get_collected_game_list } from '@/service/index';
const state = {
  collected_game_list: [], //收藏列表
};

const mutations = {
  set_collect_game_list(state, data) {
    state.collected_game_list = data;
  },

  //
  cancel_game_collect(state , gameId){
    state.collected_game_list = state.collected_game_list.filter((v)=> v.gameId !== gameId);
  },
  //
  collect_game(state , data){
    state.collected_game_list.push(data);
  }

};

const actions = {
  //
  async get_collected_game_list({ commit }) {
    const res = await get_collected_game_list();
    if (res.status < 400) {
      commit('set_collect_game_list', res.data);
    }
  },
};

export default {
  state,
  mutations,
  actions,
};
