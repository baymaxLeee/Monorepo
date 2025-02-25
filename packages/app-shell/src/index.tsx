import React from 'react';
import { createRoot } from 'react-dom/client'; // React 19 使用 createRoot
import App from './App';

const root = createRoot(document.getElementById('root')!);
root.render(<App />);