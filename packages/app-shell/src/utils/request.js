import axios from 'axios';
import { message } from 'antd';
import { store } from '@/store';

// 创建 axios 实例
const instance = axios.create({
  baseURL: 'express', // 设置基础 URL
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json', // 默认请求头
  },
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么（如添加 token）
    const token = store.getState().user.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 对响应数据做些什么
    if (response.status === 200 || response.status === 201) {
      return response.data; // 返回响应数据
    } else {
      return Promise.reject(response.data); // 返回错误信息
    }
  },
  (error) => {
    // 对响应错误做些什么
    if (error.response) {
      switch (error.response.status) {
        case 401:
          message.error('未授权，请重新登录');
          break;
        case 404:
          message.error('请求的资源不存在');
          break;
        case 500:
          message.error('服务器内部错误');
          break;
        default:
          message.error('请求失败', error.message);
      }
    } else {
      message.error('网络错误，请检查网络连接');
    }
    return Promise.reject(error);
  }
);

// 封装常用请求方法
export const http = {
  get(url, params = {}) {
    return instance.get(url, { params });
  },

  post(url, data = {}) {
    return instance.post(url, data);
  },

  put(url, data = {}) {
    return instance.put(url, data);
  },

  delete(url, params = {}) {
    return instance.delete(url, { params });
  },

  // 支持取消请求
  createCancelToken() {
    return axios.CancelToken.source();
  },
};