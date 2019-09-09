import axios from 'axios';

// import { $tips } from '../components/tips/tips';

// const tips = $tips.installMessage;

// axios.defaults.withCredentials = true;

import { Message } from 'iview';

axios.defaults.timeout = 100000;
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';
axios.defaults.validateStatus = function(status) {
  return status >= 200 && status < 599; // default
};

var fnComplete;
var source;
export class HttpMiddleware {
  constructor(fn) {
    let self = this;
    function resolve(url, res) {
      let data = res.data;
      !!self.fnComplete && self.fnComplete(res);

      if (res.status === 400) {
        // tips({
        //   type: 'error',
        //   message: res.data,
        // });

        Message.error(res.data);

        return;
      }

      if (res.status === 401) {
        Message.error('登录过期');
        // tips({
        //   type: 'error',
        //   message: res.data,
        // });
        localStorage.clear();
        window.location.href = '/index';
        return;
      }
    }
    function reject(url, error) {
      console.error('request error: \n' + 'url: ' + url, error);
    }
    function abort(source) {
      self.source = source;
    }
    return fn(resolve, reject, abort);
  }
  then(done) {
    this.fnComplete = done;
    return this;
  }
  abort() {
    let source = this.source;
    source.cancel('API is aborted.');
    return this;
  }
}

// console.log(process.env)

// let testUrl = 'https://lgd-api-gateway.azurewebsites.net';

// if(process.env.NODE_ENV === 'development'){
//   testUrl = 'http://api.gateway.cp.com'
// }

// let testUrl = 'http://api.test.lgdcoms.com';

// let testUrl = 'https://lgd-api-gateway.azurewebsites.net';

// console.log(process.NODE_ENV)
// if(process.NODE_ENV === "development"){
//   testUrl = 'http://api.gateway.cp.com'
//   // testUrl = 'http://api.test.lgdcoms.com'
// }else{
//   testUrl = 'http://api.test.lgdcoms.com'
// }

//  testUrl = 'http://192.168.0.12:2253';//测试
// const testUrl = 'http://api.gateway.cp.com';//
// const testUrl = 'http://api.test.lgdcoms.com'

const BASE_URL = process.env.VUE_APP_REQUEST_URL;
const appId = process.env.VUE_APP_APPID;
const appSecret = process.env.VUE_APP_APPSECRECT;
const scope = process.env.VUE_APP_SCOPE;
const terminal = process.env.VUE_APP_TERMINAL;
class Http {
  constructor() {
    this.cb = '';

    this.request = function(opt) {
      return new HttpMiddleware((resolve, reject, abort) => {
        let CancelToken = axios.CancelToken;
        let source = CancelToken.source();

        if (!opt.url.match('http')) {
          opt.url = BASE_URL + opt.url;
        }

        opt.headers = {
          appId: appId,
          appSecret: appSecret,
          scope: scope,
          terminal: terminal,
        };
        if (window.returnCitySN) {
          opt.headers.ipAddress = window.returnCitySN.cip;
        }

        if (localStorage.token) {
          opt.headers.Authorization = 'Bearer ' + localStorage.token;
        }
        axios
          .request({ cancelToken: source.token, ...opt })
          .then(res => {
            resolve(opt.url, res);
          })
          .catch(error => {
            if (this.cb) {
              this.cb(); //请求失败回调
            }

            reject(opt.url, error);
          });

        abort(source);
      });
    };
  }
  get(url, params = {}, cb, config) {
    this.cb = cb;
    let p = {};
    Object.keys(params).forEach(key => {
      if (params[key] || params[key] === false) {
        p[key] = params[key];
      }
    });
    return this.request({
      method: 'get',
      url: url,
      params: p,
      ...config,
    });
  }
  post(url, data, cb, config) {
    this.cb = cb;
    return this.request({
      method: 'post',
      url: url,
      data: data,
      ...config,
    });
  }
  put(url, data, config) {
    return this.request({
      method: 'put',
      url: url,
      data: data,
      ...config,
    });
  }
  patch(url, data, config) {
    return this.request({
      method: 'patch',
      url: url,
      data: data,
      ...config,
    });
  }
  delete(url, params = {}, config) {
    return this.request({
      method: 'delete',
      url: url,
      data: params,
      ...config,
    });
  }
}

export const API = new Http();
