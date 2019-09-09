import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/index';

import 'iview/dist/styles/iview.css';
import './assets/styles/common.less';
// import vueSwiper from 'vue-awesome-swiper'
// import 'swiper/dist/css/swiper.css'
// Vue.use(vueSwiper);
import { parsePrice } from '@/utils/parsePrice';
import { formatBeijingDate } from './utils/base';
import { Modal, Button, Spin, Message, DatePicker,Table,FormItem,Row,Col,Form } from 'iview';
Vue.config.productionTip = false;
Vue.component('Button', Button);
Vue.component('Modal', Modal);
Vue.component('DatePicker', DatePicker);
Vue.component('Table', Table);
Vue.component('FormItem', FormItem);
Vue.component('Row', Row);
Vue.component('Col', Col);
Vue.component('Form', Form);

Vue.prototype.$Message = Message;

Vue.prototype.$Modal = Modal;

Vue.prototype.formatBeijingDate = function(str) {
  return formatBeijingDate(str);
};


Vue.component(Spin.name, Spin);
/// 取小数点后n位  大于万则取万为单位
Vue.prototype.NumberAdj = function(numbers, bit = 0) {
  if (isNaN(numbers)) {
    return 0;
  }
  if (numbers > 10000) {
    const decimal =
      Math.ceil((Number(numbers) / 10000) * Math.pow(10, bit)) /
      Math.pow(10, bit);
    return decimal.toFixed(bit) + 'W';
  } else {
    return (
      Math.ceil(Number(numbers) * Math.pow(10, bit)) / Math.pow(10, bit)
    ).toFixed(bit);
  }
};
Vue.prototype.parsePrice = function(str) {
  return parsePrice(str || 0);
};

Vue.prototype.toPercent = function(num) {
  return parseFloat((num * 100).toFixed(2));
};

Vue.prototype.toDecimal = function(num) {
  return parseFloat((num / 100).toFixed(4));
};
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
