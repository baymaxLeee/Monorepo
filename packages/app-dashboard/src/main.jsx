import './main.less';

// Qiankun 生命周期钩子
export async function bootstrap() {
  console.log('[子应用] App Dashboard bootstrap');
}

export async function mount(props) {
  console.log('[子应用] App Dashboard mount', props);
  import('./bootstrap').then(({ mount }) => {
    mount(props)
    console.log('Sub App mounted');
  });
}

export async function unmount(props) {
  console.log('[子应用] App Dashboard unmount', props);
  import('./bootstrap').then(({ unmount }) => {
    unmount()
    console.log('Sub App mounted');
  });
}

// 独立运行
if (!window.__POWERED_BY_QIANKUN__) {
  import('./bootstrap').then(({ mount }) => {
    mount({})
    console.log('Sub App mounted');
  });
}