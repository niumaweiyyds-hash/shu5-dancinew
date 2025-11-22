import React from 'react';
import ReactDOM from 'react-dom/client';
// 导入样式文件
import './index.css';
// 导入主应用组件 (注意：我们已将其更名为 App.jsx)
import App from './App.jsx';

// 使用 ReactDOM 将 App 组件渲染到 index.html 中的 <div id="root">
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);