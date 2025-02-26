import React, { useEffect } from 'react';
import { registerMicroApps, start } from 'qiankun';

const App = () => {
  // 注册子应用
  useEffect(() => {
    registerMicroApps([
      {
        name: 'app_home',
        entry: '//localhost:3001', // 子应用的 Module Federation 入口
        container: '#subapp-container',
        activeRule: '/home',
        props: {
          basename: '/home',
        },
      },
      {
        name: 'app_dashboard',
        entry: '//localhost:3002',
        container: '#subapp-container',
        activeRule: '/dashboard',
        props: {
          basename: '/dashboard',
        },
      },
    ]);

    start({
      sandbox: {
        strictStyleIsolation: false, // 禁用严格隔离
        experimentalStyleIsolation: true, // 启用实验性隔离
      },
    });
  }, []);

  return (
    <div>
      <h1>主应用 (Qiankun + Webpack 5)</h1>
      <div id="subapp-container"></div>
    </div>
  );
};

export default App;
