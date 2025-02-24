import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// 定义配置选项的类型
interface ProgressOptions {
    showSpinner?: boolean;
    speed?: number;
    minimum?: number;
    easing?: string;
    color?: string;
}

class Progress {
    private options: ProgressOptions;

    constructor(options: ProgressOptions = {}) {
        // 默认配置
        const defaultOptions: ProgressOptions = {
            showSpinner: true,
            speed: 500,
            minimum: 0.1,
            easing: 'ease',
            color: '#29d',
        };

        // 合并配置
        this.options = { ...defaultOptions, ...options };

        // 初始化
        this.init();
    }

    // 初始化
    private init(): void {
        NProgress.configure(this.options);

        // 自定义样式
        const style = document.createElement('style');
        style.innerHTML = `
      #nprogress .bar {
        background: ${this.options.color};
      }
      #nprogress .peg {
        box-shadow: 0 0 10px ${this.options.color}, 0 0 5px ${this.options.color};
      }
      #nprogress .spinner-icon {
        border-top-color: ${this.options.color};
        border-left-color: ${this.options.color};
      }
    `;
        document.head.appendChild(style);
    }

    // 启动进度条
    public start(): void {
        NProgress.start();
    }

    // 结束进度条
    public done(): void {
        NProgress.done();
    }

    // 手动设置进度
    public set(value: number): void {
        NProgress.set(value);
    }

    // 增加进度
    public inc(): void {
        NProgress.inc();
    }
}

// 导出单例实例
export const progress = new Progress();
