import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { progress } from './nprogress';

// 定义请求配置类型
interface RequestConfig extends AxiosRequestConfig {
    showLoading?: boolean;
}

// 定义响应数据类型
interface ResponseData<T = any> {
    code: number;
    message: string;
    data: T;
}

// 定义错误类型
interface ErrorData {
    code: number;
    message: string;
}

class HttpClient {
    private instance: AxiosInstance;

    constructor(config: RequestConfig) {
        // 创建 axios 实例
        const baseConfig = {
            baseURL: 'express/',
            timeout: 10000, // 请求超时时间
            showLoading: true,
            headers: {
                'Content-Type': 'application/json',
            },
        }
        this.instance = axios.create({ ...baseConfig, ...config });

        // 添加请求拦截器
        this.instance.interceptors.request.use(
            (config: RequestConfig): any => {
                // 在发送请求之前做些什么
                if (config.showLoading) {
                    progress.start();
                }
                return config as AxiosRequestConfig; // 返回 RequestConfig
            },
            (error: AxiosError) => {
                // 对请求错误做些什么
                return Promise.reject(error);
            },
        );

        // 添加响应拦截器
        this.instance.interceptors.response.use(
            (response: AxiosResponse<ResponseData>): any => {
                progress.done();
                // 对响应数据做些什么
                if (response.data.code !== 200) {
                    console.error('请求失败:', response.data.message);
                    return Promise.reject(response.data);
                }
                return response.data;
            },
            (error: AxiosError<ErrorData>) => {
                progress.done();
                // 对响应错误做些什么
                if (error.response) {
                    console.error('请求失败:', error.response.data.message);
                } else {
                    console.error('请求失败:', error.message);
                }
                return Promise.reject(error);
            },
        );
    }

    // 封装 GET 请求
    public async get<T>(url: string, config?: RequestConfig): Promise<T> {
        const response = await this.instance.get<ResponseData<T>>(url, config);
        return response.data as T;
    }

    // 封装 POST 请求
    public async post<T>(url: string, data?: any, config?: RequestConfig): Promise<T> {
        const response = await this.instance.post<ResponseData<T>>(url, data, config);
        return response.data as T;
    }

    // 封装 PUT 请求
    public async put<T>(url: string, data?: any, config?: RequestConfig): Promise<T> {
        const response = await this.instance.put<ResponseData<T>>(url, data, config);
        return response.data as T;
    }

    // 封装 DELETE 请求
    public async delete<T>(url: string, config?: RequestConfig): Promise<T> {
        const response = await this.instance.delete<ResponseData<T>>(url, config);
        return response.data as T;
    }
}

// 导出单例实例
const customConfig = {};
export const http = new HttpClient(customConfig);
