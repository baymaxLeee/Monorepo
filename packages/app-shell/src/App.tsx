import React, { useEffect } from 'react';
import { registerMicroApps, start } from 'qiankun';

const App: React.FC = () => {
  // 注册子应用
  useEffect(() => {
    registerMicroApps([
        {
          name: 'appHome',
          entry: 'http://localhost:3001/remoteEntry.js', // 子应用的 Module Federation 入口
          container: '#subapp-container',
          activeRule: '/home',
          loader: (loading) => console.log('子应用加载状态:', loading), // 添加加载状态日志
        },
        {
          name: 'app-dashboard',
          entry: '//localhost:3002/remoteEntry.js',
          container: '#subapp-container',
          activeRule: '/dashboard',
        },
    ]);
    start();
  }, []);

  return (
    <div>
      <h1>主应用 (Qiankun + Webpack 5)</h1>
      <div id="subapp-container"></div>
    </div>
  );
};

export default App;