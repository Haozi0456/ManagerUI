/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from 'axios';
import QS from 'qs';
// import {router} from '../router/index';
import {Message} from 'iview';
import Cookies from 'js-cookie';

// 环境的切换
// if (process.env.NODE_ENV == 'development') {
axios.defaults.baseURL = 'http://127.0.0.1:81/';
// } else if (process.env.NODE_ENV == 'debug') {
//     axios.defaults.baseURL = 'http://127.0.0.1:81/';
// } else if (process.env.NODE_ENV == 'production') {
//     axios.defaults.baseURL = 'http://127.0.0.1:81/';
// }

// 请求超时时间
axios.defaults.timeout = 10000;

// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 请求拦截器
axios.interceptors.request.use(
    config => {
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        const token = Cookies.get("token");
        // const token = localStorage.getItem("token");
        // token && (config.headers.Authorization = token);
        if (token) {
            axios.defaults.headers.common['token'] = token;
        }
        if(config.url.indexOf("logout") >= 0 ){
            // localStorage.removeItem('token');
            // localStorage.removeItem('expireTime');
            // localStorage.removeItem('user');
            Cookies.remove('token');
            Cookies.remove('expireTime');
            Cookies.remove('user',"");
        }
        if (config.url.indexOf('login') < 0) {
            // let lessTime = Number(Cookies.get('expireTime')) - Date.now(); // 后台返回的过期时间与现在的进行计算
            let lessTime = Number(localStorage.getItem('expireTime')) - Date.now(); // 后台返回的过期时间与现在的进行计算
            if (lessTime <= 0) {
                Message.error({
                    content: '登录过期,请重新登录',
                    duration: 2
                });
                Cookies.remove('token');
                Cookies.remove('expireTime');
                Cookies.remove('user',"");
                window.location.href = '/login'
            }
        }

        return config;
    },
    error => {
        return Promise.error(error);
    });

// 响应拦截器
axios.interceptors.response.use(
    response => {
        if (response.status === 200) {
            if (response.config.url.indexOf('login') >= 0) {
                const { msg, code, data } = response.data;
                if (code === 100) {
                    // 登陆后做出一些本地的处理，按需加载,()
                    let date = new Date();
                    // n代表天数,加号表示未来n天的此刻时间,减号表示过去n天的此刻时间
                    // var expireTime = date.getTime() + 1000*60*60*24*n;
                    let expireTime = date.getTime() + 1000*60*60*1;
                    // getTime()方法返回Date对象的毫秒数,但是这个毫秒数不再是Date类型了,而是number类型,所以需要重新转换为Date对象,方便格式化
                    // var newDate= new Date(expireTime);
                    Cookies.set('token', data.token);
                    Cookies.set('expireTime', expireTime); // 过期时间
                    // localStorage.setItem("token",data.token);
                    // localStorage.setItem('expireTime', expireTime+"");
                }
            }
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    // 服务器状态码不是200的情况
    error => {
        if (error.response.status) {
            switch (error.response.status) {
                // 401: 未登录
                // 未登录则跳转登录页面，并携带当前页面的路径
                // 在登录成功后返回当前页面，这一步需要在登录页操作。
                case 401:
                    // router.replace({
                    //     path: '/login',
                    //     query: {redirect: router.currentRoute.fullPath}
                    // });
                    break;
                // 403 token过期
                // 登录过期对用户进行提示
                // 清除本地token和清空vuex中token对象
                // 跳转登录页面
                case 403:
                    Message.error({
                        content: '登录过期，请重新登录',
                        duration: 2,
                    });
                    // 清除token
                    // localStorage.removeItem('token');
                    // store.commit('loginSuccess', null);
                    // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
                    // setTimeout(() => {
                    //     router.replace({
                    //         path: '/login',
                    //         query: {
                    //             redirect: router.currentRoute.fullPath
                    //         }
                    //     });
                    // }, 1000);
                    break;
                // 404请求不存在
                case 404:
                    Message.error({
                        content: '网络请求不存在',
                        duration: 2,
                    });

                    break;
                // 其他错误，直接抛出错误提示
                default:
                    Message.error({
                        content: error.response.data.message,
                        duration: 2,
                    });
            }
            return Promise.reject(error.response);
        }
    }
);

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get (url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        })
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data);
            });
    });
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post (url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, QS.stringify(params))
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data);
            });
    });
}

/**
 * json请求方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function json (url, params) {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: url,
            headers: {'content-Type': 'application/json; charset=utf-8'},
            cancelToken: source.token,
            data: JSON.stringify(params) // 转成json字符串
        }).then(res => {
            resolve(res.data);
        })
        .catch(err => {
            reject(err.data);
        });
    });
}
