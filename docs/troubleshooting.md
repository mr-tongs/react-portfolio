# 🛠️ 问题排查指南

欢迎使用本指南！在开发、构建或部署 `react-portfolio` 项目的过程中，如果遇到任何异常，请参考以下分类进行排查。大多数问题都有对应的解决方案，按照步骤操作通常能快速修复。

## 📖 目录

1. [本地开发环境问题](#1-本地开发环境问题)
2. [构建问题](#2-构建问题)
3. [样式与资源问题](#3-样式与资源问题)
4. [React 相关错误](#4-react-相关错误)
5. [部署到 GitHub Pages 问题](#5-部署到-github-pages-问题)
6. [其他常见问题](#6-其他常见问题)
7. [通用调试技巧](#7-通用调试技巧)

---

## 1. 本地开发环境问题

### 1.1 Node.js 版本不兼容

**现象**：运行 `npm install` 或 `npm run dev` 时出现语法错误、依赖安装失败或警告。

**可能原因**：项目要求的 Node.js 版本与当前环境不符。本项目需要 Node.js 18 或更高版本。

**解决步骤**：

- 运行 `node -v` 查看当前版本。
- 如果版本过低，访问 [Node.js 官网](https://nodejs.org/) 下载并安装 LTS 版本（18+）。
- 或者使用 [nvm](https://github.com/nvm-sh/nvm)（Node Version Manager）轻松切换版本：
  ```bash
  nvm install 18
  nvm use 18
  ```

### 1.2 依赖安装失败

**现象**：执行 npm install 时卡住、报错（如 ERESOLVE、ETIMEDOUT）或出现大量警告。

**可能原因**：

- 网络问题导致无法下载包。
- npm 缓存损坏。
- 依赖版本冲突。

**解决步骤**：

- 尝试使用淘宝镜像源（国内）：
  ```bash
  npm config set registry https://registry.npmmirror.com
  ```
- 清除 npm 缓存：
  ```bash
  npm cache clean --force
  ```
- 删除 node_modules 和 package-lock.json 后重新安装：
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```

### 1.3 开发服务器无法启动

**现象**：运行 npm run dev 后终端报错，浏览器无法访问 http://localhost:5173。

**可能原因**：

- 端口 5173 被占用。
- Vite 配置文件有语法错误。
- 缺少必要的依赖。

**解决步骤**：

- 检查端口占用：lsof -i :5173（Mac/Linux）或 netstat -ano | findstr :5173（Windows），杀死占用进程。
- 查看终端错误信息，根据提示修复配置文件。
- 确保所有依赖已安装：重新运行 npm install。

### 1.4 热更新不生效

**现象**：修改代码后页面没有自动刷新。

**可能原因**：

- Vite 的热更新机制未正确触发。
- 某些文件被 IDE 锁定或缓存。

**解决步骤**：

- 手动刷新浏览器（F5）。
- 检查控制台是否有 HMR 相关错误。
- 尝试重启开发服务器：Ctrl+C 停止后重新 npm run dev。

## 2. 构建问题

### 2.1 构建失败

**现象**：运行 npm run build 时出现红色错误，打包中断。

**可能原因**：

- TypeScript 类型错误（如果使用 TS）。
- ESLint 规则检查失败。
- 引入的资源不存在或路径错误。
- 内存不足。

**解决步骤**：

- 仔细阅读错误信息，定位到具体文件和代码行。
- 临时禁用 ESLint（不推荐长期）：在 vite.config.js 中注释掉 eslint 插件。
- 检查所有导入路径是否正确。
- 增加 Node.js 内存限制（如果需要）：
  ```bash
  export NODE_OPTIONS="--max-old-space-size=4096"  # Mac/Linux
  set NODE_OPTIONS="--max-old-space-size=4096"     # Windows
  ```

### 2.2 构建产物过大

**现象**：dist 文件夹体积很大，影响加载速度。

**可能原因**：

- 未开启代码分割（Code Splitting）。
- 引入了过大的第三方库。
- 图片等资源未压缩。

**解决步骤**：

- 在 Vite 配置中启用分包策略，参考 Vite 分包指南。
- 使用 rollup-plugin-visualizer 分析打包文件组成，找出大块并进行优化。
- 压缩图片：使用在线工具或 vite-plugin-imagemin 插件。

### 2.3 环境变量未生效

**现象**：代码中使用 import.meta.env.VITE_XXX 获取不到自定义变量。

**可能原因**：

- 变量名没有以 VITE\_ 开头。
- 未在项目根目录创建 .env 或 .env.production 文件。
- 构建后未重新读取环境变量。

**解决步骤**：

- 确保变量名以 VITE\_ 开头（Vite 强制要求）。
- 创建 .env 文件并写入变量，如 VITE_API_URL=https://api.example.com。
- 重启开发服务器或重新构建。

## 3. 样式与资源问题

### 3.1 CSS 样式不生效

**现象**：组件样式没有应用，或者样式混乱。

**可能原因**：

- CSS 文件未正确导入。
- 类名拼写错误。
- CSS Modules 使用方式错误。
- 样式覆盖顺序问题。

**解决步骤**：

- 检查组件中是否正确导入了 CSS 文件：import './styles.css' 或 import styles from './Component.module.css'。
- 确认类名与 JSX 中一致。
- 使用浏览器开发者工具检查元素，查看是否有样式被覆盖或未加载。
- 对于 CSS Modules，确保使用 styles.className 的方式。

### 3.2 图片无法显示

**现象**：页面上的图片显示为破碎的图标或 404。

**可能原因**：

- 图片路径错误（尤其是部署后）。
- 图片未被打包到 dist 中。
- 使用了绝对路径但未考虑 base 路径。

**解决步骤**：

- 本地开发：确保图片放在 public 目录下，并通过 /图片名.png 引用；或者放在 src/assets 中，通过 import 导入后使用。
- 部署后：检查 vite.config.js 中的 base 配置是否正确（例如 base: "/react-portfolio/"）。然后在组件中使用动态 base 路径：
  ```jsx
  <img src={`${import.meta.env.BASE_URL}images/logo.png`} alt="logo" />
  ```
- 确认图片文件名大小写与实际一致（Linux 服务器区分大小写）。

### 3.3 字体文件加载失败

**现象**：自定义字体未生效，页面显示默认字体。

**可能原因**：

- 字体文件路径错误。
- 字体格式不支持当前浏览器。
- 未在 CSS 中正确声明 @font-face。

**解决步骤**：

- 将字体文件放入 public/fonts/ 目录。
- 在 CSS 中使用相对路径，并确保 base 配置正确：
  ```css
  @font-face {
    font-family: "MyFont";
    src: url("/fonts/myfont.woff2") format("woff2");
  }
  ```
- 部署后路径会变为 /react-portfolio/fonts/myfont.woff2，由于 base 配置，Vite 会自动处理，前提是使用正确的引用方式（/ 开头会被拼接 base）。

## 4. React 相关错误

### 4.1 组件渲染错误

**现象**：页面空白或显示 "Something went wrong"。

**可能原因**：

- 组件内部 JavaScript 错误（如访问 undefined 的属性）。
- 使用了不存在的 Hook 或 Hook 规则违反。
- 组件未正确导出/导入。

**解决步骤**：

- 打开浏览器控制台（F12），查看具体的错误信息和堆栈。
- 检查组件代码，确保变量已定义。
- 确认 React 和 ReactDOM 版本兼容。
- 使用 Error Boundary 捕获错误并显示友好提示。

### 4.2 路由无法工作

**现象**：点击链接 URL 变化但页面内容不变，或直接访问某路由显示 404。

**可能原因**：

- BrowserRouter 使用不当，尤其是在 GitHub Pages 部署时。
- 路由配置错误（如 path 写错，或未用 Routes 包裹）。
- 没有将 Router 包裹在应用根组件。

**解决步骤**：

- 检查 App.jsx 或路由配置文件中是否正确使用了 BrowserRouter、Routes 和 Route。
- 部署时遇到刷新 404 请参考 部署问题 的专门说明。
- 确保所有路由组件都已正确导入。

### 4.3 Context API 问题

**现象**：使用 useContext 获取到的值为 undefined。

**可能原因**：

- 组件未包裹在对应的 Provider 中。
- Provider 的 value 未正确传递。
- 导出的 Context 对象与使用的不是同一个实例。

**解决步骤**：

- 检查组件树，确保当前组件是 Provider 的后代。
- 在 Provider 处打印 value，确认有值。
- 确保 createContext 的默认值与预期一致.

## 5. 部署到 GitHub Pages 问题

### 5.1 部署后页面空白（白屏）

**现象**：访问 https://mr-tongs.github.io/react-portfolio/ 显示空白，控制台有资源加载 404 错误。

**可能原因**：

- vite.config.js 中的 base 配置错误或未配置。
- 打包后的资源路径不正确，导致找不到 JS/CSS 文件。

**解决步骤**：

- 打开浏览器控制台（F12），查看 Network 面板，确认哪些资源 404。
- 检查 vite.config.js，确保 base 设置为 "/react-portfolio/"（注意开头和结尾的斜杠）。
- 重新运行 npm run build 并检查 dist/index.html 中引用的资源路径是否以 /react-portfolio/ 开头。
- 重新部署：npm run deploy。
- 等待一两分钟，清除浏览器缓存后重新访问。

### 5.2 路由刷新后 404

**现象**：在站点内点击链接可以正常跳转，但直接在地址栏输入某个子路径（如 /about）或刷新页面时，显示 GitHub Pages 的 404 页面。

**可能原因**：GitHub Pages 默认不支持单页应用（SPA）的客户端路由，它会在服务器端寻找对应路径的 HTML 文件，但实际只有 index.html。

**解决方案**：需要配置 SPA 回退（fallback），让所有请求都返回 index.html。

**方法一：使用 HashRouter（简单但 URL 带 #）**

将 BrowserRouter 替换为 HashRouter，然后重新部署。URL 会变成 https://.../#/about，刷新不会 404。

**方法二：添加 404.html 重定向（推荐，保持 URL 美观）**

在项目根目录创建 404.html 文件，内容与 index.html 完全相同。

修改 vite.config.js 将 404.html 也作为入口，确保它被复制到 dist：

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  base: "/react-portfolio/",
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        notFound: path.resolve(__dirname, "404.html"),
      },
    },
  },
});
```

重新构建和部署。GitHub Pages 在遇到 404 时会返回 404.html，而你的前端路由会接管并正确渲染页面。

### 5.3 部署后资源仍然 404（如 CSS、JS 路径错误）

**现象**：页面能加载，但样式全无，控制台显示 CSS/JS 文件 404。

**可能原因**：资源路径未正确拼接 base。

**解决步骤**：

- 检查 vite.config.js 中的 base 是否设置正确。
- 如果使用了 public 目录下的文件（如 favicon.ico），在代码中引用时应使用 import.meta.env.BASE_URL + 'favicon.ico'。
- 检查 index.html 中手动引用的资源（如果有）是否已添加 base 前缀。

### 5.4 gh-pages 分支未正确推送

**现象**：运行 npm run deploy 后提示成功，但访问站点仍是旧内容或 404。

**可能原因**：

- gh-pages 包未正确安装或版本问题。
- 远程仓库权限问题。
- dist 目录未生成或内容为空。

**解决步骤**：

- 确认 gh-pages 已安装：npm list gh-pages。
- 手动构建：npm run build，检查 dist 目录是否包含正确文件。
- 直接运行部署命令：npx gh-pages -d dist，查看详细错误输出。
- 如果出现权限错误，检查 GitHub 认证：确保已登录，或使用 SSH 密钥。
- 尝试重新初始化 gh-pages 分支：
  ```bash
  npx gh-pages-clean
  npm run deploy
  ```

### 5.5 GitHub Pages 设置错误

**现象**：站点访问返回 404，但仓库已经有 gh-pages 分支。

**可能原因**：GitHub Pages 未正确选择分支或目录。

**解决步骤**：

- 进入仓库 Settings → Pages。
- 在 "Branch" 下拉菜单中，选择 gh-pages 分支，文件夹选择 / (root)。
- 点击 Save，等待几分钟后重新访问。

## 6. 其他常见问题

### 6.1 浏览器兼容性问题

**现象**：在某些旧版浏览器（如 IE）中页面无法正常显示或功能异常。

**可能原因**：项目使用了现代 JavaScript 语法或 CSS 特性，不被旧浏览器支持。

**解决步骤**：

- Vite 默认构建目标为 modules（支持原生 ES 模块的浏览器）。如果需兼容更旧浏览器，可在 vite.config.js 中调整 build.target：
  ```js
  build: {
    target: 'es2015', // 或 'chrome61' 等
  }
  ```
- 考虑使用 @vitejs/plugin-legacy 插件生成兼容包。

### 6.2 暗黑模式切换异常

**现象**：点击切换主题按钮时，样式没有变化或闪烁。

**可能原因**：

- 主题状态未正确管理。
- CSS 变量未及时更新。
- localStorage 存储的主题值与当前不符。

**解决步骤**：

- 检查 Context 或 Redux 中的主题状态是否更新。
- 确认 CSS 中使用了变量，并在根元素上切换类名（如 .dark）或属性。
- 在浏览器开发者工具的 Elements 面板中查看 html 或 body 的类名是否正确变化。
- 清除 localStorage 中可能损坏的主题数据。

### 6.3 响应式布局在某些设备上异常

**现象**：在手机或平板上布局错乱，或字体过大/过小。

**可能原因**：

- CSS 媒体查询断点设置不合理。
- 未使用相对单位（如 rem、vw）或未设置视口 meta 标签。

**解决步骤**：

- 确保 index.html 中有 <meta name="viewport" content="width=device-width, initial-scale=1">。
- 检查 CSS 媒体查询的断点值，是否覆盖了所有目标设备宽度。
- 使用浏览器开发者工具的移动模拟器测试不同尺寸，调整样式。
- 考虑使用 CSS Grid 或 Flexbox 的自动换行能力，减少对固定断点的依赖。

## 7. 通用调试技巧

当你遇到难以定位的问题时，可以按以下步骤进行排查：

### 查看浏览器控制台（Console）

任何 JavaScript 错误、警告都会显示在这里，是解决问题的第一入口。

注意网络请求失败（红色 404/500）也会在 Console 中提示。

### 检查网络请求（Network）

刷新页面，观察所有请求的状态码。

查找 404 的资源，确认路径是否正确。

检查请求头、响应头，看是否有 CORS 问题。

### 使用 React Developer Tools

安装浏览器扩展 React Developer Tools。

检查组件的 Props、State 是否正确，Context 值是否符合预期。

查看组件树，确认组件是否正确渲染。

### 验证配置文件

vite.config.js：检查 base、plugins、build 等配置。

package.json：检查 scripts 和 dependencies 是否完整。

.env 文件：确保环境变量已定义且拼写正确。

### 简化问题

如果错误复杂，尝试注释掉最近修改的代码，逐步还原。

创建一个最小可复现示例，独立测试。

### 搜索错误信息

将控制台的错误信息复制到搜索引擎或 AI 工具中，通常能找到社区解决方案。

### 检查 GitHub Actions / 部署日志

如果部署失败，查看仓库的 Actions 标签页，分析构建日志。

确认 gh-pages 分支是否被正确更新。
