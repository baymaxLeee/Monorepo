import { registerMicroApps, start } from 'qiankun';

registerMicroApps([
  {
    name: 'app-home',
    entry: '//localhost:3001',
    container: '#subapp-container',
    activeRule: '/home',
  },
  {
    name: 'app-dashboard',
    entry: '//localhost:3002',
    container: '#subapp-container',
    activeRule: '/dashboard',
  },
]);

start();