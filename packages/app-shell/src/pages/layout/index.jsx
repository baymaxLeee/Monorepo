import React, { useEffect } from 'react';
import { registerMicroApps, start } from 'qiankun';
import { Layout } from 'antd';
import './index.less';

const { Header, Content, Sider } = Layout;

const headerStyle = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#4096ff',
};

const siderStyle = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#1677ff',
};

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
    <Layout className='layout-wrapper'>
      <Header className='layout-header' style={headerStyle}>
        <Layout>
          <Sider style={siderStyle}>wellocom to baymax platform</Sider>
          <Content>the sytems</Content>
          <Sider style={siderStyle}>user profile</Sider>
        </Layout>
      </Header>
      <Content id='subapp-container'></Content>
    </Layout>
  )
};

export default App;