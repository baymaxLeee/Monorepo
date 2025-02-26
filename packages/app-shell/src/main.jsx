import React from 'react';
import { BrowserRouter } from 'react-router'
import { createRoot } from 'react-dom/client'; // React 19 使用 createRoot
import App from './App';
import './main.less';

// 主应用必须同步加载 React（无需异步）
const root = createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
);