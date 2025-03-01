# Monorepo-qiankun
qiankun 实战 demo，父应用 React，子应用使用 `React` `Vue` `HTML`。

## 技术栈
项目管理 使用 Monorepo(lerna) 管理前后端多个项目
### 前端 
`qiankun` `React` `Vue` `Webpack` `Vite`

### 后端
`Nodejs` `Express`

## 开始
在根目录一键安装所有主子应用的依赖
```
pnpm i
```

一键启动所有所有应用
```
npm start
```

通过 [http://localhost:3000/](http://localhost:3000/) 访问主应用。

## 发布
一键构建并打包所有主子应用
```
npm run build
```