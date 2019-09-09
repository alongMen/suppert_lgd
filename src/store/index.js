import Vue from 'vue';
import Vuex from 'vuex';
import base from './map/base';
import game from './map/game';


import transModal from './map/trans-modal'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    base,
    game,
    transModal
  },

  mutations: {},
});
