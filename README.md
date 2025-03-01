# Monorepo
使用 qiankun + Webpack 5 Federation 的微前端架构，能够充分发挥两者的优势，提供更灵活、高效的前端架构解决方案。
由 qiankun 来负责各个子应用的动态加载，并提供沙箱隔离和通信机制。
通过 webpack5 Module Federation 共享公共模块(utils、 UIComponent、 ...)，以及三方件(react、react-dom)，最小化产物体积。

## 技术栈

### 项目管理
使用 Monorepo(lerna) 工具 在单体仓库管理前后端多个项目，简化协作，提高一致性

### 前端
`qiankun`、`React`、`Vue`、`Webpack`、`Vite`

### 后端
`Nodejs`、`Express`、`MongoDB`

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