import React from 'react';
import { createRoot } from 'react-dom/client'; // React 19 使用 createRoot
import App from './App';
import './main.less';

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept(() => {
    console.log('[HMR] Manual Accept Triggered');
  });
}

// 主应用必须同步加载 React（无需异步）
const root = createRoot(document.getElementById('root'));

root.render(<App />);
