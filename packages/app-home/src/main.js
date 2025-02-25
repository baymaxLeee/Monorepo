import React from 'react';
import { createRoot } from 'react-dom/client'; // React 19 使用 createRoot
import App from './App';

console.log('[appHome] Entry file loaded');

// Qiankun 生命周期钩子
export async function bootstrap() {
  console.log('[子应用] App Home bootstrap');
}

export async function mount(props) {
  console.log('[子应用] App Home mount', props);
  const { container } = props;
  const root = createRoot(container || document.getElementById('root'));
  root.render(<App />);
}

export async function unmount(props) {
  console.log('[子应用] App Home unmount', props);
  const { container } = props;
  const root = createRoot(container || document.getElementById('root'));
  root.unmount();
}

// 独立运行
if (!window.__POWERED_BY_QIANKUN__) {
  const root = createRoot(document.getElementById('root'));
  root.render(<App />);
}