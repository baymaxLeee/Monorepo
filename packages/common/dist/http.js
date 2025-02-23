import axios from 'axios';
import { progress } from './nprogress';
class HttpClient {
    constructor(config) {
        // 创建 axios 实例
        const baseConfig = {
            baseURL: 'express/',
            timeout: 10000,
            showLoading: true,
            headers: {
                'Content-Type': 'application/json',
            },
        };
        this.instance = axios.create({ ...baseConfig, ...config });
        // 添加请求拦截器
        this.instance.interceptors.request.use((config) => {
            // 在发送请求之前做些什么
            if (config.showLoading) {
                progress.start();
            }
            return config; // 返回 RequestConfig
        }, (error) => {
            // 对请求错误做些什么
            return Promise.reject(error);
        });
        // 添加响应拦截器
        this.instance.interceptors.response.use((response) => {
            progress.done();
            // 对响应数据做些什么
            if (response.data.code !== 200) {
                console.error('请求失败:', response.data.message);
                return Promise.reject(response.data);
            }
            return response.data;
        }, (error) => {
            progress.done();
            // 对响应错误做些什么
            if (error.response) {
                console.error('请求失败:', error.response.data.message);
            }
            else {
                console.error('请求失败:', error.message);
            }
            return Promise.reject(error);
        });
    }
    // 封装 GET 请求
    async get(url, config) {
        const response = await this.instance.get(url, config);
        return response.data;
    }
    // 封装 POST 请求
    async post(url, data, config) {
        const response = await this.instance.post(url, data, config);
        return response.data;
    }
    // 封装 PUT 请求
    async put(url, data, config) {
        const response = await this.instance.put(url, data, config);
        return response.data;
    }
    // 封装 DELETE 请求
    async delete(url, config) {
        const response = await this.instance.delete(url, config);
        return response.data;
    }
}
// 导出单例实例
const customConfig = {};
export const http = new HttpClient(customConfig);
